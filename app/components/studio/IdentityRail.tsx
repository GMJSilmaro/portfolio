'use client'

import React from 'react'
import { Download, Github, Mail } from 'lucide-react'
import { useOverflowYWhenNeeded } from '@/lib/use-overflow-y'
import { MODE_META, type StudioMode, useStudio } from './StudioContext'

const CHAPTERS = Object.keys(MODE_META) as StudioMode[]

export function IdentityRail() {
  const { mode, setMode } = useStudio()
  const { ref, overflowY } = useOverflowYWhenNeeded<HTMLElement>()

  return (
    <aside
      ref={ref}
      aria-label="Identity"
      className="sticky top-0 flex max-h-[100svh] flex-col border-r border-[color:var(--rule)] bg-[#f4f6f8] px-4 py-6 overscroll-contain"
      style={{ overflowY }}
    >
      <a href="#cover" className="block w-fit font-display text-[1.65rem] font-medium leading-none text-ink">
        GMJ<span className="text-signal">.</span>
      </a>
      <p className="mt-3 font-display text-base font-medium leading-snug text-ink">
        Gilbert Michael Jay Silmaro
      </p>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
        Technical Lead
      </p>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
        5+ years · 12+ enterprise clients · Pixelcare Consulting
      </p>

      <nav className="mt-8" aria-label="CV chapters">
        <ul className="space-y-1">
          {CHAPTERS.map((key) => {
            const item = MODE_META[key]
            const active = mode === key
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => setMode(key)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-11 w-full items-center gap-3 px-2.5 text-left transition-colors duration-200 ${
                    active
                      ? 'bg-white text-ink shadow-[inset_3px_0_0_0_var(--signal)]'
                      : 'text-ink-muted hover:bg-white/80 hover:text-ink'
                  }`}
                >
                  <span className="w-7 shrink-0 font-mono text-[11px] tracking-[0.14em] text-signal">
                    {item.code}
                  </span>
                  <span className="font-display text-[0.98rem] font-medium tracking-tight">
                    {item.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mt-8 space-y-1 border-t border-[color:var(--rule)] pt-4">
        <a
          href="mailto:gmjsilmaro03@gmail.com"
          className="flex min-h-11 items-center gap-2 text-sm text-ink-soft transition-colors hover:text-signal"
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden />
          <span className="min-w-0 break-words text-[13px] leading-snug">gmjsilmaro03@gmail.com</span>
        </a>
        <a
          href="https://github.com/GMJSilmaro"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center gap-2 text-sm text-ink-soft transition-colors hover:text-signal"
        >
          <Github className="h-4 w-4 shrink-0" aria-hidden />
          GitHub
        </a>
        <a
          href="./gmj-silmaro-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center gap-2 text-sm text-ink-soft transition-colors hover:text-signal"
        >
          <Download className="h-4 w-4 shrink-0" aria-hidden />
          Download resume
        </a>
      </div>
    </aside>
  )
}
