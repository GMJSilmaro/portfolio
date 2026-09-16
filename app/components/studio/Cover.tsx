'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useStudio } from './StudioContext'

export function Cover() {
  const { enter } = useStudio()

  return (
    <section
      id="cover"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper"
    >
      <div className="absolute inset-0">
        <Image
          src="./images/Profile.jpg"
          alt="Gilbert Michael Jay Silmaro"
          fill
          priority
          className="object-cover object-[50%_18%] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay bg-dossier-grain" />
      </div>

      <div className="relative z-10 w-full px-6 pb-10 pt-28 sm:px-10 sm:pb-14 lg:px-16 lg:pb-16">
        <div className="flex max-w-4xl flex-col gap-8">
          <div className="animate-fade-up flex items-center gap-4" style={{ animationDelay: '80ms' }}>
            <span className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_rgba(23,133,106,0.8)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/80">
                Open for consulting
              </span>
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-paper/40 sm:inline">
              Ref · GMJ-2026
            </span>
          </div>

          <div>
            <h1
              className="animate-fade-up font-display text-[clamp(4.5rem,18vw,9rem)] font-semibold leading-[0.82] tracking-[-0.04em] text-paper"
              style={{ animationDelay: '140ms' }}
            >
              GMJ
              <span className="text-signal">.</span>
            </h1>
            <p
              className="animate-fade-up mt-5 max-w-xl font-display text-2xl leading-tight text-paper/90 sm:text-3xl"
              style={{ animationDelay: '200ms' }}
            >
              Gilbert Michael Jay Silmaro
            </p>
            <p
              className="animate-fade-up mt-4 max-w-lg text-base leading-relaxed text-paper/55 sm:text-lg"
              style={{ animationDelay: '260ms' }}
            >
              Technical Lead Consultant. Enterprise software, SAP B1, e-Invoice platforms,
              and systems teams actually run.
            </p>
          </div>

          <div
            className="animate-fade-up flex flex-wrap items-center gap-4"
            style={{ animationDelay: '320ms' }}
          >
            <button
              type="button"
              onClick={enter}
              className="group inline-flex min-h-[52px] items-center gap-3 bg-paper px-7 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-signal hover:text-paper"
            >
              Enter CV
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="./Gilbert-Michael-Jay-Silmaro-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center border border-white/25 px-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-paper/80 transition-colors hover:border-paper hover:text-paper"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 origin-center sm:block lg:right-10"
        aria-hidden
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper/30">
          Living dossier — interactive curriculum vitae
        </p>
      </div>
    </section>
  )
}
