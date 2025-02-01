import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Background } from './Background';
import { Code, Database, Globe, Smartphone, Book, Gamepad, Network } from 'lucide-react';
import { Modal } from './ui/modal';
import Image from 'next/image';

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
  const [enlargedImageIndex, setEnlargedImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isEnlargedModalOpen, setIsEnlargedModalOpen] = useState(false);

  const projects: Project[] = [
    {
      title: "e-Invoice Middleware Web Application",
      description: "Developed an e-Invoice middleware system integrated with LHDN (Malaysian Tax Authority) for automated tax workflows and compliance. Built a web portal from scratch for digital invoice processing with real-time data sync and reporting features. With a clean modern user friendly UI easy to manage.",
      tech: ["Node.js", "Express.js", "SQL Server", "REST APIs", "LHDN SDK", "Cloud Server", "SAP B1", "GitHub", "Bootstrap"],
      features: ["Real-time Processing", "Secure Authentication", "Automated Tax Workflows", "Digital Invoice Processing", "Comprehensive Reporting", "ERP Integration"],
      icon: Globe,
      color: "from-purple-500 to-cyan-500",
      images: [
        { src: "./images/projects/eInvoice/einvoice-login-1.png", alt: "Login Page" },
        { src: "./images/projects/eInvoice/einvoice-dashboard-2.png", alt: "Dashboard View" },
        { src: "./images/projects/eInvoice/einvoice-dasdhboard-2.1.png", alt: "Dashboard View with Welcome Modal" },
        { src: "./images/projects/eInvoice/einvoice-companyprofile-page-5.png", alt: "Company Profile Page" },
        { src: "./images/projects/eInvoice/einvoice-ERPSAPCustomConfiguration.png", alt: "ERP SAP Custom Configuration" },
        { src: "./images/projects/eInvoice/einvoice-HelpSupportPage.png", alt: "Help and Support Page" },
        { src: "./images/projects/eInvoice/einvoice-inboundpage-4.png", alt: "Inbound Page" },
        { src: "./images/projects/eInvoice/einvoice-LHDNConfigurationSettings.png", alt: "LHDN Configuration Settings" },
        { src: "./images/projects/eInvoice/einvoice-outboundpage-3.png", alt: "Outbound Page" },
        { src: "./images/projects/eInvoice/einvoice-profile-changepassword-settings-7.png", alt: "Profile Change Password Settings" },
        { src: "./images/projects/eInvoice/einvoice-settingspage-6.png", alt: "Settings Page" },
        { src: "./images/projects/eInvoice/einvoice-VideoTutorialshowtoNavigateanduseLHDNMiddlewareeInvoicePortal.png", alt: "Video Tutorial Navigation Guide" }
      ]
    },
    {
      title: "Field Services Management System",
      description: "Comprehensive web portal for managing field service operations. Features robust job scheduling, worker dispatch management, customer relationship management, and real-time service tracking. Seamlessly integrates with mobile applications for end-to-end service delivery control.",
      tech: ["React", "Next.js", "Firebase", "Tanstack", "Bootstrap", "SAP B1"],
      features: [
        "Real-time Dashboard",
        "Job Scheduling & Dispatch",
        "Worker Management",
        "Customer Management",
        "Calendar Planning",
        "Service Analytics",
        "Mobile Integration",
        "Task Assignment",
        "Performance Tracking",
        "Document Management"
      ],
      icon: Network,
      color: "from-cyan-500 to-purple-500",
      images: [
          {
            src: "./images/projects/fsm/fsm-login-page.png",
            alt: "Field Service Login Page"
          },
          {
            src: "./images/projects/fsm/fsm-login-authentication.png",
            alt: "User Authentication Flow"
          },
          {
            src: "./images/projects/fsm/fsm-create-job.png", 
            alt: "Create New Service Job"
          },
          {
            src: "./images/projects/fsm/fsm-create-job-2.png",
            alt: "Service Job Creation Form"
          },
          {
            src: "./images/projects/fsm/fsm-job-calendar.png",
            alt: "Service Jobs Calendar View"
          },
          {
            src: "./images/projects/fsm/fsm-job-page.png",
            alt: "Job Details Page"
          },
          {
            src: "./images/projects/fsm/fsm-view-job-details.png",
            alt: "Detailed Job Information"
          },
          {
            src: "./images/projects/fsm/fsm-create-worker.png",
            alt: "Add New Field Service Worker"
          },
          {
            src: "./images/projects/fsm/fsm-worker-dispatch.png",
            alt: "Worker Dispatch Management"
          },
          {
            src: "./images/projects/fsm/fsm-workers-page.png",
            alt: "Field Workers Overview"
          },
          {
            src: "./images/projects/fsm/fsm-customers-page.png",
            alt: "Customer Management"
          },
          {
            src: "./images/projects/fsm/fsm-view-customer-page.png",
            alt: "Customer Details View"
          },
          {
            src: "./images/projects/fsm/fsm-whatsnew-modal.png",
            alt: "What's New Feature Modal"
          },
          {
            src: "./images/projects/fsm/fsm-dashboard.png",
            alt: "Field Service Management Dashboard"
          }
        ]
    },
    {
      title: "Field Services Mobility App",
      description: "Integrated web portal and mobile app solution for field service management. Streamlines field operations with real-time job tracking, digital documentation, and efficient worker management. Empowers technicians with comprehensive job management and service delivery tools.",
      tech: ["React Native", "React", "Next.js", "Firebase", "TypeScript", "Expo", "Google API", "Tailwind CSS"],
      features: [
        "Cross-platform Mobile & Web",
        "Real-time Job Tracking",
        "Digital Signature Capture",
        "Photo Documentation",
        "Clock In/Out System",
        "Job Status Management",
        "Task Assignment",
        "Service History",
        "Offline Capability",
        "Mobile-first Design"
      ],
      icon: Smartphone,
      color: "from-cyan-500 to-purple-500",
      images: [
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-splash.png",
          alt: "Mobile App Splash Screen"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-login.png",
          alt: "Mobile Login Screen"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-navigation.png",
          alt: "Navigation Menu"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-aboutapp.png",
          alt: "About Mobile Application"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-profile.png",
          alt: "User Profile View"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-editprofile.png",
          alt: "Edit Profile Screen"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-settings.png",
          alt: "App Settings"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-currentjobs.png",
          alt: "Current Jobs Overview"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-jobdetails.png",
          alt: "Job Details Screen"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-viewjobdetails.png",
          alt: "Detailed Job Information"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-jobworkerservices.png",
          alt: "Worker Services List"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-addtask.png",
          alt: "Add New Task"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-finishtask.png",
          alt: "Finish Task"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-jobstarted.png",
          alt: "Job Started Status"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-startjobconfirmation.png",
          alt: "Start Job Confirmation"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-clockin.png",
          alt: "Clock In Screen"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-clockin2.png",
          alt: "Clock In Confirmation"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-completejobscreen.png",
          alt: "Complete Job Screen"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-jobcompleted.png",
          alt: "Job Completed Status"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-jobcompleted-cannotstart.png",
          alt: "Completed Job - Cannot Start New"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-submissionconfirmation.png",
          alt: "Submission Confirmation"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-finalizesubmission.png",
          alt: "Finalize Job Submission"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-customerdetails.png",
          alt: "Customer Details"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-customersview.png",
          alt: "Customers List View"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-customersignature.png",
          alt: "Customer Signature Capture"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-savingsignature.png",
          alt: "Save Signature"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-signaturemodal.png",
          alt: "Signature Modal"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-uploadimages.png",
          alt: "Upload Images"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-historyjobs.png",
          alt: "Job History"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-submitservices.png",
          alt: "Submit Services"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-terms.png",
          alt: "Terms and Conditions"
        },
        {
          src: "./images/projects/fsm-mobile/fsm-mobile-privacypolicy.png",
          alt: "Privacy Policy"
        }
      ]
    },
    // {
    //   title: "Library Management System",
    //   description: "Built a comprehensive library management system using Laravel, Bootstrap, PHP and MySQL. The application includes features such as catalog searching, book transactions, and user account management.",
    //   tech: ["Laravel", "Bootstrap", "PHP", "MySQL", "jQuery"],
    //   features: ["Book Management", "User Authentication", "Transaction Tracking", "Search Functionality"],
    //   icon: Book,
    //   color: "from-purple-500 to-cyan-500",
    //   images: [
    //     { src: "./images/projects/library-1.jpg", alt: "Library Dashboard" },
    //     { src: "./images/projects/library-2.jpg", alt: "Book Catalog" },
    //     { src: "./images/projects/library-3.jpg", alt: "Transaction History" }
    //   ]
    // },
    // {
    //   title: "Educational Android Game",
    //   description: "Developed an Android game for dyslexic children aged 3-5 using UNITY Engine. Created an engaging and educational gaming experience with C# as the programming language.",
    //   tech: ["Unity", "C#", "Android SDK", "Game Development"],
    //   features: ["Educational Content", "Child-friendly UI", "Interactive Learning", "Dyslexia Support"],
    //   icon: Gamepad,
    //   color: "from-cyan-500 to-purple-500",
    //   images: [
    //     { src: "./images/projects/game-1.jpg", alt: "Game Menu" },
    //     { src: "./images/projects/game-2.jpg", alt: "Gameplay" },
    //     { src: "./images/projects/game-3.jpg", alt: "Learning Module" }
    //   ]
    // }
  ];
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/images');
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);
  const getImagePath = (path: string) => {
    const cleanPath = path.startsWith('./') ? path.slice(2) : path;
    return cleanPath;
  };

  const handleImageClick = (index: number) => {
    setEnlargedImageIndex(index);
    setIsEnlargedModalOpen(true);
  };

  const handleNext = () => {
    if (selectedProject && enlargedImageIndex !== null) {
      const nextIndex = (enlargedImageIndex + 1) % selectedProject.images.length;
      setEnlargedImageIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    if (selectedProject && enlargedImageIndex !== null) {
      const prevIndex = (enlargedImageIndex - 1 + selectedProject.images.length) % selectedProject.images.length;
      setEnlargedImageIndex(prevIndex);
    }
  };

  const handleCloseGallery = () => {
    setIsGalleryModalOpen(false);
    setEnlargedImageIndex(null);
    setIsEnlargedModalOpen(false);
  };

  const handleCloseEnlarged = () => {
    setIsEnlargedModalOpen(false);
    setEnlargedImageIndex(null);
  };

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
        className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20 hover:border-purple-500/50 hover:text-white transition-all duration-300 cursor-default group"
      >
        {tech}
      </span>
    ))}
  </div>
</div>

                    {/* <div>
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
                    </div> */}
                   <div>
  <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Key Features</h4>
  <div className="grid grid-cols-2 gap-x-8">
    {/* Left Column */}
    <div className="space-y-2">
      {project.features.slice(0, Math.ceil(project.features.length / 2)).map((feature, featureIndex) => (
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

    {/* Right Column */}
    <div className="space-y-2">
      {project.features.slice(Math.ceil(project.features.length / 2)).map((feature, featureIndex) => (
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
                </div>

                <div className="order-1 lg:order-2 relative">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a] cursor-pointer"
                    onClick={() => {
                      setSelectedProject(project);
                      setIsGalleryModalOpen(true); // Changed from setIsModalOpen to setIsGalleryModalOpen
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10" />
                    {project.images[0] && (
                      <div className="relative w-full h-full">
                        <Image
                          src={getImagePath(project.images[0].src)}
                          alt={project.images[0].alt}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
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
{/* Project Gallery Modal */}
<Modal isOpen={isGalleryModalOpen} onClose={handleCloseGallery}>
  {selectedProject && (
    <div className="w-full min-h-screen bg-[#0B1120] p-4">
      {/* App Header */}
      <div className="flex items-center justify-between max-w-[90rem] mx-auto mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500 p-2">
            <Globe className="w-full h-full text-white" />
          </div>
          <span className="text-lg font-medium text-white">Project Gallery</span>
        </div>
       
      </div>

      {/* Gallery Grid */}
      <div className="max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedProject.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-3 cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              {/* Screenshot Container */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/5 ">
                <Image
                  src={getImagePath(image.src)}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Label */}
              <span className="text-white text-center">
                {image.alt}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )}
</Modal>
    {/* Enlarged Image Modal */}
<Modal isOpen={isEnlargedModalOpen} onClose={handleCloseEnlarged}>
  {selectedProject && enlargedImageIndex !== null && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="relative w-full h-full">
        <Image
          src={getImagePath(selectedProject.images[enlargedImageIndex].src)}
          alt={selectedProject.images[enlargedImageIndex].alt}
          fill
          className="object-contain"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
  onClick={handlePrevious}
  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 text-white p-3 rounded-full hover:bg-gray-700 transition-colors z-20 group"
  aria-label="Previous image"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
</button>

<button
  onClick={handleNext}
  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 text-white p-3 rounded-full hover:bg-gray-700 transition-colors z-20 group"
  aria-label="Next image"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
</button>
        </div>
        <div className="absolute bottom-0 inset-x-0 flex justify-center mb-10">
          <p className="text-white p-4 bg-black/50 rounded-lg max-w-xl text-center">
            {selectedProject.images[enlargedImageIndex].alt}
          </p>
        </div>
        <button
          onClick={handleCloseEnlarged}
          className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800/80 text-white hover:bg-gray-700 transition-colors z-20"
        >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
        </button>
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