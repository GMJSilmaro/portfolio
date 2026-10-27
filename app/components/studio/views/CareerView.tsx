'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { experiences } from '@/app/data/experience'
import { listContainerVariants, listItemVariants } from '@/lib/motion'
import { Reveal } from '../../ui/reveal'
import { Chapter, ChapterHeader } from '../layout'

export function CareerView() {
  const reduceMotion = useReducedMotion()

  return (
    <Chapter>
      <Reveal>
        <ChapterHeader kicker="Career" title="A continuous record of roles and delivery." />
      </Reveal>

      <motion.ol
        className="border-t border-[color:var(--rule)]"
        variants={listContainerVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
      >
        {experiences.map((job) => (
          <motion.li
            key={`${job.company}-${job.role}-${job.period}`}
            variants={listItemVariants}
            className="border-b border-[color:var(--rule)] py-8"
          >
            <div className="grid gap-3 md:grid-cols-[9.5rem_minmax(0,1fr)] md:gap-8">
              <p className="font-mono text-sm text-signal">{job.period}</p>
              <div className="relative min-w-0 md:border-l md:border-[color:var(--rule)] md:pl-8">
                <span
                  className="absolute -left-[5px] top-1.5 hidden h-2.5 w-2.5 rounded-full bg-signal ring-4 ring-white md:block"
                  aria-hidden
                />
                <h3 className="font-display text-xl font-medium leading-snug text-ink sm:text-2xl">
                  {job.role}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {job.company} · {job.location}
                  {job.current ? ' · Present' : ''}
                </p>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">{job.summary}</p>
                <ul className="mt-4 max-w-3xl space-y-2">
                  {job.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                      <span className="mt-2 h-px w-4 shrink-0 bg-signal" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {job.tech.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Chapter>
  )
}
