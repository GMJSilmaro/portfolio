#!/usr/bin/env node

function assert(condition, message) {
  if (!condition) {
    console.error('FAIL:', message)
    process.exitCode = 1
  } else {
    console.log('OK:', message)
  }
}

// Lightweight mirrors of key behaviors
function geoUsable(signals) {
  const vpn = signals.includes('vpn') || signals.includes('tor')
  const cdn = signals.includes('cdn')
  return !vpn && !cdn
}

assert(geoUsable(['vpn']) === false, 'VPN → geo not usable')
assert(geoUsable(['cdn']) === false, 'CDN → geo not usable')
assert(geoUsable([]) === true, 'No anonymity signals → geo possibly usable')

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (d) => (d * Math.PI) / 180
  const r = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * r * Math.asin(Math.sqrt(a))
}

const d = haversineKm(14.6, 121.0, 40.7, -74.0)
assert(d > 10000, 'Manila vs NYC distance is large (mismatch signal)')

if (process.exitCode) process.exit(process.exitCode)
console.log('\nSecurity assessment smoke checks passed.')
