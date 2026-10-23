'use client'

import React, { useEffect } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from 'framer-motion'
import { chapterVariants, dossierEase } from '@/lib/motion'
import { IdentityRail } from './IdentityRail'
import { MODE_META, type StudioMode, useStudio } from './StudioContext'
import { CareerView } from './views/CareerView'
import { ProfileView } from './views/ProfileView'
import { StackView } from './views/StackView'
import { WorkView } from './views/WorkView'

const CHAPTERS = Object.keys(MODE_META) as StudioMode[]

function Stage() {
  const { mode } = useStudio()
  const reduceMotion = useReducedMotion()

  let view: React.ReactNode
  switch (mode) {
    case 'profile':
      view = <ProfileView />
      break
    case 'career':
      view = <CareerView />
      break
    case 'work':
      view = <WorkView />
      break
    case 'stack':
      view = <StackView />
      break
    default: {
      const _exhaustive: never = mode
      view = _exhaustive
    }
  }

  if (reduceMotion) {
    return <div key={mode}>{view}</div>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={mode}
        variants={chapterVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {view}
      </motion.div>
    </AnimatePresence>
  )
}

function StudioFooter() {
  return (
    <footer className="border-t border-[color:var(--rule)] bg-white">
      <div className="dossier-pad flex flex-col gap-4 !py-6 sm:flex-row sm:items-center sm:justify-between lg:!py-7">
        <div className="min-w-0">
          <p className="font-display text-lg font-medium text-ink">
            GMJ<span className="text-signal">.</span> Living Dossier
          </p>
          <p className="mt-1 text-sm text-ink-muted">Technical Lead Consultant · Available for consulting</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:gmjsilmaro03@gmail.com"
            className="inline-flex min-h-11 items-center bg-ink px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-paper"
          >
            Email
          </a>
          <a
            href="https://github.com/GMJSilmaro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center border border-[color:var(--rule)] px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink"
          >
            GitHub
          </a>
          <a
            href="./gmj-silmaro-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center border border-[color:var(--rule)] px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink"
          >
            Resume
          </a>
        </div>
      </div>
      <div className="border-t border-[color:var(--rule)] px-8 py-3 lg:px-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          © {new Date().getFullYear()} Gilbert Michael Jay Silmaro · All rights reserved
        </p>
      </div>
    </footer>
  )
}

function ChapterNav() {
  const { mode, setMode } = useStudio()

  return (
    <div
      id="chapter-nav"
      className="sticky top-0 z-40 border-b border-[color:var(--rule)] bg-white/95 backdrop-blur-md lg:hidden"
    >
      <div className="flex items-center justify-between gap-3 px-8 py-2">
        <a href="#cover" className="inline-flex min-h-11 items-center font-display text-lg font-medium text-ink">
          GMJ<span className="text-signal">.</span>
        </a>
        <a
          href="./gmj-silmaro-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted"
        >
          Resume
        </a>
      </div>
      <nav aria-label="CV chapters" className="grid grid-cols-4 border-t border-[color:var(--rule)]">
        {CHAPTERS.map((key) => {
          const item = MODE_META[key]
          const active = mode === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              aria-current={active ? 'page' : undefined}
              className={`flex min-h-11 min-w-0 flex-col items-center justify-center px-1 py-1.5 transition-colors ${
                active ? 'bg-ink text-paper' : 'bg-transparent text-ink-muted'
              }`}
            >
              <span className="font-mono text-[9px] tracking-[0.14em]">{item.code}</span>
              <span className="truncate font-display text-[11px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export function StudioShell() {
  const { enterPulse } = useStudio()
  const reduceMotion = useReducedMotion()
  const enterControls = useAnimationControls()

  useEffect(() => {
    if (reduceMotion || enterPulse === 0) return
    void enterControls.start({
      opacity: [0.62, 1],
      y: [10, 0],
      transition: { duration: 0.55, ease: dossierEase },
    })
  }, [enterPulse, reduceMotion, enterControls])

  return (
    <section id="studio" className="bg-white">
      <ChapterNav />

      <div className="lg:grid lg:grid-cols-[var(--dossier-rail)_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <IdentityRail />
        </div>

        <motion.div
          id="studio-stage"
          className="min-w-0"
          initial={false}
          animate={enterControls}
        >
          <Stage />
        </motion.div>
      </div>

      <StudioFooter />
    </section>
  )
}
