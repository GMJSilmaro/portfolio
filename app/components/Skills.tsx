'use client'

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Reveal } from './ui/reveal';
import { techCategories, favoriteCount } from '../data/tech-stack';

export const Skills = () => {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const focusAreas = [
    'Technical Leadership',
    'System Integration',
    'Fullstack Development',
    'DevOps & Deployment'
  ];

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
    'Stakeholder Communication'
  ];

  const visibleCategories = techCategories
    .map((group) => ({
      ...group,
      items: showFavoritesOnly ? group.items.filter((item) => item.favorite) : group.items,
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section id="skills" className="border-t border-white/10 bg-navy-900/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="mb-8 max-w-2xl">
          <p className="section-kicker">03 — Skills</p>
          <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Tech Stack
          </h2>
          <p className="text-slate-400">
            Every technology, tool, and platform I work with. The ones marked with a heart are
            where I am most comfortable.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFavoritesOnly((prev) => !prev)}
              aria-pressed={showFavoritesOnly}
              className={`group inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                showFavoritesOnly
                  ? 'border-rose-400/50 bg-rose-400/15 text-rose-200'
                  : 'border-white/15 bg-navy-800 text-slate-300 hover:border-rose-400/40'
              }`}
            >
              <Heart
                className={`h-4 w-4 transition-all duration-300 ${
                  showFavoritesOnly
                    ? 'scale-110 fill-rose-400 text-rose-400'
                    : 'text-rose-400/70 group-hover:scale-110'
                }`}
              />
              {showFavoritesOnly ? 'Showing favourites' : `Favourites (${favoriteCount})`}
            </button>

            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="cursor-default rounded-full border border-accent/35 bg-accent/10 px-3.5 py-1.5 text-sm text-accent-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/70 hover:text-white"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="space-y-4">
          {visibleCategories.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 60}>
              <div className="rounded-2xl border border-white/10 bg-navy-900 p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                    <span className="h-4 w-1 rounded-full bg-accent" />
                    {group.category}
                  </h3>
                  <span className="text-xs text-slate-500">{group.items.length}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {group.items.map((tech, techIndex) => (
                    <div
                      key={`${group.category}-${tech.name}`}
                      className="group/tech relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-navy-800/70 px-3 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-navy-700"
                      style={{ animationDelay: `${techIndex * 25}ms` }}
                    >
                      {/* Brand-tinted glow on hover */}
                      <span
                        className="pointer-events-none absolute -left-6 -top-6 h-16 w-16 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover/tech:opacity-40"
                        style={{ backgroundColor: tech.color }}
                        aria-hidden
                      />

                      <tech.icon
                        className="relative h-6 w-6 shrink-0 transition-transform duration-300 group-hover/tech:scale-110"
                        style={{ color: tech.color }}
                      />

                      <span className="relative min-w-0 flex-1 truncate text-sm text-slate-300 transition-colors group-hover/tech:text-white">
                        {tech.name}
                      </span>

                      {tech.favorite && (
                        <Heart
                          className="relative h-3.5 w-3.5 shrink-0 fill-rose-400 text-rose-400 transition-transform duration-300 group-hover/tech:scale-125"
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
          <div className="card-interactive mt-4 p-5 sm:p-6">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
              <span className="h-4 w-1 rounded-full bg-accent" />
              Ways of Working
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
  );
};
