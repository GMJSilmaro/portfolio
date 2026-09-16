'use client'

import React, { useState } from 'react'
import { Images } from 'lucide-react'
import Image from 'next/image'
import { Modal } from './ui/modal'
import { Reveal } from './ui/reveal'
import { enterpriseWork, projects, type Project } from '../data/projects'

const TECH_TAG_LIMIT = 5

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [enlargedImageIndex, setEnlargedImageIndex] = useState<number | null>(null)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [isEnlargedModalOpen, setIsEnlargedModalOpen] = useState(false)

  const getImagePath = (path: string) => (path.startsWith('./') ? path.slice(2) : path)

  const openGallery = (project: Project) => {
    setSelectedProject(project)
    setIsGalleryModalOpen(true)
  }

  const handleImageClick = (index: number) => {
    setEnlargedImageIndex(index)
    setIsEnlargedModalOpen(true)
  }

  const handleNext = () => {
    if (selectedProject && enlargedImageIndex !== null) {
      setEnlargedImageIndex((enlargedImageIndex + 1) % selectedProject.images.length)
    }
  }

  const handlePrevious = () => {
    if (selectedProject && enlargedImageIndex !== null) {
      setEnlargedImageIndex(
        (enlargedImageIndex - 1 + selectedProject.images.length) % selectedProject.images.length
      )
    }
  }

  const handleCloseGallery = () => {
    setIsGalleryModalOpen(false)
    setEnlargedImageIndex(null)
    setIsEnlargedModalOpen(false)
  }

  const handleCloseEnlarged = () => {
    setIsEnlargedModalOpen(false)
    setEnlargedImageIndex(null)
  }

  return (
    <section id="projects" className="relative border-t border-[color:var(--rule)] bg-white/35 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:pl-28">
        <Reveal className="mb-12 max-w-2xl">
          <p className="dossier-kicker">02 — Case files</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Featured work
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">
            Production systems I designed and built — open any case to review the evidence gallery.
          </p>
        </Reveal>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 80}>
              <article className="group dossier-panel overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-signal/35">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <button
                    type="button"
                    onClick={() => openGallery(project)}
                    className="relative block aspect-[16/10] w-full overflow-hidden bg-paper-deep lg:col-span-7 lg:aspect-auto lg:min-h-[320px]"
                  >
                    {project.images[0] && (
                      <Image
                        src={getImagePath(project.images[0].src)}
                        alt={project.images[0].alt}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        priority={index === 0}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 border border-white/25 bg-ink/80 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper backdrop-blur-sm transition-colors group-hover:border-signal group-hover:bg-signal">
                        <Images className="h-3.5 w-3.5" />
                        Exhibit · {project.images.length}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/80">
                        {project.caseId}
                      </span>
                    </div>
                  </button>

                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-5">
                    <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                      <span className="text-signal">{project.period}</span>
                      <span>·</span>
                      <span>{project.company}</span>
                    </div>

                    <div className="mb-3 flex items-start gap-3">
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-[color:var(--rule)] bg-white">
                        <project.icon className="h-4 w-4 text-signal" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-signal sm:text-3xl">
                        {project.title}
                      </h3>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-ink-muted sm:text-base">
                      {project.description}
                    </p>

                    <div className="mb-5">
                      <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                        Highlights
                      </h4>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {project.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-ink-soft">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-signal" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 border-t border-[color:var(--rule)] pt-4">
                      {project.tech.slice(0, TECH_TAG_LIMIT).map((tech) => (
                        <span key={tech} className="chip cursor-default">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > TECH_TAG_LIMIT && (
                        <span
                          className="border border-signal/30 bg-signal/10 px-2.5 py-1 font-mono text-xs font-medium text-signal"
                          title={project.tech.slice(TECH_TAG_LIMIT).join(', ')}
                        >
                          +{project.tech.length - TECH_TAG_LIMIT}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mb-8 mt-16 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
            Enterprise delivery
          </p>
          <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
            Confidential client rollouts
          </h3>
          <p className="mt-3 text-ink-muted">
            Long-running platform work across Malaysia, Singapore, and other markets. Client names
            withheld under confidentiality.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {enterpriseWork.map((work, index) => (
            <Reveal key={work.title} delay={index * 80}>
              <div className="dossier-panel group h-full p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/35 sm:p-7">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--rule)] bg-white">
                      <work.icon className="h-5 w-5 text-signal" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                        {work.caseId}
                      </p>
                      <h4 className="font-display text-xl font-semibold text-ink">{work.title}</h4>
                      <p className="font-mono text-[11px] text-ink-muted">{work.period}</p>
                    </div>
                  </div>
                  <span className="shrink-0 border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-signal">
                    {work.clientCount}
                  </span>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-ink-muted">{work.summary}</p>

                <div className="mb-5">
                  <h5 className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                    Scope
                  </h5>
                  <ul className="space-y-2">
                    {work.scope.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-ink-soft">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                    Sectors served
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {work.sectors.map((sector) => (
                      <span key={sector} className="chip cursor-default">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal isOpen={isGalleryModalOpen} onClose={handleCloseGallery}>
        {selectedProject && (
          <div className="bg-panel p-4 sm:p-6">
            <div className="mb-6 pr-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
                {selectedProject.caseId} · Gallery
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
                {selectedProject.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedProject.images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className="group text-left"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="relative mb-2 aspect-[4/3] overflow-hidden border border-[color:var(--rule)] bg-paper-deep">
                    <Image
                      src={getImagePath(image.src)}
                      alt={image.alt}
                      fill
                      className="object-cover transition-opacity group-hover:opacity-85"
                    />
                  </div>
                  <span className="block text-center font-mono text-[11px] text-ink-muted">
                    {image.alt}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isEnlargedModalOpen} onClose={handleCloseEnlarged}>
        {selectedProject && enlargedImageIndex !== null && (
          <div className="relative flex min-h-[60vh] flex-col items-center justify-center bg-ink p-4 sm:min-h-[70vh]">
            <div className="relative h-[55vh] w-full sm:h-[65vh]">
              <Image
                src={getImagePath(selectedProject.images[enlargedImageIndex].src)}
                alt={selectedProject.images[enlargedImageIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            <button
              onClick={handlePrevious}
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-white/10 text-paper hover:bg-white/20"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-white/10 text-paper hover:bg-white/20"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <p className="mt-4 border border-white/15 bg-white/10 px-4 py-2 text-center font-mono text-sm text-paper">
              {selectedProject.images[enlargedImageIndex].alt}
            </p>
          </div>
        )}
      </Modal>
    </section>
  )
}
