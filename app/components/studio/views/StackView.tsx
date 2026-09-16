'use client'

import React, { useMemo, useState } from 'react'
import { Heart } from 'lucide-react'
import { favoriteCount, techCategories } from '../../../data/tech-stack'
import { Reveal } from '../../ui/reveal'

export function StackView() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  const categories = useMemo(
    () => ['All', ...techCategories.map((group) => group.category)],
    []
  )

  const items = useMemo(() => {
    const flat = techCategories.flatMap((group) =>
      group.items.map((item) => ({ ...item, category: group.category }))
    )
    return flat.filter((item) => {
      if (favoritesOnly && !item.favorite) return false
      if (activeCategory !== 'All' && item.category !== activeCategory) return false
      return true
    })
  }, [activeCategory, favoritesOnly])

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-[color:var(--rule)] px-6 py-8 sm:px-10 sm:py-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal">Stack</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Tools on the bench.
          </h2>
          <p className="mt-3 max-w-lg text-ink-muted">
            Brand icons for every language, framework, and platform I use. Hearts mark daily
            comfort.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFavoritesOnly((v) => !v)}
            aria-pressed={favoritesOnly}
            className={`inline-flex items-center gap-2 border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
              favoritesOnly
                ? 'border-rose-300 bg-rose-50 text-rose-700'
                : 'border-[color:var(--rule)] text-ink-muted hover:text-ink'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${favoritesOnly ? 'fill-rose-500 text-rose-500' : ''}`} />
            Favourites ({favoriteCount})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                activeCategory === category
                  ? 'border-ink bg-ink text-paper'
                  : 'border-[color:var(--rule)] text-ink-muted hover:border-ink/30 hover:text-ink'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {items.map((tech) => {
            const key = `${tech.category}-${tech.name}`
            const isHot = hovered === key
            return (
              <button
                key={key}
                type="button"
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(key)}
                onBlur={() => setHovered(null)}
                className="group relative flex aspect-square flex-col items-center justify-center gap-2 border border-[color:var(--rule)] bg-white/80 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_18px_40px_-28px_rgba(13,110,86,0.55)]"
                aria-label={tech.name}
              >
                <tech.icon
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9"
                  style={{ color: tech.color }}
                />
                {tech.favorite && (
                  <Heart className="absolute right-2 top-2 h-3 w-3 fill-rose-500 text-rose-500" />
                )}
                <span
                  className={`pointer-events-none absolute inset-x-1 bottom-1 truncate text-center font-mono text-[9px] uppercase tracking-[0.08em] transition-opacity sm:text-[10px] ${
                    isHot ? 'opacity-100 text-ink' : 'opacity-0 text-ink-muted sm:opacity-70'
                  }`}
                >
                  {tech.name}
                </span>
              </button>
            )
          })}
        </div>

        {hovered && (
          <div className="pointer-events-none fixed bottom-6 left-1/2 z-20 hidden -translate-x-1/2 border border-[color:var(--rule)] bg-ink px-4 py-2 font-mono text-xs tracking-[0.14em] text-paper md:block">
            {hovered.split('-').slice(1).join('-')}
          </div>
        )}
      </div>
    </div>
  )
}
