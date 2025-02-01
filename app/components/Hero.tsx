import React from 'react';
import { motion } from 'framer-motion';
import { Background } from './Background';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <Background variant="hero" />
      
      <div className="relative max-w-7xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg blur-3xl opacity-30" />
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-sm text-gray-300">Currently Employed</span>
                  </div>
                </div>
              </motion.div>
              
              <div className="space-y-6">
                <h1 className="text-7xl font-bold tracking-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="block font-extrabold text-white mb-2"
                  >
                    Gilbert Michael
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative inline-block"
                  >
                    <span className="absolute -inset-2 bg-gradient-to-r from-purple-600/50 to-cyan-600/50 blur-2xl" />
                    <span className="relative bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text animate-gradient-x">
                      Jay Silmaro
                    </span>
                  </motion.div>
                </h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-gray-400 leading-relaxed"
                >
                  SOFTWARE ENGINEER | FULLSTACK DEVELOPER
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-gray-400 leading-relaxed"
                >
                  Programming has been my passion since I was a student,
                  and I have been honing my skills as a <span className="font-semibold text-cyan-400 mb-6">Software Engineer</span> for almost {''}{' '}
                  <span className="font-bold text-indigo-500">4+ years</span>. During this time, I’ve immersed myself in a variety of programming 
                  languages and technologies, continually learning and growing.{' '}
                  My goal is to keep expanding my knowledge, and contributing to the development of {' '}
                  <span className="text-cyan-400 font-semibold">innovative digital solutions</span>. Specializing in modern tech stacks like {' '}
                  <span className="text-green-400">React</span>, <span className="text-yellow-400">Node.js</span>, and <span className="text-blue-400">cloud technologies</span>, 
                  I am driven to help build impactful projects that shape the future of tech.
                </motion.p>

           
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="relative w-full flex justify-center items-center"
          >
            {/* Decorative background elements */}
            <div className="absolute right-0 top-0 w-full h-full">
              <div className="absolute right-[-20%] top-[-20%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute right-[-10%] bottom-[-20%] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-150" />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute right-[-5%] top-[20%] w-32 h-32 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-xl"
              />
            </div>

            {/* Main image container */}
            <div className="relative w-full max-w-md mx-auto">
              <div className="relative pt-[100%]">
                <div className="absolute inset-0">
                  {/* Enhanced gradient effects */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-full rotate-180 animate-pulse delay-75" />
                  
                  {/* Decorative rings */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 border border-purple-500/20 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border border-cyan-500/20 rounded-full"
                  />
                  
                  {/* Image container */}
                  <div className="relative h-full rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-500/5 mix-blend-overlay" />
                    <div className="relative w-full h-full">
                      <Image
                        src="./images/Profile.jpg"
                        alt="Profile"
                        fill
                        className="object-cover"
                        style={{
                          objectPosition: '50% 50%'
                        }}
                        priority
                      />
                    </div>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    animate={{
                      opacity: [0, 0.5, 0],
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Additional floating elements */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute right-[-10%] top-[30%] w-16 h-16 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full blur-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 