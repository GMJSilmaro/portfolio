'use client'

import React, { useEffect, useState } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import { useReducedMotion } from 'framer-motion'

/** High-contrast dossier greens — readable motion on dark ink */
const COVER_MESH_COLORS = [
  '#061410',
  '#0d6e56',
  '#22c59a',
  '#17856a',
  '#0a1f1a',
  '#3d9b7a',
]

/**
 * Optional WebGL boost on top of the CSS aurora.
 * Skips when reduced-motion is on, or WebGL is unavailable.
 */
export function CoverMeshBackground() {
  const reduceMotion = useReducedMotion()
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

  if (reduceMotion || !canWebGl) return null

  return (
    <div className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen" aria-hidden>
      <MeshGradient
        colors={COVER_MESH_COLORS}
        speed={0.85}
        distortion={0.85}
        swirl={0.45}
        grainMixer={0.2}
        grainOverlay={0.1}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  )
}
