'use client'

import React, { useEffect } from 'react'
import { IdentityRail } from './IdentityRail'
import { MODE_META, type StudioMode, useStudio } from './StudioContext'
import { CareerView } from './views/CareerView'
import { ProfileView } from './views/ProfileView'
import { StackView } from './views/StackView'
import { WorkView } from './views/WorkView'

function Stage() {
  const { mode } = useStudio()

  switch (mode) {
    case 'profile':
      return <ProfileView />
    case 'career':
      return <CareerView />
    case 'work':
      return <WorkView />
    case 'stack':
      return <StackView />
    default: {
      const _exhaustive: never = mode
      return _exhaustive
    }
  }
}

function StudioFooter() {
  return (
    <footer className="border-t border-[color:var(--rule)] bg-[#f4f6f8]">
      <div className="flex flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <div>
          <p className="font-display text-lg font-medium text-ink">
            GMJ<span className="text-signal">.</span> Living Dossier
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Technical Lead Consultant · Available for consulting
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:gmjsilmaro03@gmail.com"
            className="inline-flex min-h-[40px] items-center bg-ink px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-paper"
          >
            Email
          </a>
          <a
            href="https://github.com/GMJSilmaro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center border border-[color:var(--rule)] px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink"
          >
            GitHub
          </a>
          <a
            href="./gmj-silmaro-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center border border-[color:var(--rule)] px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink"
          >
            Resume
          </a>
        </div>
      </div>
      <div className="border-t border-[color:var(--rule)] px-5 py-4 sm:px-8 lg:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          © {new Date().getFullYear()} Gilbert Michael Jay Silmaro · All rights reserved
        </p>
      </div>
    </footer>
  )
}

export function StudioShell() {
  const { mode, setMode, entered } = useStudio()

  useEffect(() => {
    if (!entered) return
    const onKey = (e: KeyboardEvent) => {
      const order: StudioMode[] = ['profile', 'career', 'work', 'stack']
      const index = order.indexOf(mode)
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setMode(order[(index + 1) % order.length])
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setMode(order[(index - 1 + order.length) % order.length])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [entered, mode, setMode])

  return (
    <section id="studio" className="min-h-[100svh] scroll-mt-0 bg-paper">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 border-b border-[color:var(--rule)] bg-paper/95 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <a href="#cover" className="font-display text-lg font-medium text-ink">
            GMJ<span className="text-signal">.</span>
          </a>
          <a
            href="./gmj-silmaro-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted"
          >
            Resume
          </a>
        </div>
        <div className="flex overflow-x-auto border-t border-[color:var(--rule)]">
          {(Object.keys(MODE_META) as StudioMode[]).map((key) => {
            const active = mode === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={`min-w-[5.5rem] flex-1 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? 'bg-ink text-paper'
                    : 'bg-transparent text-ink-muted'
                }`}
              >
                {MODE_META[key].label}
              </button>
            )
          })}
        </div>
      </div>

      {/*
        One document scroll only. Sticky rail must NOT use overflow-y:auto —
        that traps the mouse wheel when the cursor is over the left column.
      */}
      <div className="lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[19rem_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <div className="sticky top-0 self-start">
            <IdentityRail />
          </div>
        </div>

        <div id="studio-stage" className="min-w-0" key={mode}>
          <div className="animate-fade-up">
            <Stage />
          </div>
        </div>
      </div>

      <StudioFooter />
    </section>
  )
}
