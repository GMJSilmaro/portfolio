'use client'

import React from 'react'
import { Reveal } from '../../ui/reveal'

export function ProfileView() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal">Profile</p>
        <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          I lead technical delivery for software businesses depend on.
        </h2>
      </Reveal>

      <Reveal delay={80}>
        <p className="mt-8 text-lg leading-relaxed text-ink-soft sm:text-xl">
          Technical Lead Consultant and Software Engineer across fullstack products, SAP Business
          One integration, e-Invoice systems, APIs, databases, Docker, and CI/CD. I own architecture,
          unblock complex integrations, and raise the standard of what ships.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-12 grid grid-cols-3 gap-px overflow-hidden border border-[color:var(--rule)] bg-[color:var(--rule)]">
          {[
            { value: '5+', label: 'Years shipping' },
            { value: '12+', label: 'Enterprise clients' },
            { value: 'Lead', label: 'Current seat' },
          ].map((stat) => (
            <div key={stat.label} className="bg-panel px-4 py-6 sm:px-6">
              <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">{stat.value}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-14 grid gap-10 sm:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
              Education
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
              BS Information Technology
            </h3>
            <p className="mt-2 text-sm text-ink-muted">Interface Computer College · 2021</p>
          </div>
          <div className="border-l border-[color:var(--rule)] pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">Focus</p>
            <ul className="mt-3 space-y-3 text-base text-ink-soft">
              <li>SAP B1 & enterprise integrations</li>
              <li>e-Invoice compliance platforms</li>
              <li>Web, mobile, and Dockerised delivery</li>
              <li>Technical mentoring & code review</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <blockquote className="mt-16 border-t border-[color:var(--rule)] pt-10">
          <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
            “Build systems that survive production — then teach the team to own them.”
          </p>
          <footer className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            Working principle
          </footer>
        </blockquote>
      </Reveal>
    </div>
  )
}
