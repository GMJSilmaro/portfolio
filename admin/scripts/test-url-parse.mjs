#!/usr/bin/env node

function assert(condition, message) {
  if (!condition) {
    console.error('FAIL:', message)
    process.exitCode = 1
  } else {
    console.log('OK:', message)
  }
}

/** Smoke checks mirroring critical parse-url-location paths. */
function smokeParse(raw) {
  let href = raw.trim()
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href)) href = `https://${href}`
  const url = new URL(href)
  const coords = []
  const at = href.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
  if (at) coords.push({ lat: Number(at[1]), lng: Number(at[2]) })
  const lat = url.searchParams.get('lat')
  const lng = url.searchParams.get('lng') || url.searchParams.get('lon')
  if (lat && lng) coords.push({ lat: Number(lat), lng: Number(lng) })
  return { hostname: url.hostname, coords }
}

const maps = smokeParse('https://www.google.com/maps/@14.5995,120.9842,12z')
assert(maps.hostname === 'www.google.com', 'parses Google Maps hostname')
assert(
  maps.coords.some((c) => Math.abs(c.lat - 14.5995) < 1e-6),
  'extracts @lat,lng from Maps URL',
)

const query = smokeParse('https://example.com/x?lat=10.5&lng=20.25')
assert(
  query.coords.some(
    (c) => Math.abs(c.lat - 10.5) < 1e-9 && Math.abs(c.lng - 20.25) < 1e-9,
  ),
  'extracts lat/lng query params',
)

const geoip = (await import('geoip-lite')).default
const lookup = geoip.lookup('8.8.8.8')
assert(!!lookup && !!lookup.country, 'geoip-lite resolves a public IP')

if (process.exitCode) process.exit(process.exitCode)
console.log('\nURL parse / geoip smoke checks passed.')
