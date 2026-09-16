'use client'

import React from 'react'
import Image from 'next/image'
import { Download, Github, Mail } from 'lucide-react'
import { MODE_META, type StudioMode, useStudio } from './StudioContext'

export function IdentityRail() {
  const { mode, setMode } = useStudio()

  return (
    <aside className="flex h-full flex-col border-r border-[color:var(--rule)] bg-[#f4f6f8]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
        <Image
          src="./images/Profile.jpg"
          alt="Gilbert Michael Jay Silmaro"
          fill
          className="object-cover object-[50%_18%]"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/50 to-transparent p-5 pt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-signal-soft">
            Technical Lead
          </p>
          <p className="mt-1 font-display text-2xl font-medium leading-none text-paper">
            GMJ<span className="text-signal">.</span>
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 py-6">
        <p className="font-display text-xl font-medium leading-snug text-ink">
          Gilbert Michael Jay Silmaro
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          5+ years · 12+ enterprise clients · Pixelcare Consulting
        </p>

        <nav className="mt-8 space-y-1" aria-label="CV chapters">
          {(Object.keys(MODE_META) as StudioMode[]).map((key) => {
            const item = MODE_META[key]
            const active = mode === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={`group flex w-full items-baseline justify-between gap-3 border-l-2 px-3 py-2.5 text-left transition-all duration-200 ${
                  active
                    ? 'border-signal bg-white text-ink'
                    : 'border-transparent text-ink-muted hover:border-ink/20 hover:bg-white/60 hover:text-ink'
                }`}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-signal">
                    {item.code}
                  </span>
                  <span className="font-display text-lg font-medium tracking-tight">
                    {item.label}
                  </span>
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.14em] transition-opacity ${
                    active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                  }`}
                >
                  {item.hint}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto space-y-3 border-t border-[color:var(--rule)] pt-5">
          <a
            href="mailto:gmjsilmaro03@gmail.com"
            className="flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-signal"
          >
            <Mail className="h-3.5 w-3.5" />
            gmjsilmaro03@gmail.com
          </a>
          <a
            href="https://github.com/GMJSilmaro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-signal"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href="./gmj-silmaro-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-ink font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-signal"
          >
            <Download className="h-3.5 w-3.5" />
            Download resume
          </a>
        </div>
      </div>
    </aside>
  )
}
