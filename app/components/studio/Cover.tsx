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
      aria-labelledby="cover-heading"
      className="grid bg-ink text-paper lg:min-h-[34rem] lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)]"
    >
      <div className="relative flex flex-col justify-between gap-8 px-8 py-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-dossier-grain" aria-hidden />

        <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex min-h-11 items-center gap-2 border border-white/20 bg-white/5 px-3">
            <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_rgba(23,133,106,0.8)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/85">
              Open for consulting
            </span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">
            Ref · GMJ-2026
          </span>
        </div>

        <div className="relative max-w-xl">
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
        </div>

        <p className="relative font-mono text-[10px] uppercase tracking-[0.28em] text-paper/40">
          Living dossier — interactive curriculum vitae
        </p>
      </div>

      <div className="relative min-h-[18rem] sm:min-h-[22rem] lg:min-h-0">
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
      </div>
    </section>
  )
}
