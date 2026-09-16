import React from 'react';
import { Briefcase, GraduationCap, UserRound } from 'lucide-react';
import { Reveal } from './ui/reveal';

export const About = () => {
  const workExperience = [
    {
      title: 'Technical Lead Consultant',
      company: 'Pixelcare Consulting',
      location: 'Remote',
      period: '2026 — Present',
      description: [
        'Lead and coordinate software development across multiple concurrent client projects',
        'Provide technical guidance, mentoring, and code review for the development team',
        'Design scalable web and mobile applications and enterprise system integrations',
        'Manage Docker-based environments, Traefik routing, SSL, and Ubuntu/Linux deployments',
        'Implement CI/CD pipelines with GitHub Actions and container workflows via GHCR',
        'Operate production databases and services including PostgreSQL and Redis',
        'Review system architecture, security, performance, and infrastructure requirements'
      ]
    },
    {
      title: 'Software Engineer',
      company: 'Pixelcare Consulting',
      location: 'Remote',
      period: '2023 — 2026',
      description: [
        'Built a Field Service Management System for scheduling, dispatch, worker and customer management',
        'Built a technician mobile app with job tracking, digital signatures, photo documentation, and clock in/out',
        'Developed e-Invoice middleware integrating LHDN with enterprise systems for digital invoicing',
        'Developed REST APIs and integrated third-party services and enterprise platforms',
        'Worked across Next.js, React, React Native, Node.js, Firebase, TypeScript, SQL, SAP B1, and the LHDN SDK',
        'Prepared technical documentation and supported users through system implementation'
      ]
    },
    {
      title: 'Web Developer',
      company: 'Blue Ocean Data Solutions',
      location: 'On-site',
      period: '2023',
      description: [
        'Migrated and modernized legacy applications into production ASP.NET web applications',
        'Implemented authentication, data management, reporting, dashboards, and business workflows',
        'Performed system testing, debugging, troubleshooting, and performance optimization'
      ]
    },
    {
      title: 'Fullstack Developer',
      company: 'Eonbotz Technology',
      location: 'On-site',
      period: '2021 — 2023',
      description: [
        'Developed school management systems, student portals, and parent portals using C#',
        'Built and maintained fullstack web applications from business requirements',
        'Led and mentored web developers through project implementation',
        'Planned development tasks, monitored delivery timelines, and prepared documentation'
      ]
    },
    {
      title: 'Freelance Developer',
      company: 'Self-Employed',
      location: 'Remote',
      period: '2023',
      description: [
        'Developed a Laravel 10 TALL-stack application with fingerprint biometric scanning',
        'Implemented event and user profile management features',
        'Built report generation and reporting workflows end to end'
      ]
    },
    {
      title: 'Freelance Developer',
      company: 'Caravan & 1Export',
      location: 'Remote',
      period: '2021',
      description: [
        'Developed and maintained web applications using Laravel and Vue.js',
        'Designed responsive landing pages and login interfaces',
        'Communicated directly with clients on requirements and changes'
      ]
    },
    {
      title: 'Game Developer',
      company: 'Self-Employed',
      location: 'Remote',
      period: '2017 — 2018',
      description: [
        'Developed an Android educational game for children with dyslexia',
        'Built game mechanics and interactive learning activities using Unity and C#',
        'Integrated Firebase for application data and backend functionality'
      ]
    },
    {
      title: 'Graphic Designer',
      company: 'Love Radio Davao',
      location: 'On-site',
      period: '2015',
      description: [
        'Produced posters and social graphics aligned with brand guidelines',
        'Designed layouts for events, promotions, and social media posts',
        'Coordinated with DJs, sales, and station management on design requirements'
      ]
    }
  ];

  return (
    <section id="about" className="border-t border-white/10 bg-navy-900/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="mb-10 max-w-2xl">
          <p className="section-kicker">01 — About</p>
          <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Experience that ships
          </h2>
          <p className="text-slate-400">
            A decade of design and engineering, now focused on leading enterprise software delivery.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="card-interactive group mb-4 p-5 sm:p-6">
            <div className="mb-3 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-navy-800 transition-colors group-hover:border-accent/40 group-hover:bg-navy-700">
                <UserRound className="h-5 w-5 text-accent" />
              </div>
              <h3 className="pt-2 text-lg font-semibold text-white">Professional Summary</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 sm:pl-[3.25rem]">
              Technical Lead Consultant and Software Engineer with experience across software
              development, system integration, and enterprise solutions. I work end to end on
              fullstack applications, SAP Business One integration, e-Invoice systems, API
              development, databases, Docker, and CI/CD — leading technical projects, resolving
              complex system issues, and delivering solutions businesses depend on.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="card-interactive group mb-8 p-5 sm:p-6">
            <div className="mb-3 flex items-start gap-3">
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
        </Reveal>

        <div className="relative space-y-4 border-l border-white/10 pl-5 sm:pl-7">
          {workExperience.map((job, index) => (
            <Reveal key={`${job.company}-${job.period}`} delay={index * 60}>
              <article className="group relative">
                <span className="absolute -left-[1.66rem] top-5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-navy-950 transition-transform duration-300 group-hover:scale-150 sm:-left-[2.15rem]" />
                <div className="card-interactive p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="mb-1 flex items-center gap-2">
                        <Briefcase className="h-4 w-4 shrink-0 text-accent" />
                        <h3 className="text-base font-semibold text-white sm:text-lg">{job.title}</h3>
                      </div>
                      <p className="text-sm text-slate-300">{job.company}</p>
                      <p className="text-xs text-slate-500 sm:text-sm">{job.period}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-navy-800 px-2.5 py-1 text-xs text-slate-300 transition-colors group-hover:border-accent/40">
                      {job.location}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {job.description.map((achievement, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500 transition-colors group-hover:bg-accent" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
