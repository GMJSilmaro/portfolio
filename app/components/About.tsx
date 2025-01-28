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
      title: "Software Engineer", 
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
      company: "Caravan & TExport",
      location: "Remote",
      period: "January 2021 - June 2021",
      description: [
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
              Professional Odyssey
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

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-12 relative timeline-item first:mt-0"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/10 shadow-xl">
              <div className="w-full md:w-1/3 text-center md:text-right">
                <div className="inline-flex items-center gap-3 text-purple-400">
                  <GraduationCap className="w-6 h-6" />
                  <span className="font-semibold">2019 - 2021</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">BS in Information Technology</h3>
                <p className="text-gray-400">Interface Computer College</p>
              </div>
              <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-cyan-500 to-transparent mx-8" />
              <div className="w-full md:w-2/3">
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
          </motion.div>

          {/* Work Experience Timeline */}
          {workExperience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative mb-12 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full -ml-7 md:-ml-2 -mt-1 z-10" />

              <div className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Date */}
                <div className={`hidden md:block w-1/3 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <p className="text-gray-400">{job.period}</p>
                </div>

                {/* Content */}
                <div className="w-full md:w-2/3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                  </div>
                  <p className="text-purple-300 mb-4">{job.company}</p>
                  <ul className="space-y-3">
                    {job.description.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                        <p className="text-gray-300">{achievement}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-24 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
        >
          <div className="text-center mb-8">
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
                className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
                    <contact.icon className="w-6 h-6 text-purple-400" />
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