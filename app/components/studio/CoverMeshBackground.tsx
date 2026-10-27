'use client'

import React, { useEffect, useState } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'

/** High-contrast dossier greens — readable motion on dark ink */
const COVER_MESH_COLORS = [
  '#061410',
  '#0d6e56',
  '#22c59a',
  '#17856a',
  '#0a1f1a',
  '#5eeab0',
]

/**
 * Optional WebGL boost on top of the CSS aurora.
 * Skips only when WebGL is unavailable — CSS aurora remains the visible baseline.
 */
export function CoverMeshBackground() {
  const [canWebGl, setCanWebGl] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      setCanWebGl(Boolean(gl))
    } catch {
      setCanWebGl(false)
    }
  }, [])

  if (!canWebGl) return null

  return (
    <div className="pointer-events-none absolute inset-0 opacity-75 mix-blend-screen" aria-hidden>
      <MeshGradient
        colors={COVER_MESH_COLORS}
        speed={1.1}
        distortion={0.9}
        swirl={0.5}
        grainMixer={0.25}
        grainOverlay={0.12}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  )
}
