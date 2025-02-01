import React from 'react';
import { motion } from 'framer-motion';
import { Background } from './Background';
import { GraduationCap, Briefcase, Award, Code, Building, MapPin, Mail, Phone, Instagram, Facebook, MessageSquare, Codepen, Twitter, Github, AtSign } from 'lucide-react';

export const About = () => {
  const workExperience = [
    {
      title: "Software Engineer",
      company: "Pixelcare Consulting",
      location: "Remote",
      period: "December 2023 - Present",
      description: [
        "Developed a web application for FSM, Field Management System Portal, with Mobility and Integration using NextJs, React Native Expo, Firebase",
        "Created a web application for e-Invoice and integrated LHDN SDK for tax compliance and digital invoicing",
        "Migrated a software system into a fully functional web application using ASP.NET"
      ]
    },
    {
      title: "Fullstack Developer", 
      company: "EonBiz Technology",
      location: "On-site",
      period: "August 2021 - October 2023",
      description: [
        "Developed and implemented a comprehensive school management system and campaigns",
        "Provided leadership and mentorship for a high-performing web development team",
        "Created web applications like Student Portal and Parents Portal using C#",
        "Oversaw development timeline and produced comprehensive documentation"
      ]
    },
    {
      title: "Freelance Developer",
      company: "Self-Employed",
      location: "Remote",
      period: "November 2023 - December 2023",
      description: [
        "Developed a Laravel 10 web app with TALL stack featuring fingerprint biometric scanner",
        "Created functionalities for events, student/officer profiles, and report generation"
      ]
    },
    {
      title: "Freelance Developer",
      company: "Caravan & 1Export",
      location: "Remote",
      period: "January 2021 - June 2021",
      description: [
        "Crafted Landing Page and Login Page utilizing Laravel and Vue.js",
        "Crafted Landing Page and Login Page utilizing Laravel and Vue.js"
      ]
    },
    {
      title: "Game Developer",
      company: "Self-Employed",
      location: "Remote", 
      period: "June 2017 - May 2018",
      description: [
        "Developed an Android game for dyslexic children using UNITY Engine, Firebase and C#"
      ]
    },
    {
      title: "Graphic Designer",
      company: "Love Radio Davao",
      location: "On-site",
      period: "October 2015 - May 2017",
      description: [
        "Produced advertising materials including posters and social media graphics",
        "Ensured design and branding aligned with company image and message"
      ]
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <Background variant="about" />
      
      {/* Top Divider */}
      <div className="absolute top-0 inset-x-0">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <span className="text-sm tracking-widest text-purple-400 uppercase mb-4">Journey Through Innovation</span>
          <h2 className="text-5xl font-bold mb-4 relative">
            <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-600 blur-xl opacity-50"></span>
            <span className="relative bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text">
              Professional Career
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mt-4">
            A timeline of my career progression, technical expertise, and continuous learning journey
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500/20 via-cyan-500/20 to-purple-500/20 transform -translate-x-1/2" />
          <div className="pr-4">
                <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">BS in Information Technology</h3>
                  </div>
                  <p className="text-purple-300 mb-4">Interface Computer College</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2" />
                      <p className="text-gray-300">Specialized in software development and system architecture</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2" />
                      <p className="text-gray-300">Achieved academic excellence with recognition and specialized in modern web technologies</p>
                    </li>
                  </ul>
                </div>
              </div>
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-12 relative"
          >
            
          </motion.div>

          {/* Work Experience Timeline */}
          {workExperience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative mb-12"
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 mt-3 z-10 shadow-[0_0_12px_rgba(34,211,238,0.8)]">
                <div className="absolute inset-0 -m-1 rounded-full bg-cyan-400/20" />
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
                {/* Left side content */}
                <div className={index % 2 === 0 ? 'pr-4' : 'col-start-3 pl-4'}>
                  <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-500/30">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Briefcase className="w-6 h-6 text-purple-400" />
                          <h3 className="text-xl font-bold text-white">{job.title}</h3>
                        </div>
                        <p className="text-purple-300">{job.company}</p>
                        <p className="text-purple-300 text-sm">{job.period}</p>
                      </div>
                      <span className="px-3 py-1 text-sm rounded-full bg-purple-500/20 text-purple-300">
                        {job.location}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {job.description.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 group">
                          <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0 group-hover:bg-purple-400 transition-colors" />
                          <p className="text-gray-300 group-hover:text-white transition-colors">{achievement}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

               


                {/* Empty column for spacing */}
                <div className={index % 2 === 0 ? 'col-start-2' : 'col-start-1'}></div>
              </div>
                {/* Empty column for spacing */}
                <div className={index % 2 === 0 ? 'col-start-2' : 'col-start-1'}></div>
          
              
            </motion.div>
          ))}
        </div>

        {/* Contact Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-4">
              Let's Build Something Amazing
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto">
              Whether you have a project in mind or just want to connect, I'm always open to new opportunities and conversations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
                    <contact.icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{contact.label}</p>
                    <p className="text-gray-200 group-hover:text-white transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};