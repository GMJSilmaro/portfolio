'use client'

import { useState, useTransition } from 'react'
import { signOut } from 'next-auth/react'

type AnalyzeResult = {
  analyzedAt: string
  disclaimer: string
  url: {
    href: string
    protocol: string
    hostname: string
    pathname: string
    searchParams: Record<string, string>
    coordinates: Array<{
      source: string
      latitude: number
      longitude: number
      note?: string
    }>
    placeHints: Array<{ source: string; value: string; note?: string }>
    warnings: string[]
  }
  hostGeo: {
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
  } | null
}

function formatIpLocation(geo: NonNullable<AnalyzeResult['hostGeo']>): string {
  if (geo.locationUnavailable) return 'Unavailable'
  const parts = [geo.city, geo.region, geo.country].filter(Boolean)
  return parts.length ? parts.join(', ') : 'Unavailable'
}

export function UrlLocationTool() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<AnalyzeResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    setResult(null)

    startTransition(async () => {
      try {
        const res = await fetch('/api/analyze-url', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        })

        if (res.status === 401) {
          setError('Session expired. Sign in again.')
          return
        }
        if (res.status === 429) {
          setError('Rate limited. Wait a moment and try again.')
          return
        }

        const data = await res.json()
        if (!res.ok) {
          setError(
            typeof data.error === 'string' ? data.error : 'Analysis failed.',
          )
          return
        }

        setResult(data as AnalyzeResult)
      } catch {
        setError('Network error while analyzing the URL.')
      }
    })
  }

  return (
    <main className="bg-dossier-grain min-h-screen">
      <div className="mx-auto max-w-dossier dossier-pad pb-16">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-[color:var(--rule)] pb-6">
          <div>
            <p className="dossier-kicker">Private · noindex · owner only</p>
            <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-tight text-ink">
              URL location
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Paste a link for cybersecurity review. We extract coordinates and
              place clues already present in the URL, then resolve the host to
              an approximate IP location. Nothing is logged to a database — this
              is analysis, not visit tracking.
            </p>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/private/login' })}
            className="border border-[color:var(--rule-strong)] bg-panel px-3 py-2 text-sm text-ink hover:border-stamp"
          >
            Sign out
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="border border-[color:var(--rule)] bg-panel p-5"
        >
          <label className="block space-y-2">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted">
              Paste URL
            </span>
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              type="text"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              required
              maxLength={2048}
              placeholder="https://maps.example.com/@14.5995,120.9842,12z"
              className="w-full border border-[color:var(--rule-strong)] bg-paper px-3 py-2.5 font-mono text-sm text-ink outline-none focus:border-signal"
            />
          </label>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={pending || !url.trim()}
              className="bg-signal px-4 py-2.5 text-sm font-medium text-white hover:bg-signal-soft disabled:opacity-60"
            >
              {pending ? 'Analyzing…' : 'Analyze URL'}
            </button>
            <p className="text-xs text-ink-muted">
              Server-side only · owner session required · no public tracking
            </p>
          </div>
        </form>

        {error ? (
          <p
            className="mt-6 border border-stamp/30 bg-panel px-4 py-3 text-sm text-stamp"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        {pending && !result && !error ? (
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
            Loading…
          </p>
        ) : null}

        {!pending && !error && !result ? (
          <p className="mt-6 border border-dashed border-[color:var(--rule-strong)] px-4 py-8 text-center text-sm text-ink-soft">
            Empty — paste a URL above to see URL-embedded clues and approximate
            host IP location.
          </p>
        ) : null}

        {result ? (
          <div className="mt-8 space-y-8">
            <p className="text-xs leading-relaxed text-ink-muted">
              {result.disclaimer}
            </p>

            <section>
              <h2 className="font-display text-xl font-medium text-ink">
                URL-embedded location clues
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                Parsed only from the string you pasted — no request is made to
                the target site for this section.
              </p>

              {result.url.warnings.length > 0 ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-muted">
                  {result.url.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              ) : null}

              <dl className="mt-4 grid gap-3 border border-[color:var(--rule)] bg-panel p-5 text-sm sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                    Normalized URL
                  </dt>
                  <dd className="mt-1 break-all font-mono text-xs text-ink">
                    {result.url.href}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                    Host
                  </dt>
                  <dd className="mt-1 font-mono text-ink">{result.url.hostname}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                    Path
                  </dt>
                  <dd className="mt-1 break-all font-mono text-xs text-ink">
                    {result.url.pathname || '/'}
                  </dd>
                </div>
              </dl>

              <h3 className="mt-5 font-display text-lg font-medium text-ink">
                Coordinates in URL
              </h3>
              {result.url.coordinates.length === 0 ? (
                <p className="mt-2 text-sm text-ink-soft">
                  No coordinate pairs detected in the URL.
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-[color:var(--rule)] border border-[color:var(--rule)] bg-panel">
                  {result.url.coordinates.map((coord) => (
                    <li
                      key={`${coord.source}-${coord.latitude}-${coord.longitude}`}
                      className="px-4 py-3 text-sm"
                    >
                      <p className="font-mono text-ink">
                        {coord.latitude.toFixed(6)}, {coord.longitude.toFixed(6)}
                      </p>
                      <p className="mt-1 text-xs text-ink-muted">
                        Source: {coord.source}
                        {coord.note ? ` · ${coord.note}` : ''}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              <h3 className="mt-5 font-display text-lg font-medium text-ink">
                Place / query hints
              </h3>
              {result.url.placeHints.length === 0 ? (
                <p className="mt-2 text-sm text-ink-soft">
                  No textual place hints detected.
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-[color:var(--rule)] border border-[color:var(--rule)] bg-panel">
                  {result.url.placeHints.map((hint) => (
                    <li
                      key={`${hint.source}-${hint.value}`}
                      className="px-4 py-3 text-sm"
                    >
                      <p className="text-ink">{hint.value}</p>
                      <p className="mt-1 text-xs text-ink-muted">
                        Source: {hint.source}
                        {hint.note ? ` · ${hint.note}` : ''}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink">
                Approximate host IP location
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                Distinct from URL-embedded coordinates. Based on DNS → IP → local
                GeoLite lookup of the hostname.
              </p>

              {!result.hostGeo ? (
                <p className="mt-3 text-sm text-ink-soft">
                  Host geo skipped for this URL type (e.g. geo: URI or localhost).
                </p>
              ) : (
                <dl className="mt-4 grid gap-3 border border-[color:var(--rule)] bg-panel p-5 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                      Resolved IP
                    </dt>
                    <dd className="mt-1 font-mono text-ink">
                      {result.hostGeo.primaryIp || '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                      Approx. location
                    </dt>
                    <dd className="mt-1 text-ink">
                      {formatIpLocation(result.hostGeo)}
                      <span className="mt-1 block text-xs text-ink-muted">
                        Source: {result.hostGeo.source}
                        {result.hostGeo.locationUnavailable
                          ? ' · unavailable'
                          : ''}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                      Timezone (GeoLite)
                    </dt>
                    <dd className="mt-1 text-ink">
                      {result.hostGeo.timezone || '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                      GeoLite coordinates
                    </dt>
                    <dd className="mt-1 font-mono text-ink">
                      {result.hostGeo.coordinates
                        ? `${result.hostGeo.coordinates.latitude.toFixed(4)}, ${result.hostGeo.coordinates.longitude.toFixed(4)}`
                        : '—'}
                    </dd>
                  </div>
                  {result.hostGeo.resolvedAddresses.length > 1 ? (
                    <div className="sm:col-span-2">
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                        All resolved addresses
                      </dt>
                      <dd className="mt-1 font-mono text-xs text-ink-soft">
                        {result.hostGeo.resolvedAddresses.join(', ')}
                      </dd>
                    </div>
                  ) : null}
                  <div className="sm:col-span-2">
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                      Notes
                    </dt>
                    <dd className="mt-1 space-y-1 text-xs text-ink-muted">
                      {result.hostGeo.notes.map((note) => (
                        <p key={note}>{note}</p>
                      ))}
                    </dd>
                  </div>
                </dl>
              )}
            </section>
          </div>
        ) : null}
      </div>
    </main>
  )
}
