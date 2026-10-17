export type UrlCoordinateHit = {
  source: string
  latitude: number
  longitude: number
  note?: string
}

export type UrlPlaceHint = {
  source: string
  value: string
  note?: string
}

export type UrlParseResult = {
  href: string
  protocol: string
  hostname: string
  port: string
  pathname: string
  searchParams: Record<string, string>
  coordinates: UrlCoordinateHit[]
  placeHints: UrlPlaceHint[]
  warnings: string[]
}

const COORD_PAIR =
  /(-?\d{1,3}(?:\.\d+)?)\s*[,/~/\s]\s*(-?\d{1,3}(?:\.\d+)?)/

const GOOGLE_AT = /@(-?\d+\.\d+),(-?\d+\.\d+)/
const GOOGLE_3D_4D = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/
/** Google sometimes encodes lng then lat as !2d!3d */
const GOOGLE_2D_3D = /!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/
const APPLE_LL = /[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/i
const BING_CP = /[?&]cp=(-?\d+\.\d+)~(-?\d+\.\d+)/i
const GEO_URI = /^geo:(-?\d+\.\d+),(-?\d+\.\d+)/i

const LAT_KEYS = new Set([
  'lat',
  'latitude',
  'y',
  'mlat',
  'center_lat',
  'clat',
])
const LNG_KEYS = new Set([
  'lng',
  'lon',
  'long',
  'longitude',
  'x',
  'mlon',
  'center_lng',
  'center_lon',
  'clng',
  'clon',
])
const PAIR_KEYS = new Set([
  'll',
  'center',
  'cp',
  'q',
  'query',
  'destination',
  'origin',
  'coords',
  'coordinate',
  'coordinates',
  'location',
  'loc',
  'point',
  'sll',
])
const PLACE_KEYS = new Set([
  'q',
  'query',
  'place',
  'place_id',
  'address',
  'addr',
  'city',
  'region',
  'state',
  'country',
  'venue',
  'near',
  'destination',
  'origin',
  'name',
])

function validCoord(lat: number, lng: number): boolean {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180
  )
}

function pushCoord(
  list: UrlCoordinateHit[],
  source: string,
  lat: number,
  lng: number,
  note?: string,
) {
  if (!validCoord(lat, lng)) return
  const exists = list.some(
    (c) =>
      Math.abs(c.latitude - lat) < 1e-7 && Math.abs(c.longitude - lng) < 1e-7,
  )
  if (exists) return
  list.push({ source, latitude: lat, longitude: lng, note })
}

function tryParsePair(raw: string): { lat: number; lng: number } | null {
  const match = raw.match(COORD_PAIR)
  if (!match) return null
  const lat = Number(match[1])
  const lng = Number(match[2])
  if (!validCoord(lat, lng)) return null
  return { lat, lng }
}

/**
 * Extract location clues already present in the URL string.
 * Pure client-side — does not contact the target host.
 */
export function parseUrlLocationClues(rawInput: string): UrlParseResult {
  const warnings: string[] = []
  const coordinates: UrlCoordinateHit[] = []
  const placeHints: UrlPlaceHint[] = []

  let href = rawInput.trim()
  if (!href) {
    throw new Error('URL is required')
  }

  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href)) {
    href = `https://${href}`
    warnings.push('Scheme missing — assumed https:// for parsing.')
  }

  let url: URL
  try {
    url = new URL(href)
  } catch {
    throw new Error('Invalid URL')
  }

  if (url.protocol === 'geo:') {
    const geo = href.match(GEO_URI)
    if (geo) {
      pushCoord(
        coordinates,
        'geo URI',
        Number(geo[1]),
        Number(geo[2]),
        'RFC 5870 geo: scheme',
      )
    }
  }

  const at = href.match(GOOGLE_AT)
  if (at) {
    pushCoord(
      coordinates,
      'path @lat,lng',
      Number(at[1]),
      Number(at[2]),
      'Common in Google Maps share links',
    )
  }

  const d3 = href.match(GOOGLE_3D_4D)
  if (d3) {
    pushCoord(
      coordinates,
      'Google Maps !3d!4d',
      Number(d3[1]),
      Number(d3[2]),
      'Embedded Google Maps marker coordinates',
    )
  }

  const apple = href.match(APPLE_LL)
  if (apple) {
    pushCoord(
      coordinates,
      'll query param',
      Number(apple[1]),
      Number(apple[2]),
      'Apple Maps–style ll=lat,lng',
    )
  }

  const d2 = href.match(GOOGLE_2D_3D)
  if (d2) {
    // !2d is longitude, !3d is latitude
    pushCoord(
      coordinates,
      'Google Maps !2d!3d',
      Number(d2[2]),
      Number(d2[1]),
      'Embedded Google Maps lng/lat pair',
    )
  }

  const bing = href.match(BING_CP)
  if (bing) {
    pushCoord(
      coordinates,
      'Bing cp=',
      Number(bing[1]),
      Number(bing[2]),
      'Bing Maps cp=lat~lng',
    )
  }

  const searchParams: Record<string, string> = {}
  url.searchParams.forEach((value, key) => {
    searchParams[key] = value
    const lower = key.toLowerCase()

    if (PAIR_KEYS.has(lower)) {
      const pair = tryParsePair(value)
      if (pair) {
        pushCoord(coordinates, `query:${key}`, pair.lat, pair.lng)
      } else if (
        PLACE_KEYS.has(lower) &&
        value.trim() &&
        !/^\d+(\.\d+)?$/.test(value)
      ) {
        placeHints.push({
          source: `query:${key}`,
          value: value.slice(0, 200),
          note: 'Textual place/query clue (not verified)',
        })
      }
    }

    if (LAT_KEYS.has(lower)) {
      const lat = Number(value)
      for (const [otherKey, otherVal] of url.searchParams.entries()) {
        if (LNG_KEYS.has(otherKey.toLowerCase())) {
          pushCoord(
            coordinates,
            `query:${key}+${otherKey}`,
            lat,
            Number(otherVal),
          )
        }
      }
    }

    if (PLACE_KEYS.has(lower) && !PAIR_KEYS.has(lower) && value.trim()) {
      const pair = tryParsePair(value)
      if (!pair) {
        placeHints.push({
          source: `query:${key}`,
          value: value.slice(0, 200),
          note: 'Textual place/query clue (not verified)',
        })
      }
    }
  })

  const segments = url.pathname.split('/').filter(Boolean)
  for (const segment of segments) {
    let decoded = segment
    try {
      decoded = decodeURIComponent(segment)
    } catch {
      // keep raw segment
    }
    const pair = tryParsePair(decoded)
    if (pair) {
      pushCoord(coordinates, 'path segment', pair.lat, pair.lng)
      continue
    }
    if (
      /^[A-Za-z][A-Za-z0-9+._-]{2,}$/.test(decoded) &&
      /[A-Za-z]{3,}/.test(decoded) &&
      !/^(www|api|v\d+|static|assets|cdn|login|auth|admin|private)$/i.test(
        decoded,
      )
    ) {
      if (/[-_]/.test(decoded) || /^[A-Z][a-z]+/.test(decoded)) {
        placeHints.push({
          source: 'path segment',
          value: decoded.slice(0, 120),
          note: 'Heuristic path token — may not be a place',
        })
      }
    }
  }

  return {
    href: url.href,
    protocol: url.protocol.replace(/:$/, ''),
    hostname: url.hostname,
    port: url.port || '',
    pathname: url.pathname,
    searchParams,
    coordinates,
    placeHints: dedupePlaces(placeHints).slice(0, 20),
    warnings,
  }
}

function dedupePlaces(hints: UrlPlaceHint[]): UrlPlaceHint[] {
  const seen = new Set<string>()
  const out: UrlPlaceHint[] = []
  for (const hint of hints) {
    const key = `${hint.source}:${hint.value.toLowerCase()}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(hint)
  }
  return out
}
