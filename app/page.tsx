'use client'

import React from 'react'
import { Cover } from './components/studio/Cover'
import { StudioProvider } from './components/studio/StudioContext'
import { StudioShell } from './components/studio/StudioShell'

const Home = () => {
  return (
    <StudioProvider>
      <div className="bg-ink">
        <Cover />
        <StudioShell />
      </div>
    </StudioProvider>
  )
}

export default Home
