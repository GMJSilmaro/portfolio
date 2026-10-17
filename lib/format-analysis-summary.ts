import type { UrlParseResult } from '@/lib/parse-url-location'
import type { HostGeoResult } from '@/lib/resolve-host-geo-client'

/** Plain-text summary for clipboard / evidence notes. */
export function formatAnalysisSummary(
  url: UrlParseResult,
  hostGeo: HostGeoResult | null,
  analyzedAtIso: string,
): string {
  const manila = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(new Date(analyzedAtIso))

  const lines: string[] = [
    'URL location analysis',
    `Analyzed (Asia/Manila): ${manila}`,
    `URL: ${url.href}`,
    `Host: ${url.hostname}`,
  ]

  if (url.coordinates.length) {
    lines.push('URL coordinates:')
    for (const c of url.coordinates) {
      lines.push(`  - ${c.latitude}, ${c.longitude} (${c.source})`)
    }
  } else {
    lines.push('URL coordinates: none')
  }

  if (url.placeHints.length) {
    lines.push('Place hints:')
    for (const h of url.placeHints) {
      lines.push(`  - ${h.value} (${h.source})`)
    }
  }

  if (!hostGeo) {
    lines.push('Host IP: skipped')
  } else {
    lines.push(`Host IP: ${hostGeo.primaryIp || '—'}`)
    if (hostGeo.resolvedAddresses.length > 1) {
      lines.push(`All IPs: ${hostGeo.resolvedAddresses.join(', ')}`)
    }
    const loc = [hostGeo.city, hostGeo.region, hostGeo.country]
      .filter(Boolean)
      .join(', ')
    lines.push(
      `Approx. IP location: ${loc || 'unavailable'} [${hostGeo.reputation?.geoTrust || 'unknown'}]`,
    )
    if (hostGeo.asn != null || hostGeo.org) {
      lines.push(
        `ASN/org: ${hostGeo.asn != null ? `AS${hostGeo.asn}` : '—'} ${hostGeo.org || ''}`.trim(),
      )
    }
    if (hostGeo.reputation) {
      lines.push(`Reputation: ${hostGeo.reputation.summary}`)
    }
  }

  lines.push(
    'Note: IP geo is approximate. VPN/CDN cannot yield another person\'s device GPS.',
  )

  return lines.join('\n')
}
