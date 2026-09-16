'use client'

import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import { Reveal } from './ui/reveal'
import { favoriteCount, techCategories } from '../data/tech-stack'

export const Skills = () => {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const focusAreas = [
    'Technical Leadership',
    'System Integration',
    'Fullstack Development',
    'DevOps & Deployment',
  ]

  const workingStyle = [
    'Technical Mentoring',
    'Code Review',
    'Solution Architecture',
    'Project Delivery',
    'Agile Development',
    'Clean Code',
    'Performance Optimization',
    'Troubleshooting',
    'Technical Documentation',
    'Stakeholder Communication',
  ]

  const visibleCategories = techCategories
    .map((group) => ({
      ...group,
      items: showFavoritesOnly ? group.items.filter((item) => item.favorite) : group.items,
    }))
    .filter((group) => group.items.length > 0)

  return (
    <section id="skills" className="relative border-t border-[color:var(--rule)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:pl-28">
        <Reveal className="mb-10 max-w-2xl">
          <p className="dossier-kicker">03 — Stack inventory</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Tech stack
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">
            Every technology, tool, and platform on file. Hearts mark where I am most comfortable.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFavoritesOnly((prev) => !prev)}
              aria-pressed={showFavoritesOnly}
              className={`group inline-flex min-h-[42px] items-center gap-2 border px-4 font-mono text-xs font-medium uppercase tracking-[0.14em] transition-all duration-200 hover:-translate-y-0.5 ${
                showFavoritesOnly
                  ? 'border-rose-400/50 bg-rose-50 text-rose-700'
                  : 'border-[color:var(--rule)] bg-white/70 text-ink-soft hover:border-rose-300'
              }`}
            >
              <Heart
                className={`h-3.5 w-3.5 transition-all duration-300 ${
                  showFavoritesOnly
                    ? 'scale-110 fill-rose-500 text-rose-500'
                    : 'text-rose-400 group-hover:scale-110'
                }`}
              />
              {showFavoritesOnly ? 'Showing favourites' : `Favourites (${favoriteCount})`}
            </button>

            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="cursor-default border border-signal/25 bg-signal/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-signal transition-all duration-200 hover:-translate-y-0.5 hover:border-signal/50"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="space-y-5">
          {visibleCategories.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 50}>
              <div className="dossier-panel p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-[color:var(--rule)] pb-3">
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
                    <span className="h-4 w-1 bg-signal" />
                    {group.category}
                  </h3>
                  <span className="font-mono text-[11px] text-ink-muted">{group.items.length}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {group.items.map((tech) => (
                    <div
                      key={`${group.category}-${tech.name}`}
                      className="group/tech relative flex items-center gap-3 overflow-hidden border border-[color:var(--rule)] bg-white/70 px-3 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-signal/40"
                    >
                      <span
                        className="pointer-events-none absolute -left-6 -top-6 h-16 w-16 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover/tech:opacity-30"
                        style={{ backgroundColor: tech.color }}
                        aria-hidden
                      />

                      <tech.icon
                        className="relative h-6 w-6 shrink-0 transition-transform duration-300 group-hover/tech:scale-110"
                        style={{ color: tech.color }}
                      />

                      <span className="relative min-w-0 flex-1 truncate text-sm text-ink-soft transition-colors group-hover/tech:text-ink">
                        {tech.name}
                      </span>

                      {tech.favorite && (
                        <Heart
                          className="relative h-3.5 w-3.5 shrink-0 fill-rose-500 text-rose-500 transition-transform duration-300 group-hover/tech:scale-125"
                          aria-label="Most comfortable with"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="dossier-panel mt-5 p-5 sm:p-6">
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-ink">
              <span className="h-4 w-1 bg-signal" />
              Ways of working
            </h3>
            <div className="flex flex-wrap gap-2">
              {workingStyle.map((skill) => (
                <span key={skill} className="chip cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
