import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Background } from './Background';
import { Code, Database, Globe, Smartphone, Book, Gamepad } from 'lucide-react';
import { Modal } from './ui/modal';

interface ProjectImage {
  src: string;
  alt: string;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  icon: any;
  color: string;
  images: ProjectImage[];
}

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = [
    {
      title: "e-Invoice Middleware Web Application",
      description: "Developed a sophisticated e-Invoice middleware system integrated with LHDN (Malaysian Tax Authority) SDK for automated tax workflows and regulatory compliance. Built a web portal for seamless digital invoice processing, featuring real-time data synchronization and comprehensive reporting capabilities. Achieved 40% improvement in processing efficiency through optimized architecture.",
      tech: ["Node.js", "Express.js", "SQL Server", "REST APIs", "LHDN SDK", "Cloud Server", "SAP B1", "GitHub", "Bootstrap"],
      features: ["Real-time Processing", "Secure Authentication", "Automated Tax Workflows", "Digital Invoice Processing", "Comprehensive Reporting", "ERP Integration"],
      icon: Globe,
      color: "from-purple-500 to-cyan-500",
      images: [
        { src: "/images/projects/einvoice-1.jpg", alt: "Dashboard View" },
        { src: "/images/projects/einvoice-2.jpg", alt: "Invoice Processing" },
        { src: "/images/projects/einvoice-3.jpg", alt: "Reports Interface" }
      ]
    },
    {
      title: "Field Services Management System",
      description: "Integrated web portal and mobile app solution for field service management. Developed and implemented a comprehensive school management system and provided technical support aligned with the school's goals.",
      tech: ["React Native", "React", "Next.js", "Firebase", "ASP.NET"],
      features: ["Cross-platform", "Real-time Updates", "Mobile-first Design", "School Management"],
      icon: Smartphone,
      color: "from-cyan-500 to-purple-500",
      images: [
        { src: "/images/projects/fsms-1.jpg", alt: "Mobile App View" },
        { src: "/images/projects/fsms-2.jpg", alt: "Web Dashboard" },
        { src: "/images/projects/fsms-3.jpg", alt: "Service Management" }
      ]
    },
    {
      title: "Library Management System",
      description: "Built a comprehensive library management system using Laravel, Bootstrap, PHP and MySQL. The application includes features such as catalog searching, book transactions, and user account management.",
      tech: ["Laravel", "Bootstrap", "PHP", "MySQL", "jQuery"],
      features: ["Book Management", "User Authentication", "Transaction Tracking", "Search Functionality"],
      icon: Book,
      color: "from-purple-500 to-cyan-500",
      images: [
        { src: "/images/projects/library-1.jpg", alt: "Library Dashboard" },
        { src: "/images/projects/library-2.jpg", alt: "Book Catalog" },
        { src: "/images/projects/library-3.jpg", alt: "Transaction History" }
      ]
    },
    {
      title: "Educational Android Game",
      description: "Developed an Android game for dyslexic children aged 3-5 using UNITY Engine. Created an engaging and educational gaming experience with C# as the programming language.",
      tech: ["Unity", "C#", "Android SDK", "Game Development"],
      features: ["Educational Content", "Child-friendly UI", "Interactive Learning", "Dyslexia Support"],
      icon: Gamepad,
      color: "from-cyan-500 to-purple-500",
      images: [
        { src: "/images/projects/game-1.jpg", alt: "Game Menu" },
        { src: "/images/projects/game-2.jpg", alt: "Gameplay" },
        { src: "/images/projects/game-3.jpg", alt: "Learning Module" }
      ]
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <Background variant="projects" />
      
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
          <div className="text-sm tracking-[0.4em] text-purple-400 uppercase mb-4">Projects</div>
          <h2 className="text-5xl font-bold relative">
            <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-600 blur-xl opacity-50"></span>
            <span className="relative">Featured Work</span>
          </h2>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${project.color} p-2.5`}>
                      <project.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-3">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Key Features</h4>
                      <div className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2 text-gray-400 group"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:scale-150 transition-transform duration-300" />
                            <span className="group-hover:text-white transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2 relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a] cursor-pointer"
                    onClick={() => {
                      setSelectedProject(project);
                      setIsModalOpen(true);
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10" />
                    {project.images[0] && (
                      <img
                        src={project.images[0].src}
                        alt={project.images[0].alt}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-medium">View Gallery</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Gallery Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedProject && (
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-6">{selectedProject.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedProject.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-2 left-2 text-sm text-white">{image.alt}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 inset-x-0">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>
    </section>
  );
}; 