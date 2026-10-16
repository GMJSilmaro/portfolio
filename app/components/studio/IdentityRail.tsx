'use client'

import React from 'react'
import Image from 'next/image'
import { Download, Github, Mail } from 'lucide-react'
import { useOverflowYWhenNeeded } from '../../../lib/use-overflow-y'
import { MODE_META, type StudioMode, useStudio } from './StudioContext'

export function IdentityRail() {
  const { mode, setMode } = useStudio()
  const { ref, overflowY } = useOverflowYWhenNeeded<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="sticky top-0 flex max-h-[100svh] flex-col overscroll-contain"
      style={{ overflowY }}
    >
      <aside className="flex min-h-0 flex-1 flex-col border-r border-[color:var(--rule)] bg-[#f4f6f8]">
        <div className="relative aspect-[4/5] max-h-44 w-full shrink-0 overflow-hidden bg-ink xl:max-h-48">
          <Image
            src="./images/Profile.jpg"
            alt="Gilbert Michael Jay Silmaro"
            fill
            className="object-cover object-[50%_12%]"
            sizes="320px"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/55 to-transparent p-3.5 pt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-signal-soft">
              Technical Lead
            </p>
            <p className="mt-1 font-display text-xl font-medium leading-none text-paper">
              GMJ<span className="text-signal">.</span>
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-3.5 py-4">
          <p className="font-display text-base font-medium leading-snug text-ink xl:text-lg">
            Gilbert Michael Jay Silmaro
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted xl:text-sm">
            5+ years · 12+ enterprise clients · Pixelcare Consulting
          </p>

          <nav className="mt-4 space-y-0.5" aria-label="CV chapters">
            {(Object.keys(MODE_META) as StudioMode[]).map((key) => {
              const item = MODE_META[key]
              const active = mode === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={`group flex w-full items-baseline justify-between gap-2 border-l-2 px-2.5 py-1.5 text-left transition-all duration-200 ${
                    active
                      ? 'border-signal bg-white text-ink'
                      : 'border-transparent text-ink-muted hover:border-ink/20 hover:bg-white/60 hover:text-ink'
                  }`}
                >
                  <span className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-signal">
                      {item.code}
                    </span>
                    <span className="font-display text-[0.95rem] font-medium tracking-tight xl:text-base">
                      {item.label}
                    </span>
                  </span>
                  <span
                    className={`hidden font-mono text-[9px] uppercase tracking-[0.12em] transition-opacity xl:inline ${
                      active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  >
                    {item.hint}
                  </span>
                </button>
              )
            })}
          </nav>

          <div className="mt-auto space-y-2 border-t border-[color:var(--rule)] pt-3">
            <a
              href="mailto:gmjsilmaro03@gmail.com"
              className="flex items-center gap-2 text-xs text-ink-soft transition-colors hover:text-signal xl:text-sm"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">gmjsilmaro03@gmail.com</span>
            </a>
            <a
              href="https://github.com/GMJSilmaro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-ink-soft transition-colors hover:text-signal xl:text-sm"
            >
              <Github className="h-3.5 w-3.5 shrink-0" />
              GitHub
            </a>
            <a
              href="./gmj-silmaro-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 bg-ink font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-signal"
            >
              <Download className="h-3.5 w-3.5" />
              Download resume
            </a>
          </div>
        </div>
      </aside>
    </div>
  )
}
