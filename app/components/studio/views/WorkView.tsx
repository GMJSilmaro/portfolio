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

  const openGallery = () => {
    setGalleryOpen(true)
  }

  return (
    <div className="flex h-full min-h-0 flex-col lg:flex-row">
      <div className="border-b border-[color:var(--rule)] lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="px-6 py-8 sm:px-8">
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
                className={`min-w-[11rem] border px-4 py-4 text-left transition-all lg:min-w-0 lg:rounded-none lg:border-x-0 lg:border-t-0 ${
                  active
                    ? 'border-signal bg-white lg:border-l-2 lg:border-l-signal lg:bg-white'
                    : 'border-[color:var(--rule)] bg-transparent lg:border-[color:var(--rule)] hover:bg-white/70'
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

      <div className="min-w-0 flex-1 overflow-y-auto">
        <Reveal>
          <button
            type="button"
            onClick={openGallery}
            className="group relative block aspect-[16/10] w-full overflow-hidden bg-ink"
          >
            <Image
              src={getImagePath(project.images[0].src)}
              alt={project.images[0].alt}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 border border-white/20 bg-ink/70 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper backdrop-blur-sm">
              <Images className="h-3.5 w-3.5" />
              {project.images.length} exhibits
            </span>
          </button>
        </Reveal>

        <div className="px-6 py-8 sm:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            {project.company} · {project.period}
          </p>
          <h3 className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
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

          <div className="mt-14 border-t border-[color:var(--rule)] pt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
              Enterprise delivery
            </p>
            <div className="mt-6 space-y-8">
              {enterpriseWork.map((work) => (
                <div key={work.caseId} className="grid gap-4 sm:grid-cols-[7rem_1fr]">
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

      <Modal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)}>
        <div className="bg-panel p-5 sm:p-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            {project.caseId} · Exhibits
          </p>
          <h3 className="mt-1 font-display text-2xl font-medium text-ink">{project.title}</h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className="text-left"
                onClick={() => setEnlargedIndex(index)}
              >
                <div className="relative mb-2 aspect-[4/3] overflow-hidden border border-[color:var(--rule)] bg-paper-deep">
                  <Image
                    src={getImagePath(image.src)}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="block text-center font-mono text-[11px] text-ink-muted">
                  {image.alt}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      <Modal isOpen={enlargedIndex !== null} onClose={() => setEnlargedIndex(null)}>
        {enlargedIndex !== null && (
          <div className="relative flex min-h-[60vh] flex-col items-center justify-center bg-ink p-4">
            <div className="relative h-[55vh] w-full sm:h-[65vh]">
              <Image
                src={getImagePath(project.images[enlargedIndex].src)}
                alt={project.images[enlargedIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
            <button
              type="button"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-paper"
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
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-paper"
              onClick={() => setEnlargedIndex((enlargedIndex + 1) % project.images.length)}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <p className="mt-4 font-mono text-sm text-paper/80">
              {project.images[enlargedIndex].alt}
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}
