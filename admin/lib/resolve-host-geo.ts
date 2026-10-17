import { promises as dns } from 'node:dns'
import { isIP } from 'node:net'
import geoip from 'geoip-lite'

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
  source: 'geoip-lite' | 'unavailable'
  notes: string[]
}

/**
 * Resolve hostname → IP(s), then approximate geo via local MaxMind GeoLite
 * data bundled in geoip-lite. Never treat this as an exact address or identity.
 */
export async function resolveHostGeo(hostname: string): Promise<HostGeoResult> {
  const notes: string[] = [
    'IP location is approximate. CDNs, anycast, VPNs, and hosting regions often differ from the real operator or visitor location.',
    'This is not an exact address and is not proof of identity.',
  ]

  const normalized = hostname.replace(/\.$/, '').toLowerCase()
  if (!normalized) {
    return emptyResult(hostname, notes, 'Hostname is empty.')
  }

  let addresses: string[] = []

  if (isIP(normalized)) {
    addresses = [normalized]
  } else {
    try {
      const lookedUp = await dns.lookup(normalized, { all: true, verbatim: true })
      addresses = lookedUp.map((entry) => entry.address)
    } catch {
      return emptyResult(
        normalized,
        notes,
        'DNS lookup failed — host could not be resolved.',
      )
    }
  }

  if (addresses.length === 0) {
    return emptyResult(normalized, notes, 'No addresses returned from DNS.')
  }

  // Prefer IPv4 for geoip-lite coverage; fall back to first address.
  const primaryIp =
    addresses.find((ip) => isIP(ip) === 4) || addresses[0] || null

  if (!primaryIp) {
    return emptyResult(normalized, notes, 'No usable IP for geolocation.')
  }

  const geo = geoip.lookup(primaryIp)
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
      notes: [...notes, 'No GeoLite match for this IP (private/reserved or missing).'],
    }
  }

  const [longitude, latitude] = geo.ll
  return {
    hostname: normalized,
    resolvedAddresses: addresses,
    primaryIp,
    city: geo.city || null,
    region: geo.region || null,
    country: geo.country || null,
    timezone: geo.timezone || null,
    coordinates:
      Number.isFinite(latitude) && Number.isFinite(longitude)
        ? { latitude, longitude }
        : null,
    locationUnavailable: !(geo.city || geo.region || geo.country),
    source: 'geoip-lite',
    notes,
  }
}

function emptyResult(
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
