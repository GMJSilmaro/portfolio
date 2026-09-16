'use client'

import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const chapters = [
  { id: 'hero', label: 'Cover', code: '00' },
  { id: 'about', label: 'Subject', code: '01' },
  { id: 'projects', label: 'Cases', code: '02' },
  { id: 'skills', label: 'Stack', code: '03' },
  { id: 'contact', label: 'Clearance', code: '04' },
] as const

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setIsScrolled(scrolled > 40)
      setScrollProgress(height > 0 ? Math.min(scrolled / height, 1) : 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-42% 0px', threshold: 0 }
    )

    chapters.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[110] transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'border-b border-[color:var(--rule)] bg-paper/90 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:pl-28">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('hero')
            }}
            className="group font-display text-xl font-semibold tracking-tight text-ink"
          >
            GMJ
            <span className="text-signal transition-all duration-300 group-hover:tracking-[0.35em]">
              .
            </span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
              Dossier · GMJ-2026
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('contact')
              }}
              className="inline-flex min-h-[40px] items-center border border-ink bg-ink px-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-signal hover:border-signal"
            >
              Open Clearance
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center border border-[color:var(--rule)] text-ink transition-colors hover:border-signal/40 md:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div
          className="h-0.5 origin-left bg-signal transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />

        <div
          className={`overflow-hidden border-b border-[color:var(--rule)] bg-paper/98 transition-[max-height,opacity] duration-300 md:hidden ${
            isMobileMenuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="space-y-1 px-4 py-3">
            {chapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(chapter.id)
                }}
                className={`flex min-h-[44px] items-center gap-3 px-3 font-medium transition-colors ${
                  activeSection === chapter.id
                    ? 'bg-white text-ink'
                    : 'text-ink-soft active:bg-white/70'
                }`}
              >
                <span className="w-6 font-mono text-[11px] text-signal">{chapter.code}</span>
                {chapter.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Desktop chapter rail */}
      <aside className="pointer-events-none fixed bottom-8 left-6 top-24 z-[100] hidden w-16 flex-col justify-between lg:flex">
        <nav className="pointer-events-auto flex flex-col gap-3">
          {chapters.map((chapter) => {
            const active = activeSection === chapter.id
            return (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(chapter.id)
                }}
                className="group flex items-center gap-3"
                aria-current={active ? 'true' : undefined}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                    active
                      ? 'animate-rail-pulse border-signal bg-signal'
                      : 'border-ink/25 bg-transparent group-hover:border-signal'
                  }`}
                />
                <span
                  className={`origin-left font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                    active
                      ? 'translate-x-0 text-ink opacity-100'
                      : '-translate-x-1 text-ink-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }`}
                >
                  {chapter.label}
                </span>
              </a>
            )
          })}
        </nav>
        <div className="pointer-events-none h-24 w-px self-start bg-gradient-to-b from-signal/50 to-transparent ml-[4px]" />
      </aside>
    </>
  )
}
