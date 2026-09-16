'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type StudioMode = 'profile' | 'career' | 'work' | 'stack'

interface StudioContextValue {
  entered: boolean
  mode: StudioMode
  enter: () => void
  setMode: (mode: StudioMode) => void
}

const StudioContext = createContext<StudioContextValue | null>(null)

export function useStudio() {
  const ctx = useContext(StudioContext)
  if (!ctx) throw new Error('useStudio must be used within StudioProvider')
  return ctx
}

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false)
  const [mode, setModeState] = useState<StudioMode>('profile')

  const enter = useCallback(() => {
    setEntered(true)
    window.requestAnimationFrame(() => {
      document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [])

  const setMode = useCallback((next: StudioMode) => {
    setModeState(next)
    document.getElementById('studio-stage')?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const value = useMemo(
    () => ({ entered, mode, enter, setMode }),
    [entered, mode, enter, setMode]
  )

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
}

export const MODE_META: Record<
  StudioMode,
  { label: string; code: string; hint: string }
> = {
  profile: { label: 'Profile', code: '01', hint: 'Who I am' },
  career: { label: 'Career', code: '02', hint: 'Where I worked' },
  work: { label: 'Work', code: '03', hint: 'What I shipped' },
  stack: { label: 'Stack', code: '04', hint: 'How I build' },
}
