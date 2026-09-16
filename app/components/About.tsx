import React from 'react';
import { GraduationCap, UserRound } from 'lucide-react';
import { Reveal } from './ui/reveal';
import { Timeline } from './Timeline';

export const About = () => {
  return (
    <section id="about" className="border-t border-white/10 bg-navy-900/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="mb-10 max-w-2xl">
          <p className="section-kicker">01 — About</p>
          <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Experience
          </h2>
          <p className="text-slate-400">
            The timeline of my professional journey — the systems I have shipped and the skills
            sharpened along the way.
          </p>
        </Reveal>

        <div className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Reveal delay={60}>
            <div className="card-interactive group h-full p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-navy-800 transition-colors group-hover:border-accent/40 group-hover:bg-navy-700">
                  <UserRound className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white">Professional Summary</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Technical Lead Consultant and Software Engineer with experience across software
                development, system integration, and enterprise solutions. I work end to end on
                fullstack applications, SAP Business One integration, e-Invoice systems, API
                development, databases, Docker, and CI/CD — leading technical projects, resolving
                complex system issues, and delivering solutions businesses depend on.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card-interactive group h-full p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-navy-800 transition-colors group-hover:border-accent/40 group-hover:bg-navy-700">
                  <GraduationCap className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    BS in Information Technology
                  </h3>
                  <p className="text-sm text-accent-soft">Interface Computer College · 2021</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm text-slate-400">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  Specialized in software development and system architecture
                </li>
                <li className="flex gap-2 text-sm text-slate-400">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  Focused on modern web technologies with academic recognition
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Timeline />
      </div>
    </section>
  );
};
