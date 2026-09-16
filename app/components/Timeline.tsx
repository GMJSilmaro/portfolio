'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { experiences } from '../data/experience'

const TECH_TAG_LIMIT = 6

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [fillProgress, setFillProgress] = useState(0)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const anchor = window.innerHeight * 0.55
      const progress = (anchor - rect.top) / rect.height
      setFillProgress(Math.max(0, Math.min(1, progress)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const revealAll = () => setVisibleItems(new Set(experiences.map((_, i) => i)))

    if (
      !container ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      revealAll()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index)
            setVisibleItems((prev) => new Set(prev).add(index))
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    )

    container.querySelectorAll('[data-index]').forEach((node) => observer.observe(node))

    const fallback = window.setTimeout(revealAll, 2000)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div
        className="absolute left-[9px] top-2 h-full w-px bg-[color:var(--rule)] sm:left-[11px]"
        aria-hidden
      >
        <div
          className="w-px origin-top bg-gradient-to-b from-signal via-signal to-signal/30 transition-[height] duration-200 ease-out"
          style={{ height: `${fillProgress * 100}%` }}
        />
      </div>

      <div className="space-y-5">
        {experiences.map((job, index) => {
          const isVisible = visibleItems.has(index)
          const entryId = `LOG-${String(index + 1).padStart(2, '0')}`

          return (
            <article
              key={`${job.company}-${job.period}`}
              data-index={index}
              className={`group relative pl-9 transition-all duration-700 ease-out sm:pl-12 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: isVisible ? `${Math.min(index, 4) * 70}ms` : '0ms' }}
            >
              <span className="absolute left-0 top-5 flex h-[19px] w-[19px] items-center justify-center sm:h-[23px] sm:w-[23px]">
                {job.current && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal/35" />
                )}
                <span
                  className={`relative flex h-[13px] w-[13px] items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:scale-125 sm:h-[15px] sm:w-[15px] ${
                    job.current
                      ? 'border-signal bg-signal'
                      : 'border-signal/50 bg-paper group-hover:border-signal'
                  }`}
                />
              </span>

              <div className="dossier-panel p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-signal/35 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                    {entryId}
                  </span>
                  <span className="border border-[color:var(--rule)] bg-white/70 px-2.5 py-1 font-mono text-xs text-ink-soft">
                    {job.period}
                  </span>
                  {job.current && (
                    <span className="inline-flex items-center gap-1.5 border border-signal/30 bg-signal/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-signal">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                      Present
                    </span>
                  )}
                  <span className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] text-ink-muted">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
                  {job.role}
                  <span className="text-ink-muted"> · </span>
                  <span className="text-signal-soft">{job.company}</span>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{job.summary}</p>

                <ul className="mt-4 space-y-2">
                  {job.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2 text-sm leading-relaxed text-ink-soft transition-colors group-hover:text-ink"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-muted transition-colors group-hover:bg-signal" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-[color:var(--rule)] pt-4">
                  {job.tech.slice(0, TECH_TAG_LIMIT).map((tech) => (
                    <span key={tech} className="chip cursor-default">
                      {tech}
                    </span>
                  ))}
                  {job.tech.length > TECH_TAG_LIMIT && (
                    <span
                      className="border border-signal/30 bg-signal/10 px-2.5 py-1 font-mono text-xs font-medium text-signal"
                      title={job.tech.slice(TECH_TAG_LIMIT).join(', ')}
                    >
                      +{job.tech.length - TECH_TAG_LIMIT}
                    </span>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
