'use client'

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { enterpriseWork, projects } from '@/app/data/projects'
import { listContainerVariants, listItemVariants } from '@/lib/motion'
import { Reveal } from '../../ui/reveal'
import { Chapter, ChapterHeader, ProjectPreview } from '../layout'
import { EnterpriseDetailDialog, ProjectDetailDialog } from './ProjectDialogs'

function projectNumber(index: number) {
  return String(index + 1).padStart(2, '0')
}

function isPhoneProject(images: { src: string }[]) {
  return images.some((image) => image.src.includes('fsm-mobile'))
}

function cardPreview(images: { src: string; alt: string }[]) {
  return (
    images.find((image) => /dashboard|current jobs/i.test(image.alt)) ??
    images.find((image) => !/splash/i.test(image.alt)) ??
    images[0]
  )
}

export function WorkView() {
  const [projectId, setProjectId] = useState<string | null>(null)
  const [enterpriseId, setEnterpriseId] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()

  const project = projects.find((item) => item.caseId === projectId) ?? null
  const enterprise = enterpriseWork.find((item) => item.caseId === enterpriseId) ?? null

  return (
    <Chapter>
      <Reveal>
        <ChapterHeader kicker="Work" title="Selected work." />
      </Reveal>

      <motion.ul
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        variants={listContainerVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
      >
        {projects.map((item, index) => {
          const preview = cardPreview(item.images)
          const phone = isPhoneProject(item.images)
          return (
            <motion.li key={item.caseId} className="min-w-0" variants={listItemVariants}>
              <motion.button
                type="button"
                onClick={() => setProjectId(item.caseId)}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full w-full min-w-0 flex-col border border-[color:var(--rule)] bg-white text-left transition-colors duration-200 hover:border-signal/40"
              >
                {phone ? (
                  <div className="flex h-56 items-center justify-center overflow-hidden bg-[#e8eef2] sm:h-64">
                    <ProjectPreview
                      src={preview.src}
                      alt={preview.alt}
                      sizes="180px"
                      className="aspect-[9/19] h-full w-auto transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="overflow-hidden">
                    <ProjectPreview
                      src={preview.src}
                      alt={preview.alt}
                      sizes="(max-width: 768px) 100vw, 36vw"
                      imageClassName="transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <span className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-signal">
                    {projectNumber(index)}
                  </span>
                  <h3 className="font-display text-xl font-medium leading-snug text-ink">{item.title}</h3>
                  <span className="text-sm text-ink-muted">{item.company}</span>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                    {item.period}
                  </span>
                </span>
              </motion.button>
            </motion.li>
          )
        })}
      </motion.ul>

      <section className="mt-12 border-t border-[color:var(--rule)] pt-8">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">Enterprise delivery</h3>
        <motion.ul
          className="mt-4 divide-y divide-[color:var(--rule)] border-y border-[color:var(--rule)]"
          variants={listContainerVariants}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
        >
          {enterpriseWork.map((work) => (
            <motion.li key={work.caseId} variants={listItemVariants}>
              <button
                type="button"
                onClick={() => setEnterpriseId(work.caseId)}
                className="grid w-full min-w-0 gap-2 py-5 text-left transition-colors hover:bg-panel/80 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">{work.caseId}</span>
                <span className="min-w-0">
                  <h4 className="font-display text-xl font-medium leading-snug text-ink">{work.title}</h4>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                    {work.period} · {work.clientCount}
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      <ProjectDetailDialog project={project} onClose={() => setProjectId(null)} />
      <EnterpriseDetailDialog work={enterprise} onClose={() => setEnterpriseId(null)} />
    </Chapter>
  )
}
