import React from 'react';
import { Reveal } from './ui/reveal';

export const Skills = () => {
  const mainSkills = [
    {
      category: 'Programming Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'C#', 'PHP', 'C++']
    },
    {
      category: 'Frontend & Mobile',
      skills: ['React', 'Next.js', 'React Native', 'Angular', 'Vue.js', 'HTML5', 'CSS3', 'SASS', 'TailwindCSS', 'Bootstrap']
    },
    {
      category: 'Backend & Database',
      skills: ['Node.js', 'Express.js', 'Laravel', 'Symfony', 'CodeIgniter', 'Firebase', 'MySQL', 'MSSQL', 'SQLite', 'MariaDB']
    },
    {
      category: 'Tools & Platforms',
      skills: ['Git', 'Docker', 'AWS', 'Postman', 'Linux', 'VS Code', 'Figma', 'Android Studio', 'Unity', 'Unreal Engine']
    }
  ];

  const focusAreas = [
    'Frontend Development',
    'Mobile Development',
    'Backend Development',
    'UI/UX Design'
  ];

  const softSkills = [
    'Problem Solving',
    'Team Collaboration',
    'Project Management',
    'Agile Development',
    'Clean Code',
    'Performance Optimization',
    'Testing & Debugging',
    'Documentation',
    'Version Control',
    'CI/CD'
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
            Languages, frameworks, and practices I use to ship reliable products.
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
