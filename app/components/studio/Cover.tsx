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
      className="relative flex min-h-[68svh] items-end bg-ink text-paper sm:min-h-[64svh] lg:min-h-[min(70svh,720px)]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="./images/Profile.jpg"
          alt="Gilbert Michael Jay Silmaro"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_14%] sm:object-[74%_12%] lg:object-[78%_10%]"
        />
        {/* Keep copy readable while leaving the portrait visible on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/25 sm:to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/25" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay bg-dossier-grain" />
      </div>

      <div className="relative z-10 w-full px-5 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-16 lg:px-10 lg:pb-12">
        <div className="flex max-w-xl flex-col gap-4 sm:max-w-2xl sm:gap-5 lg:max-w-3xl">
          <div className="animate-fade-up flex flex-wrap items-center gap-3" style={{ animationDelay: '80ms' }}>
            <span className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_rgba(23,133,106,0.8)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/80">
                Open for consulting
              </span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/40">
              Ref · GMJ-2026
            </span>
          </div>

          <div>
            <h1
              className="animate-fade-up font-display text-[clamp(3rem,11vw,5.75rem)] font-medium leading-[0.9] tracking-[-0.04em] text-paper"
              style={{ animationDelay: '140ms' }}
            >
              GMJ
              <span className="text-signal">.</span>
            </h1>
            <p
              className="animate-fade-up mt-3 max-w-xl font-display text-lg leading-snug text-paper/90 sm:text-xl"
              style={{ animationDelay: '200ms' }}
            >
              Gilbert Michael Jay Silmaro
            </p>
            <p
              className="animate-fade-up mt-2.5 max-w-md text-sm leading-relaxed text-paper/60 sm:max-w-lg sm:text-[0.95rem]"
              style={{ animationDelay: '260ms' }}
            >
              Technical Lead Consultant. Enterprise software, SAP B1, e-Invoice platforms,
              and systems teams actually run.
            </p>
          </div>

          <div
            className="animate-fade-up flex flex-wrap items-center gap-3"
            style={{ animationDelay: '320ms' }}
          >
            <button
              type="button"
              onClick={enter}
              className="group inline-flex min-h-[44px] items-center gap-3 bg-paper px-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-signal hover:text-paper"
            >
              Enter CV
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="./gmj-silmaro-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center border border-white/25 px-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-paper/80 transition-colors hover:border-paper hover:text-paper"
            >
              Download resume
            </a>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 origin-center md:block lg:right-10"
        aria-hidden
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper/30">
          Living dossier — interactive curriculum vitae
        </p>
      </div>
    </section>
  )
}
