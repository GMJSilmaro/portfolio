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
      className="relative grid min-h-[70svh] bg-ink text-paper lg:min-h-[min(78svh,760px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]"
    >
      {/* Portrait plane — own column on desktop so the face is framed, not strip-cropped */}
      <div className="relative order-1 min-h-[38vh] overflow-hidden sm:min-h-[42vh] lg:order-2 lg:min-h-0 lg:h-full">
        <Image
          src="./images/Profile.jpg"
          alt="Gilbert Michael Jay Silmaro"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-[50%_20%] sm:object-[52%_18%] lg:object-[48%_16%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/10 lg:bg-gradient-to-r lg:from-ink lg:via-ink/35 lg:to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay bg-dossier-grain" />
      </div>

      {/* Intro copy */}
      <div className="relative order-2 z-10 flex flex-col justify-end px-5 pb-8 pt-8 sm:px-8 sm:pb-10 lg:order-1 lg:px-10 lg:pb-12 lg:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-ink lg:bg-gradient-to-r lg:from-ink lg:via-ink/95 lg:to-transparent" />
        <div className="relative flex max-w-xl flex-col gap-4 sm:gap-5">
          <div
            className="animate-fade-up flex flex-wrap items-center gap-3"
            style={{ animationDelay: '80ms' }}
          >
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
              className="animate-fade-up font-display text-[clamp(3rem,10vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.04em] text-paper"
              style={{ animationDelay: '140ms' }}
            >
              GMJ
              <span className="text-signal">.</span>
            </h1>
            <p
              className="animate-fade-up mt-3 font-display text-lg leading-snug text-paper/90 sm:text-xl"
              style={{ animationDelay: '200ms' }}
            >
              Gilbert Michael Jay Silmaro
            </p>
            <p
              className="animate-fade-up mt-2.5 max-w-md text-sm leading-relaxed text-paper/60"
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
        className="pointer-events-none absolute bottom-6 right-5 z-20 hidden font-mono text-[10px] uppercase tracking-[0.35em] text-paper/35 md:block lg:bottom-auto lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:rotate-90 lg:origin-center"
        aria-hidden
      >
        Living dossier — interactive curriculum vitae
      </div>
    </section>
  )
}
