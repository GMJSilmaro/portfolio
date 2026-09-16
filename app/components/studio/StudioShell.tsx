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
    <section id="studio" className="min-h-[100svh] bg-paper">
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

      <div className="lg:grid lg:h-[100svh] lg:grid-cols-[20rem_1fr]">
        <div className="hidden h-full overflow-y-auto lg:block">
          <IdentityRail />
        </div>

        <div
          id="studio-stage"
          className="min-h-[100svh] overflow-y-auto lg:h-[100svh]"
          key={mode}
        >
          <div className="animate-fade-up">
            <Stage />
          </div>
        </div>
      </div>

      {/* Mobile identity strip */}
      <div className="border-t border-[color:var(--rule)] bg-[#f4f6f8] px-5 py-8 lg:hidden">
        <p className="font-display text-2xl font-medium text-ink">
          Gilbert Michael Jay Silmaro
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          Technical Lead Consultant · Available for consulting
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="mailto:gmjsilmaro03@gmail.com"
            className="inline-flex min-h-[44px] items-center bg-ink px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-paper"
          >
            Email
          </a>
          <a
            href="https://github.com/GMJSilmaro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center border border-[color:var(--rule)] px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink"
          >
            GitHub
          </a>
        </div>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          © {new Date().getFullYear()} GMJ · Living Dossier
        </p>
      </div>
    </section>
  )
}
