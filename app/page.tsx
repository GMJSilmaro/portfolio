'use client'

import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1b2a] via-[#111827] to-[#0f172a] text-white selection:bg-purple-500/30 selection:text-white">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

export default Home;