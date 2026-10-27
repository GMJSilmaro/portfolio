'use client'

import React from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  coverContainerVariants,
  coverImageVariants,
  coverItemVariants,
} from '@/lib/motion'
import { CoverAtmosphere } from './CoverAtmosphere'
import { CoverMeshBackground } from './CoverMeshBackground'
import { useStudio } from './StudioContext'

export function Cover() {
  const { enter } = useStudio()
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="cover"
      aria-labelledby="cover-heading"
      className="relative grid overflow-hidden bg-ink text-paper lg:min-h-[34rem] lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)]"
    >
      {/* Full-bleed motion layer — desktop + mobile */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <CoverAtmosphere />
        <CoverMeshBackground />
        <div className="absolute inset-0 opacity-[0.05] bg-dossier-grain" />
        {/* Keep portrait readable on large screens */}
        <div
          className="absolute inset-y-0 right-0 hidden w-[42%] bg-gradient-to-l from-ink/55 via-ink/20 to-transparent lg:block"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-8 px-8 py-8 sm:py-10 lg:px-12 lg:py-12">
        <motion.div
          className="relative flex flex-col justify-between gap-8"
          variants={coverContainerVariants}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
        >
          <motion.div
            variants={coverItemVariants}
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="inline-flex min-h-11 items-center gap-2 border border-white/20 bg-white/5 px-3 backdrop-blur-[2px]">
              <span className="cover-status-dot" aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/85">
                Open for consulting
              </span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">
              Ref · GMJ-2026
            </span>
          </motion.div>

          <motion.div variants={coverItemVariants} className="max-w-xl">
            <h1
              id="cover-heading"
              className="font-display text-[clamp(3.25rem,7vw,5.75rem)] font-medium leading-[0.9] tracking-[-0.045em] text-paper"
            >
              GMJ
              <span className="text-signal">.</span>
            </h1>
            <p className="mt-4 font-display text-lg leading-snug text-paper/90 sm:text-xl">
              Gilbert Michael Jay Silmaro
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/65 sm:text-[0.95rem]">
              Technical Lead Consultant. Enterprise software, SAP B1, e-Invoice platforms, and
              systems teams actually run.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={enter}
                className="group inline-flex min-h-11 items-center gap-3 bg-paper px-5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-signal hover:text-paper"
              >
                Enter CV
                <ArrowRight className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
              </button>
              <a
                href="./gmj-silmaro-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center border border-white/25 px-5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-paper/85 transition-colors hover:border-paper hover:text-paper"
              >
                Download resume
              </a>
            </div>
          </motion.div>

          <motion.p
            variants={coverItemVariants}
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/40"
          >
            Living dossier — interactive curriculum vitae
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 min-h-[18rem] sm:min-h-[22rem] lg:min-h-0"
        variants={coverImageVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
      >
        <div className="absolute inset-0">
          <Image
            src="./images/Profile.jpg"
            alt="Gilbert Michael Jay Silmaro"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-[42%_18%] sm:object-[40%_16%] lg:object-[38%_14%]"
          />
        </div>
        {/* Soft aurora bleed over portrait edge on mobile stack */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink/70 to-transparent lg:hidden"
          aria-hidden
        />
      </motion.div>
    </section>
  )
}
