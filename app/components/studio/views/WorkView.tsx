'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { enterpriseWork, projects } from '../../../data/projects'
import { Modal } from '../../ui/modal'
import { Reveal } from '../../ui/reveal'

export function WorkView() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null)
  const project = projects[activeIndex]

  const getImagePath = (path: string) => (path.startsWith('./') ? path.slice(2) : path)

  return (
    <div className="flex min-w-0 flex-col lg:flex-row">
      <div className="border-b border-[color:var(--rule)] lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r xl:w-72">
        <div className="stage-pad !pb-4 lg:!pb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal">Work</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-ink">Cases</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
          {projects.map((item, index) => {
            const active = index === activeIndex
            return (
              <button
                key={item.caseId}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`min-w-[11rem] border px-4 py-3.5 text-left transition-all lg:min-w-0 lg:rounded-none lg:border-x-0 lg:border-t-0 ${
                  active
                    ? 'border-signal bg-white lg:border-l-2 lg:border-l-signal lg:bg-white'
                    : 'border-[color:var(--rule)] bg-transparent hover:bg-white/70 lg:border-[color:var(--rule)]'
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
                  {item.caseId}
                </p>
                <p className="mt-1 font-display text-lg font-medium leading-snug text-ink">
                  {item.title}
                </p>
                <p className="mt-1 font-mono text-[10px] text-ink-muted">{item.period}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <Reveal>
          <button
            type="button"
            onClick={() => setGalleryOpen(true)}
            className="group relative block aspect-[16/10] w-full overflow-hidden bg-ink"
          >
            <Image
              src={getImagePath(project.images[0].src)}
              alt={project.images[0].alt}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 border border-white/20 bg-ink/70 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper backdrop-blur-sm sm:bottom-5 sm:left-5">
              <Images className="h-3.5 w-3.5" />
              {project.images.length} exhibits
            </span>
          </button>
        </Reveal>

        <div className="stage-pad max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            {project.company} · {project.period}
          </p>
          <h3 className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            {project.description}
          </p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                Highlights
              </p>
              <ul className="mt-3 space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-ink-soft">
                    <span className="mt-2 h-px w-4 shrink-0 bg-signal" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                Built with
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-[color:var(--rule)] pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
              Enterprise delivery
            </p>
            <div className="mt-6 space-y-8">
              {enterpriseWork.map((work) => (
                <div key={work.caseId} className="grid gap-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
                    {work.caseId}
                  </p>
                  <div>
                    <h4 className="font-display text-xl font-medium text-ink">{work.title}</h4>
                    <p className="mt-1 text-sm text-ink-muted">
                      {work.period} · {work.clientCount}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{work.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        subtitle={`${project.caseId} · Exhibits`}
        title={project.title}
      >
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {project.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className="group text-left"
                onClick={() => setEnlargedIndex(index)}
              >
                <div className="relative mb-2 aspect-[16/10] overflow-hidden border border-[color:var(--rule)] bg-paper-deep">
                  <Image
                    src={getImagePath(image.src)}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 30vw"
                    className="object-contain p-1 transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>
                <span className="block px-0.5 text-left font-mono text-[11px] leading-snug text-ink-muted">
                  {image.alt}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={enlargedIndex !== null}
        onClose={() => setEnlargedIndex(null)}
        tone="ink"
        subtitle={project.caseId}
        title={enlargedIndex !== null ? project.images[enlargedIndex].alt : 'Exhibit'}
      >
        {enlargedIndex !== null && (
          <div className="relative flex min-h-[50vh] flex-col items-center justify-center px-3 py-4 sm:px-6 sm:py-6">
            <div className="relative h-[min(58vh,560px)] w-full">
              <Image
                src={getImagePath(project.images[enlargedIndex].src)}
                alt={project.images[enlargedIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 960px"
                priority
              />
            </div>
            <button
              type="button"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-paper sm:left-4"
              onClick={() =>
                setEnlargedIndex(
                  (enlargedIndex - 1 + project.images.length) % project.images.length
                )
              }
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-paper sm:right-4"
              onClick={() => setEnlargedIndex((enlargedIndex + 1) % project.images.length)}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <p className="mt-3 font-mono text-xs text-paper/70 sm:text-sm">
              {enlargedIndex + 1} / {project.images.length}
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}
