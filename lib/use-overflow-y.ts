'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Apply overflow-y:auto only while content actually overflows.
 * Avoids idle scroll containers that trap the mouse wheel.
 */
export function useOverflowYWhenNeeded<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [overflowY, setOverflowY] = useState<'visible' | 'auto'>('visible')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof ResizeObserver === 'undefined') return

    const sync = () => {
      const needsScroll = node.scrollHeight > node.clientHeight + 1
      setOverflowY(needsScroll ? 'auto' : 'visible')
    }

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(node)
    window.addEventListener('resize', sync)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [])

  return { ref, overflowY }
}
