import {
  classifyNetworkReputation,
  type NetworkReputation,
} from '@/lib/network-reputation'

export type HostGeoResult = {
  hostname: string
  resolvedAddresses: string[]
  primaryIp: string | null
  city: string | null
  region: string | null
  country: string | null
  /** ISO country code when available (e.g. CA, AL, PH). */
  countryCode: string | null
  timezone: string | null
  coordinates: { latitude: number; longitude: number } | null
  locationUnavailable: boolean
  source: string
  notes: string[]
  asn: number | null
  org: string | null
  isp: string | null
  reputation: NetworkReputation | null
}

const IPV4 = /^(?:\d{1,3}\.){3}\d{1,3}$/

/**
 * Browser-side hostname → IP (Cloudflare DNS-over-HTTPS) → approximate geo (ipwho.is)
 * plus VPN/proxy/CDN heuristics. Static Pages friendly — no API keys.
 */
export async function resolveHostGeoClient(
  hostname: string,
): Promise<HostGeoResult> {
  const notes: string[] = [
    'IP location is approximate. CDNs, anycast, VPNs, cloud VMs, and hosting ranges are often listed in commercial VPN/proxy databases.',
    'This is not an exact address and is not proof of identity.',
    'VPN/proxy detection is heuristic — it cannot reveal a true location behind a VPN.',
    'Lookups run in your browser via public DNS/geo APIs — nothing is stored by this site.',
  ]

  const normalized = hostname.replace(/\.$/, '').toLowerCase()
  if (!normalized) {
    return empty(normalized, notes, 'Hostname is empty.')
  }

  if (
    normalized === 'localhost' ||
    normalized.endsWith('.localhost') ||
    normalized === '127.0.0.1' ||
    normalized === '::1'
  ) {
    return empty(normalized, notes, 'Localhost skipped for host geolocation.')
  }

  let addresses: string[] = []

  if (IPV4.test(normalized)) {
    addresses = [normalized]
  } else {
    try {
      addresses = await resolveDnsAddresses(normalized)
    } catch {
      return empty(
        normalized,
        notes,
        'DNS lookup failed — host could not be resolved.',
      )
    }
  }

  if (addresses.length === 0) {
    return empty(normalized, notes, 'No A/AAAA records returned from DNS.')
  }

  // Prefer IPv4 for geo lookup coverage; fall back to first address.
  const primaryIp =
    addresses.find((ip) => IPV4.test(ip)) || addresses[0] || null
  if (!primaryIp) {
    return empty(normalized, notes, 'No usable IP for geolocation.')
  }

  try {
    const geo = await lookupIpwho(primaryIp)
    if (!geo) {
      return {
        ...empty(normalized, notes, 'No geolocation match for this IP.'),
        resolvedAddresses: addresses,
        primaryIp,
      }
    }

    const reputation = classifyNetworkReputation({
      asn: geo.asn,
      org: geo.org,
      isp: geo.isp,
      apiFlags: geo.apiFlags,
    })

    return {
      hostname: normalized,
      resolvedAddresses: addresses,
      primaryIp,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      countryCode: geo.countryCode,
      timezone: geo.timezone,
      coordinates: geo.coordinates,
      locationUnavailable: !(geo.city || geo.region || geo.country),
      source: 'ipwho.is',
      notes,
      asn: geo.asn,
      org: geo.org,
      isp: geo.isp,
      reputation,
    }
  } catch {
    return {
      ...empty(
        normalized,
        notes,
        'Geolocation request failed or was blocked.',
      ),
      resolvedAddresses: addresses,
      primaryIp,
    }
  }
}

async function resolveDnsAddresses(hostname: string): Promise<string[]> {
  const [ipv4, ipv6] = await Promise.all([
    resolveDns(hostname, 'A'),
    resolveDns(hostname, 'AAAA'),
  ])
  return [...ipv4, ...ipv6]
}

async function resolveDns(
  hostname: string,
  type: 'A' | 'AAAA',
): Promise<string[]> {
  const endpoint = new URL('https://cloudflare-dns.com/dns-query')
  endpoint.searchParams.set('name', hostname)
  endpoint.searchParams.set('type', type)

  const res = await fetch(endpoint.toString(), {
    headers: { Accept: 'application/dns-json' },
  })
  if (!res.ok) {
    throw new Error('DNS query failed')
  }

  const data = (await res.json()) as {
    Answer?: Array<{ type: number; data: string }>
  }

  const wantType = type === 'A' ? 1 : 28
  return (data.Answer || [])
    .filter((row) => row.type === wantType && row.data)
    .map((row) => row.data)
}

async function lookupIpwho(ip: string): Promise<{
  city: string | null
  region: string | null
  country: string | null
  countryCode: string | null
  timezone: string | null
  coordinates: { latitude: number; longitude: number } | null
  asn: number | null
  org: string | null
  isp: string | null
  apiFlags: {
    vpn: boolean | null
    proxy: boolean | null
    tor: boolean | null
    hosting: boolean | null
  }
} | null> {
  const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`)
  if (!res.ok) return null
  const data = (await res.json()) as {
    success?: boolean
    city?: string
    region?: string
    country?: string
    country_code?: string
    timezone?: { id?: string } | string
    latitude?: number
    longitude?: number
    connection?: {
      asn?: number
      org?: string
      isp?: string
    }
    security?: {
      vpn?: boolean
      proxy?: boolean
      tor?: boolean
      hosting?: boolean
    }
  }
  if (data.success === false) return null

  const timezone =
    typeof data.timezone === 'string'
      ? data.timezone
      : data.timezone?.id || null

  const coordinates =
    Number.isFinite(data.latitude) && Number.isFinite(data.longitude)
      ? {
          latitude: data.latitude as number,
          longitude: data.longitude as number,
        }
      : null

  return {
    city: data.city || null,
    region: data.region || null,
    country: data.country || null,
    countryCode: data.country_code?.toUpperCase() || null,
    timezone,
    coordinates,
    asn: typeof data.connection?.asn === 'number' ? data.connection.asn : null,
    org: data.connection?.org || null,
    isp: data.connection?.isp || null,
    apiFlags: {
      vpn: typeof data.security?.vpn === 'boolean' ? data.security.vpn : null,
      proxy:
        typeof data.security?.proxy === 'boolean' ? data.security.proxy : null,
      tor: typeof data.security?.tor === 'boolean' ? data.security.tor : null,
      hosting:
        typeof data.security?.hosting === 'boolean'
          ? data.security.hosting
          : null,
    },
  }
}

function empty(
  hostname: string,
  notes: string[],
  extra: string,
): HostGeoResult {
  return {
    hostname,
    resolvedAddresses: [],
    primaryIp: null,
    city: null,
    region: null,
    country: null,
    countryCode: null,
    timezone: null,
    coordinates: null,
    locationUnavailable: true,
    source: 'unavailable',
    notes: [...notes, extra],
    asn: null,
    org: null,
    isp: null,
    reputation: null,
  }
}
