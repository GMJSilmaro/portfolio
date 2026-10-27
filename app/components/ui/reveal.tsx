'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { dossierEase } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current

    if (!element || typeof IntersectionObserver === 'undefined' || reduceMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    )

    observer.observe(element)

    const fallback = window.setTimeout(() => setIsVisible(true), 2000)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [reduceMotion])

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y: 18 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, delay: delay / 1000, ease: dossierEase }}
    >
      {children}
    </motion.div>
  )
}
