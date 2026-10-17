'use client'

import { useState, useTransition } from 'react'
import { parseUrlLocationClues } from '@/lib/parse-url-location'
import {
  resolveHostGeoClient,
  type HostGeoResult,
} from '@/lib/resolve-host-geo-client'
import { signalLabel } from '@/lib/network-reputation'
import type { UrlParseResult } from '@/lib/parse-url-location'

type Analysis = {
  url: UrlParseResult
  hostGeo: HostGeoResult | null
}

function formatIpLocation(geo: HostGeoResult): string {
  if (geo.locationUnavailable) return 'Unavailable'
  const parts = [geo.city, geo.region, geo.country].filter(Boolean)
  return parts.length ? parts.join(', ') : 'Unavailable'
}

export function UrlLocationTool() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<Analysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    setResult(null)

    startTransition(async () => {
      try {
        const parsed = parseUrlLocationClues(url)
        let hostGeo: HostGeoResult | null = null

        const skipDns =
          parsed.protocol === 'geo' ||
          !parsed.hostname ||
          parsed.hostname === 'localhost' ||
          parsed.hostname.endsWith('.localhost')

        if (!skipDns) {
          hostGeo = await resolveHostGeoClient(parsed.hostname)
        }

        setResult({ url: parsed, hostGeo })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Analysis failed.')
      }
    })
  }

  return (
    <main className="relative min-h-screen bg-paper text-ink">
      <div
        className="pointer-events-none absolute inset-0 bg-dossier-grain"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[72rem] dossier-pad pb-16">
        <div className="mb-8 border-b border-[color:var(--rule)] pb-6">
          <p className="dossier-kicker">Private · noindex · unlisted</p>
          <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-tight text-ink">
            URL location
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
            Paste a link to extract coordinates from the URL string and
            approximate host IP location. VPN/CDN marks IP geo as untrusted. A
            link cannot read another person&apos;s phone GPS.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="border border-[color:var(--rule)] bg-panel p-4 sm:p-5"
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
              className="min-h-11 w-full border border-[color:var(--rule-strong)] bg-paper px-3 py-2.5 font-mono text-sm text-ink outline-none placeholder:text-ink-muted/70 focus:border-signal"
            />
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="submit"
              disabled={pending || !url.trim()}
              className="min-h-11 bg-signal px-4 py-2.5 text-sm font-medium text-white hover:bg-signal-soft disabled:opacity-60"
            >
              {pending ? 'Analyzing…' : 'Analyze URL'}
            </button>
            <p className="text-xs text-ink-muted">
              Client-side only · not in public navigation
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
            Empty — paste a URL above to analyze it.
          </p>
        ) : null}

        {result ? (
          <div className="mt-8 space-y-8">
            <section>
              <h2 className="font-display text-xl font-medium text-ink">
                URL clues
              </h2>
              <dl className="mt-4 grid gap-3 border border-[color:var(--rule)] bg-panel p-4 text-sm sm:grid-cols-2 sm:p-5">
                <div className="sm:col-span-2">
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                    URL
                  </dt>
                  <dd className="mt-1 break-all font-mono text-xs text-ink">
                    {result.url.href}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                    Host
                  </dt>
                  <dd className="mt-1 font-mono text-ink">
                    {result.url.hostname}
                  </dd>
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
                <p className="mt-2 text-sm text-ink-soft">None found.</p>
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
                        {coord.source}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {result.url.placeHints.length > 0 ? (
                <>
                  <h3 className="mt-5 font-display text-lg font-medium text-ink">
                    Place hints
                  </h3>
                  <ul className="mt-3 divide-y divide-[color:var(--rule)] border border-[color:var(--rule)] bg-panel">
                    {result.url.placeHints.map((hint) => (
                      <li
                        key={`${hint.source}-${hint.value}`}
                        className="px-4 py-3 text-sm text-ink"
                      >
                        {hint.value}
                        <span className="mt-1 block text-xs text-ink-muted">
                          {hint.source}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink">
                Host IP location
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                Approximate server/edge location only — not another person&apos;s
                phone GPS.
              </p>

              {!result.hostGeo ? (
                <p className="mt-3 text-sm text-ink-soft">Skipped for this URL.</p>
              ) : (
                <>
                  {result.hostGeo.reputation ? (
                    <div
                      className={`mt-4 border p-4 sm:p-5 ${
                        result.hostGeo.reputation.geoTrust === 'untrusted'
                          ? 'border-stamp/40 bg-stamp/5'
                          : result.hostGeo.reputation.geoTrust === 'limited'
                            ? 'border-signal/30 bg-signal/5'
                            : 'border-[color:var(--rule)] bg-panel'
                      }`}
                    >
                      <p className="text-sm font-medium text-ink">
                        {result.hostGeo.reputation.summary}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {result.hostGeo.reputation.signals.map((signal) => (
                          <span
                            key={signal}
                            className="border border-[color:var(--rule-strong)] bg-paper px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-soft"
                          >
                            {signalLabel(signal)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <dl className="mt-4 grid gap-3 border border-[color:var(--rule)] bg-panel p-4 text-sm sm:grid-cols-2 sm:p-5">
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
                        {result.hostGeo.reputation?.geoTrust === 'untrusted'
                          ? ' · untrusted'
                          : result.hostGeo.reputation?.geoTrust === 'limited'
                            ? ' · limited'
                            : ''}
                      </dt>
                      <dd className="mt-1 text-ink">
                        {formatIpLocation(result.hostGeo)}
                        <span className="mt-1 block text-xs text-ink-muted">
                          {result.hostGeo.source}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                        ASN / org
                      </dt>
                      <dd className="mt-1 text-ink">
                        {result.hostGeo.asn != null
                          ? `AS${result.hostGeo.asn}`
                          : '—'}
                        {result.hostGeo.org ? (
                          <span className="mt-1 block text-xs text-ink-soft">
                            {result.hostGeo.org}
                          </span>
                        ) : null}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                        Coordinates
                      </dt>
                      <dd className="mt-1 font-mono text-ink">
                        {result.hostGeo.coordinates
                          ? `${result.hostGeo.coordinates.latitude.toFixed(4)}, ${result.hostGeo.coordinates.longitude.toFixed(4)}`
                          : '—'}
                      </dd>
                    </div>
                  </dl>
                </>
              )}
            </section>
          </div>
        ) : null}

        <p className="mt-10 text-center text-xs text-ink-muted">
          <a href="/" className="underline-offset-2 hover:underline">
            ← Back to CV Studio
          </a>
        </p>
      </div>
    </main>
  )
}
