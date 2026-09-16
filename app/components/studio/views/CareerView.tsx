'use client'

import React, { useState } from 'react'
import { experiences } from '../../../data/experience'
import { Reveal } from '../../ui/reveal'

export function CareerView() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
      <Reveal className="mb-10 max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal">Career</p>
        <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          A continuous record of roles and delivery.
        </h2>
      </Reveal>

      <div className="divide-y divide-[color:var(--rule)] border-y border-[color:var(--rule)]">
        {experiences.map((job, index) => {
          const open = openIndex === index
          const year = job.period.split('—')[0]?.trim() ?? job.period

          return (
            <article key={`${job.company}-${job.period}`} className="group">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="grid w-full grid-cols-[4.5rem_1fr_auto] items-start gap-4 py-6 text-left sm:grid-cols-[6rem_1fr_auto] sm:gap-8"
                aria-expanded={open}
              >
                <span className="font-mono text-sm text-signal sm:text-base">{year}</span>
                <div>
                  <h3 className="font-display text-xl font-medium text-ink sm:text-2xl">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    {job.company} · {job.location}
                    {job.current ? ' · Present' : ''}
                  </p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  {open ? 'Close' : 'Open'}
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pb-8 pl-[4.5rem] sm:pl-[6rem] sm:pr-8">
                    <p className="max-w-2xl text-base leading-relaxed text-ink-soft">{job.summary}</p>
                    <ul className="mt-5 max-w-2xl space-y-2">
                      {job.highlights.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                          <span className="mt-2 h-px w-4 shrink-0 bg-signal" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.tech.map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
