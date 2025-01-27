import React from 'react';
import { motion } from 'framer-motion';
import { Background } from './Background';
import { GraduationCap, Briefcase, Award, Code, Building, MapPin, Mail, Phone, Instagram, Facebook, MessageSquare, Codepen, Twitter, Github, AtSign } from 'lucide-react';

export const About = () => {
  const workExperience = [
    {
      title: "Software Engineer",
      company: "Pixelcare Consulting - Remote",
      period: "December 2023 - Present",
      achievements: [
        "Built an e-Invoice web app middleware integrated with LHDN SDK (Malaysian Tax Authority) for automated tax workflows and regulatory compliance.",
        "Updated old software to modern ASP.NET web app for better performance.",
        "Built a Field Service Management web application portal and mobile app using Next.js and React Native.",
        "Implemented real-time data synchronization and offline capabilities, resulting in 40% improved field operations efficiency and seamless mobile-web integration."
      ]
    },
    {
      title: "Software Engineer",
      company: "EonBotz Technology - On-site",
      period: "August 2021 - October 2023",
      achievements: [
        "Developed and implemented a comprehensive school management system and campaigns aligned with the school's goals",
        "Provided leadership, mentorship, and management for a high-performing web development team",
        "Created and managed web applications (e.g., Student Portal, Parents Portal) compatible with our School Management System Windows Application using C#",
        "Oversaw the development timeline and produced comprehensive documentation for system development"
      ]
    },
    {
      title: "Freelance Developer",
      company: "Self-Employed (Freelance) - Remote",
      period: "November 6 - December 4, 2023",
      achievements: [
        "Developed a Laravel 10 web app with the TALL stack, featuring a fingerprint biometrics scanner",
        "Created functionalities for events, student/officer profiles, and report generation"
      ]
    },
    {
      title: "Web Developer",
      company: "Caravan & 1Export (1-month remote contract) - Davao City",
      period: "January 2021 - June 2021",
      achievements: [
        "Crafted Landing and Login Page utilizing Laravel and Vue.js for Caravan & 1Export"
      ]
    },
    {
      title: "Freelance Developer",
      company: "Self-Employed (Freelance) - Remote",
      period: "January 2018 - October 2018",
      achievements: [
        "Built a library management system using Laravel, Bootstrap, PHP and MySQL",
        "The application features a sleek and responsive interface, facilitating tasks such as catalog browsing, book transactions, and user account management"
      ]
    },
    {
      title: "Game Developer",
      company: "Self-Employed",
      period: "June 2017 - May 2018",
      achievements: [
        "Developed an Android game for dyslexic children aged 3-5 using UNITY Engine",
        "Proficient in database design and C# as the programming language"
      ]
    },
    {
      title: "Graphic Designer",
      company: "Love Radio Davao - On-site",
      period: "October 2016 - May 2017",
      achievements: [
        "Produced compelling advertising materials, including posters and social media graphics",
        "Ensured design and branding aligned with Love Radio Davao's image and message"
      ]
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <Background variant="about" />
      
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
          <div className="text-sm tracking-[0.4em] text-purple-400 uppercase mb-4">Discover My Story</div>
          <h2 className="text-5xl font-bold relative">
            <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-600 blur-xl opacity-50"></span>
            <span className="relative bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text animate-gradient-x">Career Excellence & Growth</span>
          </h2>
        </motion.div>

        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative">
            <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur opacity-25" />
            <div className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text mb-4">
                    About Me
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    I'm a Full-Stack Developer currently working remotely with companies across Southeast Asia 🌏. 
                  </p>
                  <p className="text-gray-400 leading-relaxed mt-1">
                  Primarily in Malaysia 🇲🇾, Singapore 🇸🇬 & Philippines 🇵🇭.
                  </p>
                  <p className="text-gray-400 leading-relaxed mt-4">
                    I build web and mobile applications using modern technologies such as React ⚛️, Node.js 🚀, and cloud platforms ☁️.
                  </p>
                  <p className="text-gray-400 leading-relaxed mt-4">
                    I love creating user-friendly solutions and working with teams to deliver great results.
                  </p>
                  <p className="text-gray-400 leading-relaxed mt-4">
                    My experience includes both frontend 🎨 and backend 🔧 development, always focusing on writing clean, efficient code.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text mb-4">Let's Connect</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <a 
                        href="https://github.com/gmjsilmaro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                          <Github className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-gray-300">GitHub</p>
                          <p className="text-gray-400 group-hover:text-white transition-colors">github.com/gmjsilmaro</p>
                        </div>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/gmjsilmaro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                          <Building className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-gray-300">LinkedIn</p>
                          <p className="text-gray-400 group-hover:text-white transition-colors">linkedin.com/in/gmjsilmaro</p>
                        </div>
                      </a>
                      <a 
                        href="https://discord.gg/gmjsilmaro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-gray-300">Discord</p>
                          <p className="text-gray-400 group-hover:text-white transition-colors">discord.gg/gmjsilmaro</p>
                        </div>
                      </a>
                      <a 
                        href="https://facebook.com/gmjsilmaro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                          <Facebook className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-gray-300">Facebook</p>
                          <p className="text-gray-400 group-hover:text-white transition-colors">facebook.com/gmjsilmaro</p>
                        </div>
                      </a>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <a 
                        href="https://instagram.com/gmjsilmaro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                          <Instagram className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-gray-300">Instagram</p>
                          <p className="text-gray-400 group-hover:text-white transition-colors">instagram.com/gmjsilmaro</p>
                        </div>
                      </a>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-gray-300">Email</p>
                          <a href="mailto:gmjsilmaro03@gmail.com" className="text-gray-400 hover:text-white transition-colors">gmjsilmaro03@gmail.com</a>
                        </div>
                      </div>
                      
                      <a 
                        href="https://twitter.com/gmjsilmaro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                          <Twitter className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-gray-300">Twitter</p>
                          <p className="text-gray-400 group-hover:text-white transition-colors">twitter.com/gmjsilmaro</p>
                        </div>
                      </a>
                      <a 
                        href="https://threads.net/@gmjsilmaro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                          <AtSign className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-gray-300">Threads</p>
                          <p className="text-gray-400 group-hover:text-white transition-colors">@gmjsilmaro</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative">
            <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur opacity-25" />
            <div className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Education</h3>
              </div>
              <div className="ml-14">
                <h4 className="text-lg text-white mb-1">Bachelor of Science in Information Technology</h4>
                <p className="text-gray-400">Interface Computer College</p>
                <p className="text-gray-400">2019 - 2021</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Work Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Work Experience</h3>
          </div>

          <div className="space-y-6">
            {workExperience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur opacity-25" />
                <div className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{job.title}</h4>
                      <p className="text-purple-400">{job.company}</p>
                    </div>
                    <p className="text-gray-400 md:text-right">{job.period}</p>
                  </div>
                  <ul className="space-y-2 ml-4">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 mt-2" />
                        <span className="text-gray-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
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