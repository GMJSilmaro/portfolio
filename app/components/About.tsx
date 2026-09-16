import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';

export const About = () => {
  const workExperience = [
    {
      title: 'Software Engineer',
      company: 'Pixelcare Consulting',
      location: 'Remote',
      period: 'Dec 2023 — Present',
      description: [
        'Built FSM Field Management System portal with mobility using Next.js, React Native Expo, and Firebase',
        'Shipped e-Invoice middleware with LHDN SDK for tax compliance and digital invoicing',
        'Migrated a legacy system into a production ASP.NET web application'
      ]
    },
    {
      title: 'Fullstack Developer',
      company: 'EonBiz Technology',
      location: 'On-site',
      period: 'Aug 2021 — Oct 2023',
      description: [
        'Delivered school management systems, student portal, and parents portal in C#',
        'Led and mentored a web development team through delivery timelines',
        'Produced documentation and kept projects on schedule'
      ]
    },
    {
      title: 'Freelance Developer',
      company: 'Self-Employed',
      location: 'Remote',
      period: 'Nov 2023 — Dec 2023',
      description: [
        'Built a Laravel 10 TALL-stack app with fingerprint biometric scanning',
        'Added events, profiles, and report generation workflows'
      ]
    },
    {
      title: 'Freelance Developer',
      company: 'Caravan & 1Export',
      location: 'Remote',
      period: 'Jan 2021 — Jun 2021',
      description: [
        'Crafted landing and login experiences with Laravel and Vue.js'
      ]
    },
    {
      title: 'Game Developer',
      company: 'Self-Employed',
      location: 'Remote',
      period: 'Jun 2017 — May 2018',
      description: [
        'Developed an Android learning game for dyslexic children with Unity, Firebase, and C#'
      ]
    },
    {
      title: 'Graphic Designer',
      company: 'Love Radio Davao',
      location: 'On-site',
      period: 'Oct 2015 — May 2017',
      description: [
        'Produced posters and social graphics aligned with brand guidelines'
      ]
    }
  ];

  return (
    <section id="about" className="border-t border-white/10 bg-navy-900/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">01 — About</p>
          <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Experience that ships
          </h2>
          <p className="text-slate-400">
            Education and roles that shaped how I design, build, and deliver software.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-white/10 bg-navy-900 p-5 transition-colors hover:border-accent/30 sm:p-6">
          <div className="mb-3 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-navy-800">
              <GraduationCap className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                BS in Information Technology
              </h3>
              <p className="text-sm text-accent-soft">Interface Computer College</p>
            </div>
          </div>
          <ul className="space-y-2 pl-0 sm:pl-[3.25rem]">
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

        <div className="relative space-y-4 border-l border-white/10 pl-5 sm:pl-7">
          {workExperience.map((job, index) => (
            <article key={index} className="relative">
              <span className="absolute -left-[1.66rem] top-5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-navy-950 sm:-left-[2.15rem]" />
              <div className="rounded-2xl border border-white/10 bg-navy-900 p-5 transition-colors hover:border-accent/30 sm:p-6">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 shrink-0 text-accent" />
                      <h3 className="text-base font-semibold text-white sm:text-lg">{job.title}</h3>
                    </div>
                    <p className="text-sm text-slate-300">{job.company}</p>
                    <p className="text-xs text-slate-500 sm:text-sm">{job.period}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-navy-800 px-2.5 py-1 text-xs text-slate-300">
                    {job.location}
                  </span>
                </div>
                <ul className="space-y-2">
                  {job.description.map((achievement, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-400">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
