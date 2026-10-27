'use client'

import React from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import { useReducedMotion } from 'framer-motion'

/** Dossier ink / signal palette — calm AI mesh, not purple marketing glow */
const COVER_MESH_COLORS = [
  '#0a1210',
  '#14181f',
  '#0d6e56',
  '#17856a',
  '#1e3a32',
]

/**
 * Animated WebGL mesh behind the Cover ink panel (Paper Shaders).
 * Falls back to CSS atmosphere when reduced motion is preferred.
 */
export function CoverMeshBackground() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.55]" aria-hidden>
      <MeshGradient
        colors={COVER_MESH_COLORS}
        speed={0.18}
        distortion={0.55}
        swirl={0.22}
        grainMixer={0.12}
        grainOverlay={0.08}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
