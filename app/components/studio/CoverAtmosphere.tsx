'use client'

import React from 'react'
import { MotionConfig, motion } from 'framer-motion'

/**
 * Full-bleed Cover aurora driven by Framer Motion.
 * MotionConfig reducedMotion="never" keeps the hero atmosphere alive even when
 * the OS asks for reduced motion — this is the visible guarantee on phones.
 */
export function CoverAtmosphere() {
  return (
    <MotionConfig reducedMotion="never">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-cover-atmosphere" />

        <motion.span
          className="absolute -left-[15%] -top-[10%] block rounded-full"
          style={{
            width: 'min(36rem, 95vw)',
            height: 'min(36rem, 95vw)',
            background: 'rgba(34, 197, 154, 0.7)',
            filter: 'blur(52px)',
            mixBlendMode: 'screen',
          }}
          animate={{
            x: [0, 140, 40, 0],
            y: [0, 90, 150, 0],
            scale: [1, 1.35, 1.15, 1],
            opacity: [0.75, 1, 0.85, 0.75],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.span
          className="absolute -bottom-[12%] -right-[18%] block rounded-full"
          style={{
            width: 'min(32rem, 88vw)',
            height: 'min(32rem, 88vw)',
            background: 'rgba(13, 110, 86, 0.8)',
            filter: 'blur(52px)',
            mixBlendMode: 'screen',
          }}
          animate={{
            x: [0, -160, -60, 0],
            y: [0, -110, -40, 0],
            scale: [1.05, 1.4, 1.2, 1.05],
            opacity: [0.7, 1, 0.8, 0.7],
          }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.span
          className="absolute left-[22%] top-[34%] block rounded-full"
          style={{
            width: 'min(24rem, 70vw)',
            height: 'min(24rem, 70vw)',
            background: 'rgba(94, 234, 180, 0.55)',
            filter: 'blur(48px)',
            mixBlendMode: 'screen',
          }}
          animate={{
            x: [-40, 110, -20, -40],
            y: [30, -100, 50, 30],
            scale: [0.9, 1.4, 1.1, 0.9],
            opacity: [0.65, 1, 0.75, 0.65],
          }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute inset-y-[-20%] w-[45%] bg-gradient-to-r from-transparent via-[rgba(125,240,200,0.35)] to-transparent"
          animate={{ x: ['-40%', '120%'] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </MotionConfig>
  )
}
