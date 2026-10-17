'use client'

import { useMemo, useState, useTransition } from 'react'
import { parseUrlLocationClues } from '@/lib/parse-url-location'
import {
  resolveHostGeoClient,
  type HostGeoResult,
} from '@/lib/resolve-host-geo-client'
import { signalLabel } from '@/lib/network-reputation'
import { formatAnalysisSummary } from '@/lib/format-analysis-summary'
import {
  collectMismatchNotes,
  readBrowserSignals,
} from '@/lib/browser-signals'
import {
  VPN_DETECTION_DISCLAIMER,
  VPN_DETECTION_NOTES,
} from '@/lib/vpn-detection-notes'
import type { UrlParseResult } from '@/lib/parse-url-location'

type Analysis = {
  url: UrlParseResult
  hostGeo: HostGeoResult | null
  analyzedAt: string
}

function formatIpLocation(geo: HostGeoResult): string {
  if (geo.locationUnavailable) return 'Unavailable'
  const parts = [geo.city, geo.region, geo.country].filter(Boolean)
  return parts.length ? parts.join(', ') : 'Unavailable'
}

function formatManila(iso: string): string {
  return new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}

function mapsHref(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}`
}

export function UrlLocationTool() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<Analysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [copied, setCopied] = useState(false)
  const browserSignals = useMemo(() => readBrowserSignals(), [])
  const mismatchNotes = result?.hostGeo
    ? collectMismatchNotes({
        languageRegion: browserSignals.languageRegion,
        browserTimezone: browserSignals.timezone,
        ipCountryCode: result.hostGeo.countryCode,
        ipTimezone: result.hostGeo.timezone,
      })
    : []

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    setResult(null)
    setCopied(false)

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

        setResult({
          url: parsed,
          hostGeo,
          analyzedAt: new Date().toISOString(),
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Analysis failed.')
      }
    })
  }

  async function copySummary() {
    if (!result) return
    const text = formatAnalysisSummary(
      result.url,
      result.hostGeo,
      result.analyzedAt,
      browserSignals,
      mismatchNotes,
    )
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Could not copy to clipboard.')
    }
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
            Paste a suspicious link for URL clues and host IP/VPN signals.
            Compares this browser&apos;s language/timezone to the pasted host —
            the same class of Accept-Language vs IP mismatch (e.g. en-CA with an
            Albania IP) sites use to suspect VPNs.
          </p>
        </div>

        <aside className="mb-6 border border-[color:var(--rule)] bg-panel p-4 text-sm sm:p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
            This browser (Accept-Language class signals)
          </p>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-ink-muted">Languages</dt>
              <dd className="mt-1 font-mono text-ink">
                {browserSignals.languages.join(', ') || '—'}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-ink-muted">Timezone</dt>
              <dd className="mt-1 font-mono text-ink">
                {browserSignals.timezone || '—'}
              </dd>
            </div>
          </dl>
        </aside>

        <aside className="mb-6 border border-[color:var(--rule)] bg-panel p-4 text-sm sm:p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
            How platforms detect VPNs (awareness)
          </p>
          <ul className="mt-3 space-y-3">
            {VPN_DETECTION_NOTES.map((note) => (
              <li key={note.id}>
                <p className="font-medium text-ink">{note.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft sm:text-sm">
                  {note.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            {VPN_DETECTION_DISCLAIMER}
          </p>
        </aside>

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
            {url.trim() ? (
              <button
                type="button"
                onClick={() => {
                  setUrl('')
                  setResult(null)
                  setError(null)
                  setCopied(false)
                }}
                className="min-h-11 border border-[color:var(--rule-strong)] px-4 py-2.5 text-sm text-ink"
              >
                Clear
              </button>
            ) : null}
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
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-ink-muted">
                Analyzed {formatManila(result.analyzedAt)} (Asia/Manila)
              </p>
              <button
                type="button"
                onClick={copySummary}
                className="min-h-10 border border-[color:var(--rule-strong)] bg-panel px-3 py-2 text-sm text-ink hover:border-signal"
              >
                {copied ? 'Copied' : 'Copy summary'}
              </button>
            </div>

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
                      className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
                    >
                      <div>
                        <p className="font-mono text-ink">
                          {coord.latitude.toFixed(6)},{' '}
                          {coord.longitude.toFixed(6)}
                        </p>
                        <p className="mt-1 text-xs text-ink-muted">
                          {coord.source}
                        </p>
                      </div>
                      <a
                        href={mapsHref(coord.latitude, coord.longitude)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-signal underline-offset-2 hover:underline"
                      >
                        Open map
                      </a>
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
                Approximate server/edge location. VPN/CDN/cloud → treat as
                untrusted. Commercial VPN IP lists often flag the same ranges.
              </p>

              {!result.hostGeo ? (
                <p className="mt-3 text-sm text-ink-soft">Skipped for this URL.</p>
              ) : (
                <>
                  {mismatchNotes.length > 0 ? (
                    <ul className="mt-4 space-y-2" role="status">
                      {mismatchNotes.map((note) => (
                        <li
                          key={note}
                          className="border border-stamp/40 bg-stamp/5 px-4 py-3 text-sm text-ink"
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
                  ) : null}

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
                        Timezone
                      </dt>
                      <dd className="mt-1 text-ink">
                        {result.hostGeo.timezone || '—'}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                        Coordinates
                      </dt>
                      <dd className="mt-1 flex flex-wrap items-center gap-3 font-mono text-ink">
                        {result.hostGeo.coordinates ? (
                          <>
                            <span>
                              {result.hostGeo.coordinates.latitude.toFixed(4)},{' '}
                              {result.hostGeo.coordinates.longitude.toFixed(4)}
                            </span>
                            <a
                              href={mapsHref(
                                result.hostGeo.coordinates.latitude,
                                result.hostGeo.coordinates.longitude,
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-sans text-sm text-signal underline-offset-2 hover:underline"
                            >
                              Open map
                            </a>
                          </>
                        ) : (
                          '—'
                        )}
                      </dd>
                    </div>
                    {result.hostGeo.resolvedAddresses.length > 1 ? (
                      <div className="sm:col-span-2">
                        <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                          All resolved addresses
                        </dt>
                        <dd className="mt-1 break-all font-mono text-xs text-ink-soft">
                          {result.hostGeo.resolvedAddresses.join(', ')}
                        </dd>
                      </div>
                    ) : null}
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
