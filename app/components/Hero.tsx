import React from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowDown, Download } from 'lucide-react';

export const Hero = () => {
  const techChips = ['Next.js', 'React Native', 'Node.js', 'SAP B1', 'Docker', 'TypeScript'];

  const stats = [
    { value: '5+', label: 'Years Exp.' },
    { value: '12+', label: 'Enterprise Clients' },
    { value: 'Lead', label: 'Technical Role' },
  ];

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-page-wash" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid-navy" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
        {/* Mobile-first: portrait on top */}
        <div className="mb-8 flex justify-center md:hidden">
          <div className="animate-fade-up relative">
            <div className="animate-float-slow absolute -inset-3 rounded-2xl bg-accent/20 blur-2xl" aria-hidden />
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
            <div
              className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 transition-colors hover:border-accent/60"
              style={{ animationDelay: '60ms' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-xs font-medium tracking-wide text-accent-soft">
                Available for consulting
              </span>
            </div>

            <h1
              className="animate-fade-up mb-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
              style={{ animationDelay: '120ms' }}
            >
              Gilbert Michael
              <span className="mt-1 block text-accent">Jay Silmaro</span>
            </h1>

            <p
              className="animate-fade-up mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 sm:text-sm"
              style={{ animationDelay: '180ms' }}
            >
              Technical Lead Consultant · Software Engineer
            </p>

            <p
              className="animate-fade-up mx-auto mb-7 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg md:mx-0"
              style={{ animationDelay: '240ms' }}
            >
              I lead technical delivery for enterprise software —{' '}
              <span className="font-medium text-white">SAP Business One</span> integrations,
              e-Invoice compliance platforms, and Dockerised deployments — with{' '}
              <span className="font-medium text-white">5+ years</span> building web and mobile
              systems that businesses run on daily.
            </p>

            <div
              className="animate-fade-up mb-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
              style={{ animationDelay: '300ms' }}
            >
              <a
                href="#projects"
                className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-navy-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30"
              >
                View Work
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="./Gilbert-Michael-Jay-Silmaro-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-white/20 px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-white/5"
              >
                <Download className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-[46px] items-center justify-center rounded-lg px-4 text-sm font-semibold text-slate-300 transition-colors duration-200 hover:text-accent"
              >
                Contact Me
              </a>
            </div>

            <div
              className="animate-fade-up mb-6 flex flex-wrap items-center justify-center gap-2 md:justify-start"
              style={{ animationDelay: '360ms' }}
            >
              {techChips.map((chip) => (
                <span key={chip} className="chip text-xs">
                  {chip}
                </span>
              ))}
            </div>

            <div
              className="animate-fade-up mx-auto grid max-w-md grid-cols-3 gap-3 md:mx-0 md:max-w-none"
              style={{ animationDelay: '420ms' }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-navy-900/80 px-3 py-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
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
            <div className="animate-float-slow absolute right-6 top-8 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden />
            <div className="animate-fade-up group relative h-80 w-80 overflow-hidden rounded-2xl border border-white/15 bg-navy-800 shadow-2xl transition-all duration-500 hover:border-accent/40 lg:h-[26rem] lg:w-[26rem]">
              <Image
                src="./images/Profile.jpg"
                alt="Gilbert Michael Jay Silmaro"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: '50% 20%' }}
                priority
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-navy-950/90 to-transparent p-5 transition-transform duration-500 group-hover:translate-y-0">
                <p className="text-sm font-medium text-white">Technical Lead Consultant</p>
                <p className="text-xs text-slate-300">SAP B1 · Next.js · React Native</p>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="mt-14 hidden items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-accent md:flex"
        >
          Scroll to explore
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
