export type NetworkSignal =
  | 'vpn_or_proxy_suspected'
  | 'cdn_or_anycast'
  | 'hosting_or_datacenter'
  | 'tor_suspected'
  | 'residential_or_unknown'

export type NetworkReputation = {
  signals: NetworkSignal[]
  confidence: 'low' | 'medium' | 'high'
  summary: string
  geoTrust: 'untrusted' | 'limited' | 'normal'
  reasons: string[]
  asn: number | null
  org: string | null
  isp: string | null
  /** Flags from ipwho.is when present (not always available on free tier). */
  apiFlags: {
    vpn: boolean | null
    proxy: boolean | null
    tor: boolean | null
    hosting: boolean | null
  }
}

const CDN_ASNS = new Set([
  13335, // Cloudflare
  54113, // Fastly
  20940, // Akamai
  16625, // Akamai
  15169, // Google
  16509, // Amazon
  14618, // Amazon
  8075, // Microsoft
  32934, // Meta
  36459, // GitHub
  14061, // DigitalOcean (often hosting)
])

const HOSTING_ASNS = new Set([
  14061, // DigitalOcean
  63949, // Linode/Akamai
  20473, // Choopa/Vultr
  24940, // Hetzner
  16276, // OVH
  51167, // Contabo
  62567, // DigitalOcean
])

const VPN_ORG_PATTERNS = [
  /\bvpn\b/i,
  /nordvpn/i,
  /expressvpn/i,
  /surfshark/i,
  /mullvad/i,
  /proton\s*vpn/i,
  /private\s*internet\s*access|\bpia\b/i,
  /cyberghost/i,
  /ipvanish/i,
  /tunnelbear/i,
  /windscribe/i,
  /hide\.?me/i,
  /purevpn/i,
  /hotspot\s*shield/i,
  /m247/i,
  /datacamp/i,
  /packet\s*hub/i,
  /vpn\s*consumer/i,
  /logicweb/i,
  /quasi\s*networks/i,
]

const PROXY_ORG_PATTERNS = [
  /\bproxy\b/i,
  /socks/i,
  /residential\s*proxy/i,
  /bright\s*data|luminati/i,
  /oxylabs/i,
  /smartproxy/i,
  /netnut/i,
]

const CDN_ORG_PATTERNS = [
  /cloudflare/i,
  /fastly/i,
  /akamai/i,
  /cloudfront|amazon\s*aws|aws\s*cloud/i,
  /azure\s*front\s*door|microsoft\s*corporation/i,
  /google\s*(llc|cloud)|googleusercontent/i,
  /incapsula|imperva/i,
  /keycdn|bunnycdn|stackpath|cdn77/i,
]

const HOSTING_ORG_PATTERNS = [
  /digitalocean/i,
  /linode/i,
  /vultr/i,
  /hetzner/i,
  /\bovh\b/i,
  /contabo/i,
  /hostinger/i,
  /godaddy|amazon\.com|aws\b/i,
  /datacenter|data\s*centre|dedicated\s*server/i,
  /colocation|colo\b/i,
  /vps\b|virtual\s*private\s*server/i,
]

const TOR_ORG_PATTERNS = [/\btor\b/i, /tor[-\s]?exit/i]

/**
 * Classify host IP network reputation from ASN/org (+ optional API flags).
 * Cannot reveal a true location behind a VPN — only that geo may be untrusted.
 */
export function classifyNetworkReputation(input: {
  asn?: number | null
  org?: string | null
  isp?: string | null
  apiFlags?: {
    vpn?: boolean | null
    proxy?: boolean | null
    tor?: boolean | null
    hosting?: boolean | null
  }
}): NetworkReputation {
  const asn = input.asn ?? null
  const org = input.org?.trim() || null
  const isp = input.isp?.trim() || null
  const blob = [org, isp].filter(Boolean).join(' · ')
  const apiFlags = {
    vpn: input.apiFlags?.vpn ?? null,
    proxy: input.apiFlags?.proxy ?? null,
    tor: input.apiFlags?.tor ?? null,
    hosting: input.apiFlags?.hosting ?? null,
  }

  const signals = new Set<NetworkSignal>()
  const reasons: string[] = []

  if (apiFlags.vpn === true) {
    signals.add('vpn_or_proxy_suspected')
    reasons.push('ipwho.is flagged this IP as VPN.')
  }
  if (apiFlags.proxy === true) {
    signals.add('vpn_or_proxy_suspected')
    reasons.push('ipwho.is flagged this IP as proxy.')
  }
  if (apiFlags.tor === true) {
    signals.add('tor_suspected')
    reasons.push('ipwho.is flagged this IP as Tor.')
  }
  if (apiFlags.hosting === true) {
    signals.add('hosting_or_datacenter')
    reasons.push('ipwho.is flagged this IP as hosting.')
  }

  if (asn != null && CDN_ASNS.has(asn)) {
    signals.add('cdn_or_anycast')
    reasons.push(`ASN AS${asn} is commonly used by CDN/cloud providers.`)
  }
  if (asn != null && HOSTING_ASNS.has(asn)) {
    signals.add('hosting_or_datacenter')
    reasons.push(`ASN AS${asn} is commonly used for hosting/VPS.`)
  }

  if (blob) {
    if (matchesAny(blob, VPN_ORG_PATTERNS) || matchesAny(blob, PROXY_ORG_PATTERNS)) {
      signals.add('vpn_or_proxy_suspected')
      reasons.push(`Org/ISP text looks like VPN or proxy (${truncate(blob)}).`)
    }
    if (matchesAny(blob, CDN_ORG_PATTERNS)) {
      signals.add('cdn_or_anycast')
      reasons.push(`Org/ISP text looks like a CDN/cloud edge (${truncate(blob)}).`)
    }
    if (matchesAny(blob, HOSTING_ORG_PATTERNS)) {
      signals.add('hosting_or_datacenter')
      reasons.push(`Org/ISP text looks like hosting/datacenter (${truncate(blob)}).`)
    }
    if (matchesAny(blob, TOR_ORG_PATTERNS)) {
      signals.add('tor_suspected')
      reasons.push(`Org/ISP text looks like Tor-related (${truncate(blob)}).`)
    }
  }

  if (signals.size === 0) {
    signals.add('residential_or_unknown')
    reasons.push(
      'No strong VPN/CDN/hosting signals from ASN/org heuristics or API flags.',
    )
  }

  const confidence = scoreConfidence(signals, apiFlags, Boolean(asn || org || isp))
  const geoTrust = deriveGeoTrust(signals)
  const summary = buildSummary(signals, geoTrust)

  return {
    signals: [...signals],
    confidence,
    summary,
    geoTrust,
    reasons,
    asn,
    org,
    isp,
    apiFlags,
  }
}

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text))
}

function truncate(value: string, max = 80): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value
}

function scoreConfidence(
  signals: Set<NetworkSignal>,
  apiFlags: NetworkReputation['apiFlags'],
  hasOrgContext: boolean,
): 'low' | 'medium' | 'high' {
  const apiHit =
    apiFlags.vpn === true ||
    apiFlags.proxy === true ||
    apiFlags.tor === true ||
    apiFlags.hosting === true

  if (apiHit && (signals.has('vpn_or_proxy_suspected') || signals.has('tor_suspected'))) {
    return 'high'
  }
  if (signals.has('cdn_or_anycast') || signals.has('vpn_or_proxy_suspected')) {
    return hasOrgContext ? 'medium' : 'low'
  }
  if (signals.has('hosting_or_datacenter')) {
    return hasOrgContext ? 'medium' : 'low'
  }
  return 'low'
}

function deriveGeoTrust(
  signals: Set<NetworkSignal>,
): NetworkReputation['geoTrust'] {
  if (
    signals.has('vpn_or_proxy_suspected') ||
    signals.has('tor_suspected') ||
    signals.has('cdn_or_anycast')
  ) {
    return 'untrusted'
  }
  if (signals.has('hosting_or_datacenter')) {
    return 'limited'
  }
  return 'normal'
}

function buildSummary(
  signals: Set<NetworkSignal>,
  geoTrust: NetworkReputation['geoTrust'],
): string {
  const parts: string[] = []
  if (signals.has('vpn_or_proxy_suspected')) parts.push('VPN/proxy suspected')
  if (signals.has('tor_suspected')) parts.push('Tor suspected')
  if (signals.has('cdn_or_anycast')) parts.push('CDN/anycast likely')
  if (signals.has('hosting_or_datacenter')) parts.push('Hosting/datacenter likely')
  if (signals.has('residential_or_unknown') && parts.length === 0) {
    parts.push('No strong anonymity/CDN signals')
  }

  const trust =
    geoTrust === 'untrusted'
      ? 'Treat IP geo as untrusted.'
      : geoTrust === 'limited'
        ? 'Treat IP geo as limited (hosting region ≠ end user).'
        : 'IP geo may still be approximate.'

  return `${parts.join(' · ')}. ${trust} This cannot reveal a true location behind a VPN.`
}

export function signalLabel(signal: NetworkSignal): string {
  switch (signal) {
    case 'vpn_or_proxy_suspected':
      return 'VPN / proxy'
    case 'cdn_or_anycast':
      return 'CDN / anycast'
    case 'hosting_or_datacenter':
      return 'Hosting / datacenter'
    case 'tor_suspected':
      return 'Tor'
    case 'residential_or_unknown':
      return 'No strong signals'
    default: {
      const _exhaustive: never = signal
      return String(_exhaustive)
    }
  }
}
