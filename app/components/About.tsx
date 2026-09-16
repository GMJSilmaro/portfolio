import React from 'react';
import { Briefcase, GraduationCap, Mail, Github, Building } from 'lucide-react';

export const About = () => {
  const workExperience = [
    {
      title: 'Software Engineer',
      company: 'Pixelcare Consulting',
      location: 'Remote',
      period: 'December 2023 - Present',
      description: [
        'Developed a web application for FSM, Field Management System Portal, with Mobility and Integration using NextJs, React Native Expo, Firebase',
        'Created a web application for e-Invoice and integrated LHDN SDK for tax compliance and digital invoicing',
        'Migrated a software system into a fully functional web application using ASP.NET'
      ]
    },
    {
      title: 'Fullstack Developer',
      company: 'EonBiz Technology',
      location: 'On-site',
      period: 'August 2021 - October 2023',
      description: [
        'Developed and implemented a comprehensive school management system and campaigns',
        'Provided leadership and mentorship for a high-performing web development team',
        'Created web applications like Student Portal and Parents Portal using C#',
        'Oversaw development timeline and produced comprehensive documentation'
      ]
    },
    {
      title: 'Freelance Developer',
      company: 'Self-Employed',
      location: 'Remote',
      period: 'November 2023 - December 2023',
      description: [
        'Developed a Laravel 10 web app with TALL stack featuring fingerprint biometric scanner',
        'Created functionalities for events, student/officer profiles, and report generation'
      ]
    },
    {
      title: 'Freelance Developer',
      company: 'Caravan & 1Export',
      location: 'Remote',
      period: 'January 2021 - June 2021',
      description: [
        'Crafted Landing Page and Login Page utilizing Laravel and Vue.js'
      ]
    },
    {
      title: 'Game Developer',
      company: 'Self-Employed',
      location: 'Remote',
      period: 'June 2017 - May 2018',
      description: [
        'Developed an Android game for dyslexic children using UNITY Engine, Firebase and C#'
      ]
    },
    {
      title: 'Graphic Designer',
      company: 'Love Radio Davao',
      location: 'On-site',
      period: 'October 2015 - May 2017',
      description: [
        'Produced advertising materials including posters and social media graphics',
        'Ensured design and branding aligned with company image and message'
      ]
    }
  ];

  return (
    <section id="about" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            About
          </p>
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Experience
          </h2>
          <p className="text-slate-400">
            A concise timeline of education, roles, and the work I&apos;ve shipped along the way.
          </p>
        </div>

        <div className="mb-10 rounded-xl border border-white/10 bg-navy-900 p-6">
          <div className="mb-3 flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold text-white">
              BS in Information Technology
            </h3>
          </div>
          <p className="mb-4 text-sm text-accent-soft">Interface Computer College</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Specialized in software development and system architecture
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Achieved academic excellence with recognition and specialized in modern web technologies
            </li>
          </ul>
        </div>

        <div className="relative space-y-6 border-l border-white/10 pl-6 sm:pl-8">
          {workExperience.map((job, index) => (
            <article key={index} className="relative">
              <span className="absolute -left-[1.9rem] top-2 h-2.5 w-2.5 rounded-full border-2 border-accent bg-navy-950 sm:-left-[2.4rem]" />
              <div className="rounded-xl border border-white/10 bg-navy-900 p-6">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-accent" />
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                    </div>
                    <p className="text-sm text-slate-300">{job.company}</p>
                    <p className="text-sm text-slate-500">{job.period}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-navy-800 px-3 py-1 text-xs text-slate-300">
                    {job.location}
                  </span>
                </div>
                <ul className="space-y-2">
                  {job.description.map((achievement, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-400">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-white/10 bg-navy-900 p-8">
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-2xl font-semibold text-white">
              Open to collaboration
            </h3>
            <p className="mx-auto max-w-lg text-sm text-slate-400">
              Whether you have a project in mind or just want to connect, I&apos;m open to new opportunities and conversations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: Mail, label: 'Email', value: 'gmjsilmaro03@gmail.com', href: 'mailto:gmjsilmaro03@gmail.com' },
              { icon: Github, label: 'GitHub', value: 'gmjsilmaro', href: 'https://github.com/gmjsilmaro' },
              { icon: Building, label: 'LinkedIn', value: 'gmjsilmaro', href: 'https://linkedin.com/in/gmjsilmaro' },
            ].map((contact, i) => (
              <a
                key={i}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-navy-800 p-4 transition-colors hover:border-accent/40"
              >
                <contact.icon className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-xs text-slate-500">{contact.label}</p>
                  <p className="text-sm text-slate-200">{contact.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
