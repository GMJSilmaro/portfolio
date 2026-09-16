import React from 'react';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section id="hero" className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-28">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-navy-800 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs font-medium tracking-wide text-slate-300">
                Currently Employed
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Gilbert Michael
              <span className="mt-1 block text-accent">Jay Silmaro</span>
            </h1>

            <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
              Software Engineer · Fullstack Developer
            </p>

            <p className="max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Programming has been my passion since I was a student, and I have been
              honing my skills as a Software Engineer for almost{' '}
              <span className="font-medium text-white">4+ years</span>. I specialize in{' '}
              <span className="font-medium text-white">React / React Native / Next.js</span>,{' '}
              <span className="font-medium text-white">Node.js / Express</span>,{' '}
              <span className="font-medium text-white">Firebase</span>, and cloud technologies —
              focused on building clear, reliable digital products.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-navy-950 transition-opacity hover:opacity-90"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="rounded-md border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/5"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-white/10 bg-navy-800 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <Image
                src="./images/Profile.jpg"
                alt="Gilbert Michael Jay Silmaro"
                fill
                className="object-cover"
                style={{ objectPosition: '50% 50%' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
