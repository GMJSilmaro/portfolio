import React from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowRight, Download } from 'lucide-react'

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-dossier-wash" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-chapter-grid" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-dossier-grain" aria-hidden />

      {/* Full-bleed portrait plane */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[54%]">
        <div className="relative h-full min-h-[100svh] w-full">
          <Image
            src="./images/Profile.jpg"
            alt="Gilbert Michael Jay Silmaro"
            fill
            className="object-cover object-[50%_18%] opacity-90 md:opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 to-paper/20 md:via-paper/55 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-paper/40 md:to-transparent" />
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:pl-28 lg:justify-center">
        <div className="max-w-xl">
          <div
            className="animate-fade-up mb-6 inline-flex items-center gap-3 border border-[color:var(--rule)] bg-white/55 px-3 py-1.5 backdrop-blur-sm"
            style={{ animationDelay: '40ms' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
              Available for consulting
            </span>
          </div>

          <p
            className="animate-fade-up font-mono text-[11px] uppercase tracking-[0.32em] text-signal"
            style={{ animationDelay: '90ms' }}
          >
            Living dossier · GMJ-2026
          </p>

          <h1
            className="animate-fade-up mt-3 font-display text-[clamp(3.4rem,12vw,6.5rem)] font-semibold leading-[0.9] tracking-tight text-ink"
            style={{ animationDelay: '140ms' }}
          >
            GMJ
            <span className="text-signal">.</span>
          </h1>

          <p
            className="animate-fade-up mt-4 max-w-md font-display text-xl leading-snug text-ink-soft sm:text-2xl"
            style={{ animationDelay: '200ms' }}
          >
            Gilbert Michael Jay Silmaro
          </p>

          <p
            className="animate-fade-up mt-4 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg"
            style={{ animationDelay: '260ms' }}
          >
            Technical Lead Consultant who ships enterprise software — SAP B1 integrations,
            e-Invoice platforms, and production-ready web &amp; mobile systems.
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: '320ms' }}
          >
            <a
              href="#projects"
              className="group inline-flex min-h-[48px] items-center gap-2 bg-ink px-6 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-signal"
            >
              Open cases
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="./Gilbert-Michael-Jay-Silmaro-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[48px] items-center gap-2 border border-ink/20 bg-white/60 px-5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-signal"
            >
              <Download className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              CV PDF
            </a>
          </div>
        </div>

        <div
          className="animate-dossier-stamp pointer-events-none absolute right-8 top-28 hidden border-2 border-stamp/70 px-4 py-3 text-stamp md:block lg:right-10 lg:top-36"
          style={{ animationDelay: '480ms' }}
          aria-hidden
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em]">Clearance</p>
          <p className="font-display text-lg font-semibold leading-none">ACTIVE</p>
        </div>

        <a
          href="#about"
          className="mt-14 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted transition-colors hover:text-signal"
        >
          Continue file
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
