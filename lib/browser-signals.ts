export type BrowserSignals = {
  languages: string[]
  primaryLanguage: string | null
  languageRegion: string | null
  timezone: string | null
}

/** Read this browser’s language/timezone (same signals sites see via Accept-Language). */
export function readBrowserSignals(): BrowserSignals {
  if (typeof navigator === 'undefined') {
    return {
      languages: [],
      primaryLanguage: null,
      languageRegion: null,
      timezone: null,
    }
  }

  const languages =
    navigator.languages?.length > 0
      ? [...navigator.languages]
      : navigator.language
        ? [navigator.language]
        : []

  const primaryLanguage = languages[0] || null
  const languageRegion = regionFromLocale(primaryLanguage)

  let timezone: string | null = null
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || null
  } catch {
    timezone = null
  }

  return { languages, primaryLanguage, languageRegion, timezone }
}

function regionFromLocale(locale: string | null): string | null {
  if (!locale) return null
  // en-CA → CA, fr_CA → CA
  const normalized = locale.replace('_', '-')
  const parts = normalized.split('-')
  if (parts.length >= 2 && /^[A-Za-z]{2}$/.test(parts[1])) {
    return parts[1].toUpperCase()
  }
  return null
}

/**
 * Compare this browser’s locale region to a host IP country.
 * Same class of signal sites use (Accept-Language vs IP) to suspect VPN —
 * here it only compares YOUR browser to the PASTED host, for awareness.
 */
export function languageIpMismatchNote(
  languageRegion: string | null,
  ipCountryCode: string | null | undefined,
): string | null {
  if (!languageRegion || !ipCountryCode) return null
  const ip = ipCountryCode.toUpperCase()
  if (languageRegion === ip) return null
  return `Browser language region (${languageRegion}) differs from host IP country (${ip}). Sites often treat Accept-Language vs IP mismatches as a VPN hint — this compares your browser to the pasted host only.`
}
