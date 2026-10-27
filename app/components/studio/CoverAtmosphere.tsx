'use client'

import React from 'react'

/**
 * Full-bleed CSS aurora for Cover — always rendered so motion stays visible
 * on desktop and mobile (including when OS “reduce motion” is on: then a
 * gentler CSS path still runs via globals.css).
 */
export function CoverAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-cover-atmosphere" />
      <div className="cover-aurora">
        <span className="cover-aurora__blob cover-aurora__blob--a" />
        <span className="cover-aurora__blob cover-aurora__blob--b" />
        <span className="cover-aurora__blob cover-aurora__blob--c" />
        <span className="cover-aurora__sheen" />
      </div>
    </div>
  )
}
