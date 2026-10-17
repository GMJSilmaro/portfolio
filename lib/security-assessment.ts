import type { UrlParseResult } from '@/lib/parse-url-location'
import type { HostGeoResult } from '@/lib/resolve-host-geo-client'

export type FindingSeverity = 'info' | 'low' | 'medium' | 'high'

export type SecurityFinding = {
  id: string
  severity: FindingSeverity
  title: string
  detail: string
}

export type SecurityAssessment = {
  riskScore: number
  riskLabel: 'low' | 'moderate' | 'elevated' | 'high'
  geoUsable: boolean
  findings: SecurityFinding[]
  /** What to do when true client geo is unavailable (VPN/CDN/etc.). */
  compensatingChecks: string[]
}

const SUSPICIOUS_TLDS = new Set([
  'zip',
  'mov',
  'tk',
  'ml',
  'ga',
  'cf',
  'gq',
  'top',
  'xyz',
  'icu',
  'country',
  'stream',
  'click',
  'loan',
  'work',
  'rest',
  'science',
])

/**
 * Cybersecurity assessment for a pasted URL + host intel.
 * When VPN/proxy/CDN blocks usable geo, raise that limitation explicitly and
 * lean on compensating signals (you cannot recover true location behind a VPN).
 */
export function assessUrlSecurity(
  url: UrlParseResult,
  hostGeo: HostGeoResult | null,
): SecurityAssessment {
  const findings: SecurityFinding[] = []
  const compensatingChecks: string[] = []

  const geoTrust = hostGeo?.reputation?.geoTrust ?? 'normal'
  const signals = new Set(hostGeo?.reputation?.signals ?? [])
  const vpnLike =
    signals.has('vpn_or_proxy_suspected') || signals.has('tor_suspected')
  const cdnLike = signals.has('cdn_or_anycast')
  const hostingLike = signals.has('hosting_or_datacenter')

  const geoUsable = geoTrust === 'normal' && !vpnLike && !cdnLike

  if (vpnLike) {
    findings.push({
      id: 'vpn-geo-limit',
      severity: 'high',
      title: 'True location unavailable (VPN/proxy/Tor limitation)',
      detail:
        'This host IP looks like VPN, proxy, or Tor. Approximate IP geo is the exit/node region only — it cannot be “cracked” to a real end-user city. Treat location as untrusted and use compensating checks below.',
    })
    compensatingChecks.push(
      'Do not use IP city/region as identity or attribution.',
      'Correlate domain WHOIS/registrar, certificate issuer, and historical DNS (outside this page).',
      'Compare URL-embedded coordinates/place text against the claimed site content for inconsistency.',
      'Check whether the same ASN/org appears on other suspicious links in your case.',
      'Prefer behavioral and content indicators (phishing kits, brand impersonation) over geo.',
    )
  } else if (cdnLike) {
    findings.push({
      id: 'cdn-geo-limit',
      severity: 'medium',
      title: 'IP geo is CDN/anycast edge — not the operator’s office',
      detail:
        'Traffic likely terminates on a CDN. The city shown is often a nearby PoP, not where the site operator sits. Useful for infrastructure notes, not for locating a person.',
    })
    compensatingChecks.push(
      'Inspect TLS certificate SANs and issuer for the real origin brand/domain.',
      'Follow CNAME chain / DNS history for origin hostnames (external tools).',
      'Treat CDN geo as infrastructure context only.',
    )
  } else if (hostingLike || geoTrust === 'limited') {
    findings.push({
      id: 'hosting-geo-limit',
      severity: 'low',
      title: 'Hosting/datacenter IP — geo is the server region',
      detail:
        'This looks like VPS/hosting. Location is where the server is rented, not necessarily where an attacker or operator is.',
    })
    compensatingChecks.push(
      'Note the hosting ASN/org as infrastructure evidence.',
      'Combine with domain age, content language, and payment/registrar trails when investigating.',
    )
  }

  if (url.protocol === 'http') {
    findings.push({
      id: 'insecure-http',
      severity: 'medium',
      title: 'URL uses HTTP (not HTTPS)',
      detail:
        'Cleartext transport enables tampering and credential sniffing on-path. Prefer HTTPS for any sensitive destination.',
    })
  }

  if (url.href.includes('@') && /^https?:/i.test(url.href)) {
    // userinfo in authority — classic phishing trick
    try {
      const parsed = new URL(url.href)
      if (parsed.username || parsed.password) {
        findings.push({
          id: 'userinfo-in-url',
          severity: 'high',
          title: 'Credentials or userinfo embedded in the URL',
          detail:
            'URLs with user:pass@host are a common phishing lure to spoof a trusted brand before the real host.',
        })
      }
    } catch {
      // ignore
    }
  }

  if (url.hostname.includes('xn--')) {
    findings.push({
      id: 'punycode-host',
      severity: 'medium',
      title: 'Internationalized (punycode) hostname',
      detail:
        'xn-- hosts can hide look-alike characters. Verify the decoded Unicode label before trusting the brand.',
    })
  }

  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(url.hostname)) {
    findings.push({
      id: 'ip-literal-host',
      severity: 'medium',
      title: 'Host is a raw IP address',
      detail:
        'Legitimate consumer sites rarely use bare IPs in shared links. Common in malware callbacks and disposable infra.',
    })
  }

  const labels = url.hostname.split('.').filter(Boolean)
  const tld = labels[labels.length - 1]?.toLowerCase()
  if (tld && SUSPICIOUS_TLDS.has(tld)) {
    findings.push({
      id: 'suspicious-tld',
      severity: 'low',
      title: `Uncommon or abuse-prone TLD (.${tld})`,
      detail:
        'Not proof of malice, but these TLDs appear often in disposable phishing and malware campaigns.',
    })
  }

  if (labels.length >= 5) {
    findings.push({
      id: 'deep-subdomains',
      severity: 'low',
      title: 'Unusually deep subdomain chain',
      detail:
        'Long subdomain chains are sometimes used to visually bury the real registrable domain.',
    })
  }

  if (url.href.length > 180) {
    findings.push({
      id: 'long-url',
      severity: 'info',
      title: 'Very long URL',
      detail:
        'Long query strings can hide tracking or obfuscated payloads. Review parameters carefully.',
    })
  }

  // URL-embedded coords vs host IP geo mismatch (only when both exist and geo not fully untrusted for distance math — still show as signal)
  if (
    hostGeo?.coordinates &&
    url.coordinates.length > 0 &&
    !vpnLike
  ) {
    const urlCoord = url.coordinates[0]
    const distanceKm = haversineKm(
      urlCoord.latitude,
      urlCoord.longitude,
      hostGeo.coordinates.latitude,
      hostGeo.coordinates.longitude,
    )
    if (distanceKm > 500) {
      findings.push({
        id: 'url-vs-ip-geo-mismatch',
        severity: distanceKm > 2000 ? 'medium' : 'low',
        title: 'URL coordinates disagree with host IP geo',
        detail: `Embedded URL coordinates are ~${Math.round(distanceKm)} km from the host IP’s approximate geo. Can indicate spoofed map links, CDN mismatch, or unrelated hosting — investigate, don’t assume either point is “truth.”`,
      })
    }
  } else if (vpnLike && url.coordinates.length > 0) {
    findings.push({
      id: 'prefer-url-coords-over-vpn-ip',
      severity: 'info',
      title: 'Prefer URL-embedded clues over VPN IP geo',
      detail:
        'Because the host IP looks anonymized, any coordinates or place names inside the URL string are stronger investigation leads than the IP city — and still may be fabricated.',
    })
  }

  if (compensatingChecks.length === 0) {
    compensatingChecks.push(
      'Cross-check domain reputation and TLS certificate outside this page when stakes are high.',
      'Remember IP geo is approximate even without VPN.',
    )
  }

  const riskScore = scoreFindings(findings)
  return {
    riskScore,
    riskLabel: labelForScore(riskScore),
    geoUsable,
    findings: findings.sort(
      (a, b) => severityRank(b.severity) - severityRank(a.severity),
    ),
    compensatingChecks,
  }
}

function severityRank(severity: FindingSeverity): number {
  switch (severity) {
    case 'high':
      return 4
    case 'medium':
      return 3
    case 'low':
      return 2
    case 'info':
      return 1
    default: {
      const _exhaustive: never = severity
      return _exhaustive
    }
  }
}

function scoreFindings(findings: SecurityFinding[]): number {
  let score = 0
  for (const finding of findings) {
    switch (finding.severity) {
      case 'high':
        score += 35
        break
      case 'medium':
        score += 20
        break
      case 'low':
        score += 10
        break
      case 'info':
        score += 4
        break
      default: {
        const _exhaustive: never = finding.severity
        void _exhaustive
      }
    }
  }
  return Math.min(100, score)
}

function labelForScore(
  score: number,
): SecurityAssessment['riskLabel'] {
  if (score >= 70) return 'high'
  if (score >= 40) return 'elevated'
  if (score >= 20) return 'moderate'
  return 'low'
}

function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const r = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * r * Math.asin(Math.sqrt(a))
}
