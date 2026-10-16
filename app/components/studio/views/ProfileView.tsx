'use client'

import React from 'react'
import Image from 'next/image'
import { Reveal } from '../../ui/reveal'
import { Chapter } from '../layout'

export function ProfileView() {
  return (
    <Chapter>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-12">
        <div className="min-w-0">
          <Reveal>
            <p className="dossier-kicker">Profile</p>
            <h2 className="max-w-xl text-balance font-display text-[clamp(1.85rem,3vw,2.7rem)] font-medium leading-[1.12] tracking-tight text-ink">
              I lead technical delivery.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Technical Lead Consultant and Software Engineer across fullstack products, SAP Business
              One integration, e-Invoice systems, APIs, databases, Docker, and CI/CD. I own
              architecture, unblock complex integrations, and raise the standard of what ships.
            </p>
          </Reveal>
        </div>

        {/* <Reveal delay={120}>
          <figure className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden bg-ink lg:max-w-none">
            <Image
              src="./images/Profile.jpg"
              alt="Gilbert Michael Jay Silmaro"
              fill
              sizes="(max-width: 1024px) 80vw, 280px"
              className="object-cover object-[42%_12%]"
            />
          </figure>
        </Reveal> */}
      </div>

      <Reveal delay={160}>
        <div className="mt-10 grid gap-8 border-t border-[color:var(--rule)] pt-8 md:grid-cols-2">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">Education</p>
            <h3 className="mt-3 font-display text-2xl font-medium text-ink">BS Information Technology</h3>
            <p className="mt-2 text-sm text-ink-muted">Interface Computer College · 2021</p>
          </div>
          <div className="min-w-0 md:border-l md:border-[color:var(--rule)] md:pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">Focus</p>
            <ul className="mt-3 space-y-2.5 text-base leading-relaxed text-ink-soft">
              <li>SAP B1 & enterprise integrations</li>
              <li>e-Invoice compliance platforms</li>
              <li>Web, mobile, and Dockerised delivery</li>
              <li>Technical mentoring & code review</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden border border-[color:var(--rule)] bg-[color:var(--rule)]">
          {[
            { value: '5+', label: 'Years shipping' },
            { value: '12+', label: 'Enterprise clients' },
            { value: 'Lead', label: 'Current seat' },
          ].map((stat) => (
            <div key={stat.label} className="min-w-0 bg-panel px-3 py-5 sm:px-5">
              <dt className="font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-ink-muted">
                {stat.label}
              </dt>
              <dd className="mt-2 font-display text-2xl font-medium text-ink sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={240}>
        <blockquote className="mt-10 max-w-3xl border-t border-[color:var(--rule)] pt-8">
          <p className="text-balance font-display text-xl leading-snug text-ink sm:text-2xl">
            “Build systems that survive production — then teach the team to own them.”
          </p>
          <footer className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            Working principle
          </footer>
        </blockquote>
      </Reveal>
    </Chapter>
  )
}
