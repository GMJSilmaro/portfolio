import React from 'react';

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
    <section id="skills" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Skills
          </p>
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Technical Expertise
          </h2>
          <p className="text-slate-400">
            Tools and technologies I use to ship reliable products.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent-soft"
            >
              {area}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {mainSkills.map((category) => (
            <div
              key={category.category}
              className="rounded-xl border border-white/10 bg-navy-900 p-6"
            >
              <h3 className="mb-4 text-base font-semibold text-white">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-white/10 bg-navy-800 px-3 py-1 text-sm text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-white/10 bg-navy-900 p-6">
          <h3 className="mb-4 text-base font-semibold text-white">
            Additional Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-white/10 bg-navy-800 px-3 py-1 text-sm text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
