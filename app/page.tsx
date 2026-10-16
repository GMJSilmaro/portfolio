'use client'

import React from 'react'
import { Cover } from './components/studio/Cover'
import { StudioProvider } from './components/studio/StudioContext'
import { StudioShell } from './components/studio/StudioShell'

const Home = () => {
  return (
    <StudioProvider>
      <div className="min-h-screen bg-paper">
        <main className="mx-auto w-full min-w-0 max-w-[var(--dossier-max)] bg-white xl:border-x xl:border-[color:var(--rule)]">
          <Cover />
          <StudioShell />
        </main>
      </div>
    </StudioProvider>
  )
}

export default Home
