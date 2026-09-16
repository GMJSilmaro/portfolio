import React from 'react';
import Image from 'next/image';

export const Hero = () => {
  const techChips = ['React', 'Next.js', 'React Native', 'Node.js', 'Firebase', 'TypeScript'];

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-page-wash" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
        {/* Mobile-first: photo on top */}
        <div className="mb-8 flex justify-center md:hidden">
          <div className="relative">
            <div className="absolute -inset-3 rounded-2xl bg-accent/15 blur-2xl" aria-hidden />
            <div className="relative h-36 w-36 overflow-hidden rounded-2xl border border-white/15 bg-navy-800 shadow-xl sm:h-44 sm:w-44">
              <Image
                src="./images/Profile.jpg"
                alt="Gilbert Michael Jay Silmaro"
                fill
                className="object-cover"
                style={{ objectPosition: '50% 20%' }}
                priority
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <div className="text-center md:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-xs font-medium tracking-wide text-accent-soft">
                Available for projects
              </span>
            </div>

            <h1 className="mb-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              Gilbert Michael
              <span className="mt-1 block text-accent">Jay Silmaro</span>
            </h1>

            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 sm:text-sm">
              Software Engineer · Fullstack Developer
            </p>

            <p className="mx-auto mb-7 max-w-lg text-base leading-relaxed text-slate-400 md:mx-0 sm:text-lg">
              I build reliable web and mobile products end to end — from polished UI to solid APIs —
              with <span className="font-medium text-white">4+ years</span> shipping production systems
              for businesses.
            </p>

            <div className="mb-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href="#projects"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-navy-950 transition-opacity hover:opacity-90"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                Contact
              </a>
            </div>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {techChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-md border border-white/10 bg-navy-900 px-2.5 py-1 text-xs text-slate-300"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mx-auto grid max-w-md grid-cols-3 gap-3 md:mx-0 md:max-w-none">
              {[
                { value: '4+', label: 'Years Exp.' },
                { value: '3', label: 'Featured Apps' },
                { value: 'Web+Mobile', label: 'Stack Focus' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-navy-900/80 px-3 py-3 text-center"
                >
                  <p className="text-sm font-semibold text-white sm:text-base">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop portrait */}
          <div className="relative hidden justify-end md:flex">
            <div className="absolute right-6 top-8 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden />
            <div className="relative h-80 w-80 overflow-hidden rounded-2xl border border-white/15 bg-navy-800 shadow-2xl lg:h-[26rem] lg:w-[26rem]">
              <Image
                src="./images/Profile.jpg"
                alt="Gilbert Michael Jay Silmaro"
                fill
                className="object-cover"
                style={{ objectPosition: '50% 20%' }}
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 to-transparent p-5">
                <p className="text-sm font-medium text-white">Fullstack Developer</p>
                <p className="text-xs text-slate-300">React · Next.js · React Native</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
