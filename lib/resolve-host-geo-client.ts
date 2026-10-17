export type HostGeoResult = {
  hostname: string
  resolvedAddresses: string[]
  primaryIp: string | null
  city: string | null
  region: string | null
  country: string | null
  timezone: string | null
  coordinates: { latitude: number; longitude: number } | null
  locationUnavailable: boolean
  source: string
  notes: string[]
}

const IPV4 =
  /^(?:\d{1,3}\.){3}\d{1,3}$/

/**
 * Browser-side hostname → IP (Cloudflare DNS-over-HTTPS) → approximate geo (ipwho.is).
 * Used only because the portfolio is a static GitHub Pages export (no server).
 */
export async function resolveHostGeoClient(
  hostname: string,
): Promise<HostGeoResult> {
  const notes: string[] = [
    'IP location is approximate. CDNs, anycast, VPNs, and hosting regions often differ from the real operator.',
    'This is not an exact address and is not proof of identity.',
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
      addresses = await resolveDnsA(normalized)
    } catch {
      return empty(normalized, notes, 'DNS lookup failed — host could not be resolved.')
    }
  }

  if (addresses.length === 0) {
    return empty(normalized, notes, 'No A records returned from DNS.')
  }

  const primaryIp = addresses[0] ?? null
  if (!primaryIp) {
    return empty(normalized, notes, 'No usable IP for geolocation.')
  }

  try {
    const geo = await lookupIpwho(primaryIp)
    if (!geo) {
      return {
        hostname: normalized,
        resolvedAddresses: addresses,
        primaryIp,
        city: null,
        region: null,
        country: null,
        timezone: null,
        coordinates: null,
        locationUnavailable: true,
        source: 'unavailable',
        notes: [...notes, 'No geolocation match for this IP.'],
      }
    }

    return {
      hostname: normalized,
      resolvedAddresses: addresses,
      primaryIp,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      timezone: geo.timezone,
      coordinates: geo.coordinates,
      locationUnavailable: !(geo.city || geo.region || geo.country),
      source: 'ipwho.is',
      notes,
    }
  } catch {
    return {
      hostname: normalized,
      resolvedAddresses: addresses,
      primaryIp,
      city: null,
      region: null,
      country: null,
      timezone: null,
      coordinates: null,
      locationUnavailable: true,
      source: 'unavailable',
      notes: [...notes, 'Geolocation request failed or was blocked.'],
    }
  }
}

async function resolveDnsA(hostname: string): Promise<string[]> {
  const endpoint = new URL('https://cloudflare-dns.com/dns-query')
  endpoint.searchParams.set('name', hostname)
  endpoint.searchParams.set('type', 'A')

  const res = await fetch(endpoint.toString(), {
    headers: { Accept: 'application/dns-json' },
  })
  if (!res.ok) {
    throw new Error('DNS query failed')
  }

  const data = (await res.json()) as {
    Answer?: Array<{ type: number; data: string }>
  }

  return (data.Answer || [])
    .filter((row) => row.type === 1 && IPV4.test(row.data))
    .map((row) => row.data)
}

async function lookupIpwho(ip: string): Promise<{
  city: string | null
  region: string | null
  country: string | null
  timezone: string | null
  coordinates: { latitude: number; longitude: number } | null
} | null> {
  const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`)
  if (!res.ok) return null
  const data = (await res.json()) as {
    success?: boolean
    city?: string
    region?: string
    country?: string
    timezone?: { id?: string } | string
    latitude?: number
    longitude?: number
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
    timezone,
    coordinates,
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
    timezone: null,
    coordinates: null,
    locationUnavailable: true,
    source: 'unavailable',
    notes: [...notes, extra],
  }
}
