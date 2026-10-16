'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { EnterpriseWork, Project } from '@/app/data/projects'
import { Modal } from '../../ui/modal'
import { assetSrc, ProjectPreview } from '../layout'

type ShotKind = 'web' | 'phone'

function isPhoneProject(project: Project) {
  return project.images.some((image) => image.src.includes('fsm-mobile'))
}

function shotFrame(kind: ShotKind, compact: boolean) {
  switch (kind) {
    case 'web':
      return compact ? 'aspect-[2/1] w-36 shrink-0' : 'aspect-[2/1] w-full'
    case 'phone':
      return compact ? 'aspect-[9/19] w-14 shrink-0' : 'mx-auto aspect-[9/19] w-full max-w-[220px]'
    default: {
      const _exhaustive: never = kind
      return _exhaustive
    }
  }
}

function stepIndex(current: number, delta: number, length: number) {
  return (current + delta + length) % length
}

interface ProjectDetailDialogProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetailDialog({ project, onClose }: ProjectDetailDialogProps) {
  const [imageIndex, setImageIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    setImageIndex(0)
    setZoomed(false)
  }, [project])

  useEffect(() => {
    if (!project || !zoomed) return
    const onKey = (event: KeyboardEvent) => {
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setImageIndex((current) => stepIndex(current, 1, project.images.length))
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setImageIndex((current) => stepIndex(current, -1, project.images.length))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, zoomed])

  const kind: ShotKind = project && isPhoneProject(project) ? 'phone' : 'web'
  const activeImage = project?.images[imageIndex]

  return (
    <>
      <Modal
        isOpen={project !== null}
        onClose={onClose}
        subtitle={project ? `${project.caseId} · ${project.company}` : undefined}
        title={project?.title}
        panelClassName="max-w-6xl"
      >
        {project && activeImage ? (
          <div className="lg:grid lg:grid-cols-[3.25rem_minmax(0,1fr)]">
            <div className="hidden bg-ink lg:flex lg:items-start lg:justify-center lg:px-2 lg:py-10" aria-hidden>
              <p className="max-h-80 overflow-hidden font-display text-sm uppercase tracking-[0.28em] text-paper [writing-mode:vertical-rl] rotate-180">
                {project.title}
              </p>
            </div>

            <div className="min-w-0 px-4 py-5 sm:px-6 sm:py-6">
              <button
                type="button"
                onClick={() => setZoomed(true)}
                className="block w-full text-left"
                aria-label={`Enlarge ${activeImage.alt}`}
              >
                <ProjectPreview
                  src={activeImage.src}
                  alt={activeImage.alt}
                  priority
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className={shotFrame(kind, false)}
                />
              </button>

              {project.images.length > 1 ? (
                <ul className="mt-4 flex max-w-full gap-3 overflow-x-auto overscroll-x-contain pb-1">
                  {project.images.map((image, index) => {
                    const selected = index === imageIndex
                    return (
                      <li key={image.src} className="shrink-0">
                        <button
                          type="button"
                          onClick={() => setImageIndex(index)}
                          aria-current={selected ? 'true' : undefined}
                          aria-label={`Show ${image.alt}`}
                          className={`block border-2 ${selected ? 'border-signal' : 'border-transparent'}`}
                        >
                          <ProjectPreview
                            src={image.src}
                            alt=""
                            sizes="144px"
                            className={shotFrame(kind, true)}
                          />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              ) : null}

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                {project.company} · {project.period}
              </p>
              <h3 className="mt-2 text-balance font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">{project.description}</p>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <section className="min-w-0">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Highlights</h4>
                  <ul className="mt-3 space-y-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                        <span className="mt-2 h-px w-4 shrink-0 bg-signal" aria-hidden />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="min-w-0">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Built with</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        isOpen={zoomed && project !== null && activeImage !== undefined}
        onClose={() => setZoomed(false)}
        tone="ink"
        subtitle={project?.caseId}
        title={activeImage?.alt ?? 'Exhibit'}
      >
        {project && activeImage ? (
          <div className="relative flex flex-col items-center px-3 py-4 sm:px-6 sm:py-6">
            <div className="relative h-[min(58vh,560px)] w-full">
              <Image
                src={assetSrc(activeImage.src)}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 960px"
                priority
              />
            </div>
            {project.images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-paper sm:left-4"
                  onClick={() => setImageIndex((current) => stepIndex(current, -1, project.images.length))}
                  aria-label="Previous exhibit"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-paper sm:right-4"
                  onClick={() => setImageIndex((current) => stepIndex(current, 1, project.images.length))}
                  aria-label="Next exhibit"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
            <p className="mt-3 font-mono text-xs text-paper/70 sm:text-sm">
              {imageIndex + 1} / {project.images.length}
            </p>
          </div>
        ) : null}
      </Modal>
    </>
  )
}

interface EnterpriseDetailDialogProps {
  work: EnterpriseWork | null
  onClose: () => void
}

export function EnterpriseDetailDialog({ work, onClose }: EnterpriseDetailDialogProps) {
  return (
    <Modal
      isOpen={work !== null}
      onClose={onClose}
      subtitle={work ? `${work.caseId} · ${work.period}` : undefined}
      title={work?.title}
      panelClassName="max-w-4xl"
    >
      {work ? (
        <div className="min-w-0 px-4 py-5 sm:px-6 sm:py-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            {work.period} · {work.clientCount}
          </p>
          <h3 className="mt-2 text-balance font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
            {work.title}
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">{work.summary}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <section className="min-w-0">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Scope</h4>
              <ul className="mt-3 space-y-2">
                {work.scope.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-2 h-px w-4 shrink-0 bg-signal" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="min-w-0">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Sectors</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {work.sectors.map((sector) => (
                  <li key={sector} className="chip">
                    {sector}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}
