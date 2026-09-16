'use client'

import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-5 z-[120] flex h-11 w-11 items-center justify-center border border-[color:var(--rule)] bg-paper text-ink shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-signal hover:text-signal"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}
