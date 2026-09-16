'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import { experiences } from '../data/experience';

const TECH_TAG_LIMIT = 6;

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fillProgress, setFillProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const progress = (anchor - rect.top) / rect.height;
      setFillProgress(Math.max(0, Math.min(1, progress)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const revealAll = () => setVisibleItems(new Set(experiences.map((_, i) => i)));

    if (
      !container ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setVisibleItems((prev) => new Set(prev).add(index));
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );

    container.querySelectorAll('[data-index]').forEach((node) => observer.observe(node));

    // Safety net: never leave entries invisible if the observer never fires.
    const fallback = window.setTimeout(revealAll, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Rail */}
      <div className="absolute left-[9px] top-2 h-full w-px bg-white/10 sm:left-[11px]" aria-hidden>
        <div
          className="w-px origin-top bg-gradient-to-b from-accent via-accent to-accent/40 transition-[height] duration-200 ease-out"
          style={{ height: `${fillProgress * 100}%` }}
        />
      </div>

      <div className="space-y-5">
        {experiences.map((job, index) => {
          const isVisible = visibleItems.has(index);

          return (
            <article
              key={`${job.company}-${job.period}`}
              data-index={index}
              className={`group relative pl-9 transition-all duration-700 ease-out sm:pl-12 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: isVisible ? `${Math.min(index, 4) * 70}ms` : '0ms' }}
            >
              {/* Node */}
              <span className="absolute left-0 top-4 flex h-[19px] w-[19px] items-center justify-center sm:h-[23px] sm:w-[23px]">
                {job.current && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" />
                )}
                <span
                  className={`relative flex h-[13px] w-[13px] items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:scale-125 sm:h-[15px] sm:w-[15px] ${
                    job.current
                      ? 'border-accent bg-accent'
                      : 'border-accent/60 bg-navy-950 group-hover:border-accent'
                  }`}
                />
              </span>

              <div className="card-interactive p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-navy-800 px-2.5 py-1 text-xs font-medium text-accent-soft">
                    {job.period}
                  </span>
                  {job.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Present
                    </span>
                  )}
                  <span className="ml-auto inline-flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </span>
                </div>

                <div className="mb-2 flex items-start gap-2.5">
                  <Briefcase className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <h3 className="text-base font-semibold leading-snug text-white sm:text-lg">
                    {job.role}
                    <span className="text-slate-500"> • </span>
                    <span className="text-accent-soft transition-colors group-hover:text-accent">
                      {job.company}
                    </span>
                  </h3>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-slate-400 sm:pl-[26px]">
                  {job.summary}
                </p>

                <ul className="mb-4 space-y-2 sm:pl-[26px]">
                  {job.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-500 transition-colors group-hover:bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4 sm:ml-[26px]">
                  {job.tech.slice(0, TECH_TAG_LIMIT).map((tech) => (
                    <span key={tech} className="chip cursor-default text-xs lowercase">
                      {tech}
                    </span>
                  ))}
                  {job.tech.length > TECH_TAG_LIMIT && (
                    <span
                      className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-soft"
                      title={job.tech.slice(TECH_TAG_LIMIT).join(', ')}
                    >
                      +{job.tech.length - TECH_TAG_LIMIT}
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
