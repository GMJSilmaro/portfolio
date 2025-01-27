import React from 'react';
import { motion } from 'framer-motion';
import { Background } from './Background';

export const Skills = () => {
  const mainSkills = [
    {
      category: "Programming Languages",
      skills: ["JavaScript", "TypeScript", "Python", "C#", "PHP", "C++"]
    },
    {
      category: "Frontend & Mobile",
      skills: ["React", "Next.js", "React Native", "Angular", "Vue.js", "HTML5", "CSS3", "SASS", "TailwindCSS", "Bootstrap"]
    },
    {
      category: "Backend & Database",
      skills: ["Node.js", "Express.js", "Laravel", "Symfony", "CodeIgniter", "Firebase", "MySQL", "MSSQL", "SQLite", "MariaDB"]
    },
    {
      category: "Tools & Platforms",
      skills: ["Git", "Docker", "AWS", "Postman", "Linux", "VS Code", "Figma", "Android Studio", "Unity", "Unreal Engine"]
    }
  ];

  const expertiseAreas = [
    {
      name: "Frontend Development",
      level: 95,
      color: "from-purple-500 to-cyan-500"
    },
    {
      name: "Mobile Development",
      level: 90,
      color: "from-cyan-500 to-purple-500"
    },
    {
      name: "Backend Development",
      level: 85,
      color: "from-purple-500 to-cyan-500"
    },
    {
      name: "UI/UX Design",
      level: 80,
      color: "from-cyan-500 to-purple-500"
    }
  ];

  return (
    <section id="skills" className="py-24 relative">
      <Background variant="skills" />
      
      {/* Top Divider */}
      <div className="absolute top-0 inset-x-0">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="text-sm tracking-[0.4em] text-purple-400 uppercase mb-4">Skills</div>
          <h2 className="text-5xl font-bold relative">
            <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-600 blur-xl opacity-50"></span>
            <span className="relative">Technical Expertise</span>
          </h2>
        </motion.div>

        {/* Expertise Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white/5 rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">{area.name}</h3>
                <span className="text-sm text-gray-400">{area.level}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${area.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full bg-gradient-to-r ${area.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainSkills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white/5 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 relative bg-white/5 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Additional Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Problem Solving",
              "Team Collaboration",
              "Project Management",
              "Agile Development",
              "Clean Code",
              "Performance Optimization",
              "Testing & Debugging",
              "Documentation",
              "Version Control",
              "CI/CD"
            ].map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 inset-x-0">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>
    </section>
  );
}; 