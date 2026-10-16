'use client'

import React, { useMemo, useState } from 'react'
import { Heart } from 'lucide-react'
import { favoriteCount, techCategories } from '@/app/data/tech-stack'
import { Reveal } from '../../ui/reveal'
import { Chapter, ChapterHeader, TechTile } from '../layout'

export function StackView() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [favoritesOnly, setFavoritesOnly] = useState(false)

  const categories = useMemo(
    () => ['All', ...techCategories.map((group) => group.category)],
    []
  )

  const groups = useMemo(() => {
    return techCategories
      .map((group) => ({
        category: group.category,
        items: group.items.filter((item) => {
          if (favoritesOnly && !item.favorite) return false
          if (activeCategory !== 'All' && group.category !== activeCategory) return false
          return true
        }),
      }))
      .filter((group) => group.items.length > 0)
  }, [activeCategory, favoritesOnly])

  const showGroupLabels = groups.length > 1

  return (
    <Chapter>
      <Reveal>
        <ChapterHeader
          kicker="Stack"
          title="Tools on the bench."
          lede="Brand icons for every language, framework, and platform I use. Hearts mark daily comfort."
        />
      </Reveal>

      <div className="flex max-w-full flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFavoritesOnly((value) => !value)}
          aria-pressed={favoritesOnly}
          className={`inline-flex min-h-11 items-center gap-2 border px-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
            favoritesOnly
              ? 'border-rose-300 bg-rose-50 text-rose-700'
              : 'border-[color:var(--rule)] text-ink-muted hover:text-ink'
          }`}
        >
          <Heart className={`h-3.5 w-3.5 ${favoritesOnly ? 'fill-rose-500 text-rose-500' : ''}`} />
          Favourites ({favoriteCount})
        </button>
        {categories.map((category) => {
          const active = activeCategory === category
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={active}
              className={`inline-flex min-h-11 max-w-full items-center border px-3 text-left font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                active
                  ? 'border-ink bg-ink text-paper'
                  : 'border-[color:var(--rule)] text-ink-muted hover:border-ink/30 hover:text-ink'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      <div className="mt-8 space-y-10">
        {groups.map((group) => (
          <section key={group.category} aria-label={group.category}>
            {showGroupLabels ? (
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                {group.category}
              </h3>
            ) : null}
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {group.items.map((tech) => (
                <li key={`${group.category}-${tech.name}`}>
                  <TechTile
                    name={tech.name}
                    color={tech.color}
                    icon={tech.icon}
                    favorite={tech.favorite}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}

      </div>
    </Chapter>
  )
}
