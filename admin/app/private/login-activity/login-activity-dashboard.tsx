'use client'

import { useCallback, useState, useTransition } from 'react'
import { signOut } from 'next-auth/react'
import type { PublicLoginActivity } from '@/lib/login-activity-types'
import { formatManila, formatManilaShort } from '@/lib/manila-time'

type Props = {
  initialItems: PublicLoginActivity[]
  loadError: string | null
  lastLoginActivityId: string | null
}

function formatIpLocation(item: PublicLoginActivity): string {
  if (item.ipLocationUnavailable) {
    return 'Unavailable'
  }
  const parts = [item.ipCity, item.ipRegion, item.ipCountry].filter(Boolean)
  return parts.length ? parts.join(', ') : 'Unavailable'
}

function formatDeviceLocation(item: PublicLoginActivity): string {
  switch (item.deviceLocationSource) {
    case 'BROWSER':
      if (
        item.deviceLatitude == null ||
        item.deviceLongitude == null
      ) {
        return 'Coordinates missing'
      }
      return `${item.deviceLatitude.toFixed(5)}, ${item.deviceLongitude.toFixed(5)} (±${Math.round(item.deviceAccuracyM ?? 0)} m)`
    case 'DENIED':
      return 'Permission denied'
    case 'UNSUPPORTED':
      return 'Not supported by this browser'
    case 'TIMEOUT':
      return 'Timed out'
    case 'ERROR':
      return 'Could not read location'
    case 'NONE':
      return 'Not shared'
    default: {
      const _exhaustive: never = item.deviceLocationSource as never
      return String(_exhaustive)
    }
  }
}

export function LoginActivityDashboard({
  initialItems,
  loadError,
  lastLoginActivityId,
}: Props) {
  const [items, setItems] = useState(initialItems)
  const [error, setError] = useState<string | null>(loadError)
  const [pending, startTransition] = useTransition()
  const [geoMessage, setGeoMessage] = useState<string | null>(null)
  const [geoBusy, setGeoBusy] = useState(false)
  const [showGeoExplain, setShowGeoExplain] = useState(false)

  const latest = items[0] ?? null
  const activeLoginId = lastLoginActivityId ?? latest?.id ?? null
  const activeLogin = items.find((item) => item.id === activeLoginId) ?? latest

  const refresh = useCallback(() => {
    startTransition(async () => {
      setError(null)
      try {
        const res = await fetch('/api/login-activity', {
          method: 'GET',
          credentials: 'same-origin',
        })
        if (res.status === 401) {
          setError('Session expired. Sign in again.')
          return
        }
        if (!res.ok) {
          setError('Failed to refresh login activity.')
          return
        }
        const data = (await res.json()) as { items: PublicLoginActivity[] }
        setItems(data.items)
      } catch {
        setError('Network error while refreshing.')
      }
    })
  }, [])

  function onDeleteHistory() {
    const confirmed = window.confirm(
      'Delete all login activity history? This cannot be undone.',
    )
    if (!confirmed) return

    startTransition(async () => {
      setError(null)
      try {
        const res = await fetch('/api/login-activity', {
          method: 'DELETE',
          credentials: 'same-origin',
        })
        if (res.status === 401) {
          setError('Session expired. Sign in again.')
          return
        }
        if (!res.ok) {
          setError('Failed to delete history.')
          return
        }
        setItems([])
        setGeoMessage(null)
      } catch {
        setError('Network error while deleting.')
      }
    })
  }

  async function shareDeviceLocation() {
    setGeoMessage(null)

    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      await postDeviceStatus(activeLoginId, 'unsupported')
      setGeoMessage('This browser does not support geolocation.')
      return
    }

    if (!window.isSecureContext) {
      setGeoMessage(
        'Device location requires HTTPS (or localhost). Open this admin site over HTTPS.',
      )
      return
    }

    if (!activeLoginId) {
      setGeoMessage('No login event available to attach location to.')
      return
    }

    setGeoBusy(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await fetch(
            `/api/login-activity/${activeLoginId}/device-location`,
            {
              method: 'POST',
              credentials: 'same-origin',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                status: 'granted',
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracyM: position.coords.accuracy,
              }),
            },
          )
          if (!res.ok) {
            setGeoMessage('Could not save device location.')
            return
          }
          const data = (await res.json()) as { item: PublicLoginActivity }
          setItems((prev) =>
            prev.map((row) => (row.id === data.item.id ? data.item : row)),
          )
          setGeoMessage('Device location saved for this login.')
          setShowGeoExplain(false)
        } catch {
          setGeoMessage('Network error while saving device location.')
        } finally {
          setGeoBusy(false)
        }
      },
      async (geoError) => {
        const status =
          geoError.code === geoError.PERMISSION_DENIED
            ? 'denied'
            : geoError.code === geoError.TIMEOUT
              ? 'timeout'
              : 'error'
        await postDeviceStatus(activeLoginId, status)
        setGeoMessage(
          status === 'denied'
            ? 'Location permission was denied. Nothing precise was stored.'
            : status === 'timeout'
              ? 'Location request timed out.'
              : 'Could not read device location.',
        )
        setGeoBusy(false)
      },
      { enableHighAccuracy: false, timeout: 15_000, maximumAge: 0 },
    )
  }

  async function postDeviceStatus(
    id: string | null,
    status: 'denied' | 'unsupported' | 'timeout' | 'error',
  ) {
    if (!id) return
    try {
      const res = await fetch(`/api/login-activity/${id}/device-location`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) return
      const data = (await res.json()) as { item: PublicLoginActivity }
      setItems((prev) =>
        prev.map((row) => (row.id === data.item.id ? data.item : row)),
      )
    } catch {
      // Swallow — status is already shown to the user.
    }
  }

  return (
    <main className="bg-dossier-grain min-h-screen">
      <div className="mx-auto max-w-dossier dossier-pad pb-16">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-[color:var(--rule)] pb-6">
          <div>
            <p className="dossier-kicker">Private · noindex · owner only</p>
            <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-tight text-ink">
              Login activity
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Successful admin sign-ins only. IP location is approximate (VPN,
              mobile, and proxies can skew it) and is not an exact address or
              proof of identity. Device coordinates are optional and stored only
              after you grant permission.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={refresh}
              disabled={pending}
              className="border border-[color:var(--rule-strong)] bg-panel px-3 py-2 text-sm text-ink hover:border-signal disabled:opacity-60"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: '/private/login' })}
              className="border border-[color:var(--rule-strong)] bg-panel px-3 py-2 text-sm text-ink hover:border-stamp"
            >
              Sign out
            </button>
          </div>
        </div>

        {error ? (
          <p
            className="mb-6 border border-stamp/30 bg-panel px-4 py-3 text-sm text-stamp"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        {pending && !error ? (
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
            Loading…
          </p>
        ) : null}

        <section className="mb-10">
          <h2 className="font-display text-xl font-medium text-ink">
            Latest successful login
          </h2>
          {!latest ? (
            <p className="mt-3 text-sm text-ink-soft">
              No successful logins recorded yet.
            </p>
          ) : (
            <dl className="mt-4 grid gap-3 border border-[color:var(--rule)] bg-panel p-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                  When (Asia/Manila)
                </dt>
                <dd className="mt-1 text-ink">
                  {formatManila(new Date(latest.createdAt))}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                  Client IP (server-observed)
                </dt>
                <dd className="mt-1 font-mono text-ink">{latest.clientIp}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                  Approximate IP location
                </dt>
                <dd className="mt-1 text-ink">
                  {formatIpLocation(latest)}
                  <span className="mt-1 block text-xs text-ink-muted">
                    Source: {latest.ipLocationSource}
                    {latest.ipLocationUnavailable ? ' · unavailable' : ''}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                  Browser / OS
                </dt>
                <dd className="mt-1 text-ink">
                  {[latest.browser, latest.os].filter(Boolean).join(' · ') ||
                    'Unknown'}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                  Device-provided coordinates (optional)
                </dt>
                <dd className="mt-1 text-ink">
                  {formatDeviceLocation(latest)}
                </dd>
              </div>
            </dl>
          )}
        </section>

        <section className="mb-10 border border-[color:var(--rule)] bg-panel p-5">
          <h2 className="font-display text-lg font-medium text-ink">
            Share this device&apos;s location
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Optional. Before the browser asks for permission, know what is
            stored: latitude, longitude, accuracy in meters, and the capture
            time — attached only to this successful login. Permission is
            requested only when you click the button. Denial, timeout, and
            unsupported browsers are handled without silent retries.
          </p>
          {!showGeoExplain ? (
            <button
              type="button"
              onClick={() => setShowGeoExplain(true)}
              className="mt-4 bg-signal px-4 py-2.5 text-sm font-medium text-white hover:bg-signal-soft"
            >
              Share this device&apos;s location
            </button>
          ) : (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-ink">
                Ready to request browser geolocation for the current login
                event?
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={geoBusy || !activeLogin}
                  onClick={shareDeviceLocation}
                  className="bg-signal px-4 py-2.5 text-sm font-medium text-white hover:bg-signal-soft disabled:opacity-60"
                >
                  {geoBusy ? 'Waiting for permission…' : 'Request permission'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowGeoExplain(false)}
                  className="border border-[color:var(--rule-strong)] px-4 py-2.5 text-sm text-ink"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {geoMessage ? (
            <p className="mt-3 text-sm text-ink-soft" role="status">
              {geoMessage}
            </p>
          ) : null}
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-medium text-ink">
                Login history
              </h2>
              <p className="mt-1 text-xs text-ink-muted">
                Automatically deleted after 30 days.
              </p>
            </div>
            <button
              type="button"
              onClick={onDeleteHistory}
              disabled={pending || items.length === 0}
              className="border border-stamp/40 px-3 py-2 text-sm text-stamp hover:bg-stamp/5 disabled:opacity-50"
            >
              Delete history
            </button>
          </div>

          {items.length === 0 ? (
            <p className="border border-dashed border-[color:var(--rule-strong)] px-4 py-8 text-center text-sm text-ink-soft">
              Empty — no successful logins in the retention window.
            </p>
          ) : (
            <div className="overflow-x-auto border border-[color:var(--rule)]">
              <table className="min-w-full divide-y divide-[color:var(--rule)] text-left text-sm">
                <thead className="bg-panel">
                  <tr className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-muted">
                    <th className="px-3 py-3">Manila time</th>
                    <th className="px-3 py-3">IP</th>
                    <th className="px-3 py-3">Approx. IP location</th>
                    <th className="px-3 py-3">Browser / OS</th>
                    <th className="px-3 py-3">Device coords</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--rule)] bg-paper">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap px-3 py-3 text-ink">
                        {formatManilaShort(new Date(item.createdAt))}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-ink">
                        {item.clientIp}
                      </td>
                      <td className="px-3 py-3 text-ink-soft">
                        <span className="block text-ink">
                          {formatIpLocation(item)}
                        </span>
                        <span className="text-xs text-ink-muted">
                          {item.ipLocationSource}
                          {item.ipLocationUnavailable ? ' · unavailable' : ''}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-ink-soft">
                        {[item.browser, item.os].filter(Boolean).join(' · ') ||
                          '—'}
                      </td>
                      <td className="px-3 py-3 text-ink-soft">
                        {formatDeviceLocation(item)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
