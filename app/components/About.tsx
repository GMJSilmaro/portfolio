import React from 'react'
import { Reveal } from './ui/reveal'
import { Timeline } from './Timeline'

export const About = () => {
  return (
    <section id="about" className="relative border-t border-[color:var(--rule)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:pl-28">
        <Reveal className="mb-12 max-w-2xl">
          <p className="dossier-kicker">01 — Subject file</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Experience on record
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">
            A living career log — systems shipped, roles held, and the craft sharpened along the
            way.
          </p>
        </Reveal>

        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Reveal delay={60} className="lg:col-span-7">
            <div className="dossier-panel h-full p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-[color:var(--rule)] pb-4">
                <h3 className="font-display text-2xl font-semibold text-ink">Professional summary</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                  SUBJ-01
                </span>
              </div>
              <p className="text-base leading-relaxed text-ink-soft">
                Technical Lead Consultant and Software Engineer with experience across software
                development, system integration, and enterprise solutions. I work end to end on
                fullstack applications, SAP Business One integration, e-Invoice systems, API
                development, databases, Docker, and CI/CD — leading technical projects, resolving
                complex system issues, and delivering solutions businesses depend on.
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-[color:var(--rule)] pt-6">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    Years
                  </dt>
                  <dd className="mt-1 font-display text-3xl font-semibold text-ink">5+</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    Clients
                  </dt>
                  <dd className="mt-1 font-display text-3xl font-semibold text-ink">12+</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    Role
                  </dt>
                  <dd className="mt-1 font-display text-3xl font-semibold text-signal">Lead</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="dossier-panel relative h-full overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-signal/10 blur-2xl" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
                Education
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink">
                BS in Information Technology
              </h3>
              <p className="mt-2 text-sm text-ink-soft">Interface Computer College · 2021</p>
              <ul className="mt-6 space-y-3">
                <li className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  Specialized in software development and system architecture
                </li>
                <li className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  Focused on modern web technologies with academic recognition
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
            Career log
          </p>
        </Reveal>

        <Timeline />
      </div>
    </section>
  )
}
