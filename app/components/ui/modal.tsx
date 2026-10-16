'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  subtitle?: string
  /** Dark shell for image lightbox */
  tone?: 'panel' | 'ink'
  labelledBy?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  tone = 'panel',
  labelledBy,
}) => {
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const titleId = useId()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    previousFocus.current = document.activeElement as HTMLElement | null

    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`
    }

    const focusInitial = window.requestAnimationFrame(() => {
      closeRef.current?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)

      if (focusable.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          event.preventDefault()
          last.focus()
        }
      } else if (active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusInitial)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      previousFocus.current?.focus?.()
    }
  }, [isOpen, onClose])

  if (!mounted || !isOpen) return null

  const labelId = labelledBy ?? (title ? titleId : undefined)
  const shell =
    tone === 'ink'
      ? 'border-white/10 bg-ink text-paper'
      : 'border-[color:var(--rule)] bg-panel text-ink'

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-ink/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        tabIndex={-1}
        className={`relative flex max-h-[min(92dvh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-lg border shadow-[0_24px_80px_-32px_rgba(0,0,0,0.55)] outline-none ${shell}`}
      >
        <header
          className={`flex shrink-0 items-start justify-between gap-4 border-b px-4 py-3 sm:px-5 ${
            tone === 'ink' ? 'border-white/10' : 'border-[color:var(--rule)] bg-white/70'
          }`}
        >
          <div className="min-w-0 pr-2">
            {subtitle ? (
              <p
                className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                  tone === 'ink' ? 'text-signal-soft' : 'text-signal'
                }`}
              >
                {subtitle}
              </p>
            ) : null}
            {title ? (
              <h2
                id={titleId}
                className={`truncate font-display text-lg font-medium sm:text-xl ${
                  tone === 'ink' ? 'text-paper' : 'text-ink'
                }`}
              >
                {title}
              </h2>
            ) : (
              <span className="sr-only" id={titleId}>
                Dialog
              </span>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-colors ${
              tone === 'ink'
                ? 'border-white/20 text-paper hover:border-white/50'
                : 'border-[color:var(--rule)] bg-white text-ink hover:border-signal/40'
            }`}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}
