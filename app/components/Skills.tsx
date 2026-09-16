import React from 'react';
import { Reveal } from './ui/reveal';

export const Skills = () => {
  const mainSkills = [
    {
      category: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'C#', 'PHP', 'Python', 'SQL']
    },
    {
      category: 'Frontend & Mobile',
      skills: ['React', 'Next.js', 'React Native', 'Expo', 'Vue.js', 'TailwindCSS', 'Bootstrap']
    },
    {
      category: 'Backend & APIs',
      skills: ['Node.js', 'Express.js', 'ASP.NET', 'Laravel', 'REST APIs', 'OAuth', 'Webhooks']
    },
    {
      category: 'Databases',
      skills: ['MS-SQL', 'HANA DB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase']
    },
    {
      category: 'DevOps & Infrastructure',
      skills: ['Docker', 'Docker Compose', 'Traefik', 'GitHub Actions', 'GHCR', 'Ubuntu', 'SUSE Linux', 'Git']
    },
    {
      category: 'Enterprise & Reporting',
      skills: ['SAP B1 Service Layer', 'SAGE X3', 'NetSuite', 'LHDN SDK', 'SSRS', 'Crystal Reports', 'Power BI', 'BI360']
    }
  ];

  const focusAreas = [
    'Technical Leadership',
    'System Integration',
    'Fullstack Development',
    'DevOps & Deployment'
  ];

  const softSkills = [
    'Technical Mentoring',
    'Code Review',
    'Solution Architecture',
    'Project Delivery',
    'Agile Development',
    'Clean Code',
    'Performance Optimization',
    'Troubleshooting',
    'Technical Documentation',
    'Stakeholder Communication'
  ];

  return (
    <section id="skills" className="border-t border-white/10 bg-navy-900/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="mb-10 max-w-2xl">
          <p className="section-kicker">03 — Skills</p>
          <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Technical Toolkit
          </h2>
          <p className="text-slate-400">
            Languages, platforms, and infrastructure I use to deliver enterprise software.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mb-8 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="cursor-default rounded-full border border-accent/35 bg-accent/10 px-3.5 py-1.5 text-sm text-accent-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/70 hover:text-white"
              >
                {area}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mainSkills.map((category, index) => (
            <Reveal key={category.category} delay={index * 70}>
              <div className="card-interactive h-full p-5 sm:p-6">
                <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
                  <span className="h-4 w-1 rounded-full bg-accent" />
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="chip cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="card-interactive mt-4 p-5 sm:p-6">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
              <span className="h-4 w-1 rounded-full bg-accent" />
              Ways of Working
            </h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span key={skill} className="chip cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
