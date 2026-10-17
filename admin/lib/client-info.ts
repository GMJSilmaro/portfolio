import { geolocation, ipAddress } from '@vercel/functions'
import { UAParser } from 'ua-parser-js'
import type { LocationSource } from '@prisma/client'

export type ClientObservation = {
  clientIp: string
  ipCity: string | null
  ipRegion: string | null
  ipCountry: string | null
  ipLocationSource: LocationSource
  ipLocationUnavailable: boolean
  browser: string | null
  os: string | null
  userAgent: string | null
}

function parseUserAgent(userAgent: string | null) {
  if (!userAgent) {
    return { browser: null, os: null }
  }
  const result = new UAParser(userAgent).getResult()
  const browser = result.browser.name
    ? [result.browser.name, result.browser.version].filter(Boolean).join(' ')
    : null
  const os = result.os.name
    ? [result.os.name, result.os.version].filter(Boolean).join(' ')
    : null
  return { browser, os }
}

/**
 * Resolve client IP using Vercel's trusted proxy surface only.
 * Do not trust arbitrary client-supplied forwarding headers when not on Vercel.
 * IP location is approximate — never an exact address or identity proof.
 */
export function observeClient(request: Request): ClientObservation {
  const userAgent = request.headers.get('user-agent')
  const { browser, os } = parseUserAgent(userAgent)

  const onVercel = process.env.VERCEL === '1'

  let clientIp = 'unknown'
  if (onVercel) {
    const fromHelper = ipAddress(request)
    const fromTrusted =
      request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip')?.trim() ||
      null
    // Vercel overwrites x-forwarded-for to prevent spoofing on their edge.
    const fromForwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    clientIp = fromHelper || fromTrusted || fromForwarded || 'unknown'
  } else if (process.env.NODE_ENV === 'development') {
    clientIp = '127.0.0.1'
  }

  let ipCity: string | null = null
  let ipRegion: string | null = null
  let ipCountry: string | null = null
  let ipLocationSource: LocationSource = 'UNAVAILABLE'
  let ipLocationUnavailable = true

  if (onVercel) {
    const geo = geolocation(request)
    const cityHeader = decodeHeader(request.headers.get('x-vercel-ip-city'))
    const regionHeader = request.headers.get('x-vercel-ip-country-region')
    const countryHeader = request.headers.get('x-vercel-ip-country')

    ipCity = geo.city || cityHeader
    ipRegion = geo.countryRegion || regionHeader
    ipCountry = geo.country || countryHeader

    if (ipCity || ipRegion || ipCountry) {
      ipLocationSource = 'VERCEL'
      ipLocationUnavailable = false
    }
  }

  return {
    clientIp,
    ipCity,
    ipRegion,
    ipCountry,
    ipLocationSource,
    ipLocationUnavailable,
    browser,
    os,
    userAgent,
  }
}

function decodeHeader(value: string | null): string | null {
  if (!value) return null
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}
