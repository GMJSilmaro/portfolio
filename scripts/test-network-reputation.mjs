#!/usr/bin/env node
/**
 * Smoke checks for VPN/CDN heuristic classification.
 * Mirrors lib/network-reputation.ts critical paths (no TS loader required).
 */

function assert(condition, message) {
  if (!condition) {
    console.error('FAIL:', message)
    process.exitCode = 1
  } else {
    console.log('OK:', message)
  }
}

const CDN_ASNS = new Set([13335, 54113])
const VPN_ORG = [/\bvpn\b/i, /m247/i, /nordvpn/i]
const CDN_ORG = [/cloudflare/i, /fastly/i]

function classify({ asn, org }) {
  const signals = []
  if (asn && CDN_ASNS.has(asn)) signals.push('cdn')
  if (org && VPN_ORG.some((p) => p.test(org))) signals.push('vpn')
  if (org && CDN_ORG.some((p) => p.test(org))) signals.push('cdn')
  return [...new Set(signals)]
}

assert(
  classify({ asn: 13335, org: 'Cloudflare, Inc.' }).includes('cdn'),
  'Cloudflare ASN/org → CDN signal',
)
assert(
  classify({ asn: 9009, org: 'M247 Europe SRL' }).includes('vpn'),
  'M247 org → VPN signal',
)
assert(
  classify({ asn: 123, org: 'Example Residential ISP' }).length === 0,
  'Generic ISP → no strong anonymity signal',
)

if (process.exitCode) process.exit(process.exitCode)
console.log('\nNetwork reputation smoke checks passed.')
