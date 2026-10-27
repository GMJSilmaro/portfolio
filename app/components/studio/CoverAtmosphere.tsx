'use client'

import React from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Always-on CSS aurora for Cover — works on mobile Safari / low-end devices
 * even when WebGL mesh cannot run. This is the visible motion guarantee.
 */
export function CoverAtmosphere() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-cover-atmosphere" />

      {!reduceMotion ? (
        <div className="cover-aurora">
          <span className="cover-aurora__blob cover-aurora__blob--a" />
          <span className="cover-aurora__blob cover-aurora__blob--b" />
          <span className="cover-aurora__blob cover-aurora__blob--c" />
          <span className="cover-aurora__sheen" />
        </div>
      ) : null}
    </div>
  )
}
