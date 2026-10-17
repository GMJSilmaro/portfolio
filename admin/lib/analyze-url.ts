import { parseUrlLocationClues } from '@/lib/parse-url-location'
import { resolveHostGeo } from '@/lib/resolve-host-geo'

export type AnalyzeUrlResult = {
  analyzedAt: string
  url: ReturnType<typeof parseUrlLocationClues>
  hostGeo: Awaited<ReturnType<typeof resolveHostGeo>> | null
  disclaimer: string
}

export async function analyzeUrl(rawUrl: string): Promise<AnalyzeUrlResult> {
  const url = parseUrlLocationClues(rawUrl)

  let hostGeo: AnalyzeUrlResult['hostGeo'] = null
  const skipDns =
    url.protocol === 'geo' ||
    !url.hostname ||
    url.hostname === 'localhost' ||
    url.hostname.endsWith('.localhost')

  if (!skipDns) {
    hostGeo = await resolveHostGeo(url.hostname)
  }

  return {
    analyzedAt: new Date().toISOString(),
    url,
    hostGeo,
    disclaimer:
      'Cybersecurity analysis aid only. URL-embedded coordinates and IP geolocation are approximate clues — not exact addresses, not identity proof, and not authorization to access third-party systems.',
  }
}
