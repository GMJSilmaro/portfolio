'use client'

import React, { useState } from 'react';
import { Globe, Network, Smartphone } from 'lucide-react';
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
  icon: React.ComponentType<{ className?: string }>;
  images: ProjectImage[];
}

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [enlargedImageIndex, setEnlargedImageIndex] = useState<number | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isEnlargedModalOpen, setIsEnlargedModalOpen] = useState(false);

  const projects: Project[] = [
    {
      title: 'e-Invoice Middleware Web Application',
      description:
        'Developed an e-Invoice middleware system integrated with LHDN (Malaysian Tax Authority) for automated tax workflows and compliance. Built a web portal from scratch for digital invoice processing with real-time data sync and reporting features.',
      tech: ['Node.js', 'Express.js', 'SQL Server', 'REST APIs', 'LHDN SDK', 'Cloud Server', 'SAP B1', 'GitHub', 'Bootstrap'],
      features: [
        'Real-time Processing',
        'Secure Authentication',
        'Automated Tax Workflows',
        'Digital Invoice Processing',
        'Comprehensive Reporting',
        'ERP Integration'
      ],
      icon: Globe,
      images: [
        { src: './images/projects/eInvoice/einvoice-login-1.png', alt: 'Login Page' },
        { src: './images/projects/eInvoice/einvoice-dashboard-2.png', alt: 'Dashboard View' },
        { src: './images/projects/eInvoice/einvoice-dasdhboard-2.1.png', alt: 'Dashboard View with Welcome Modal' },
        { src: './images/projects/eInvoice/einvoice-companyprofile-page-5.png', alt: 'Company Profile Page' },
        { src: './images/projects/eInvoice/einvoice-ERPSAPCustomConfiguration.png', alt: 'ERP SAP Custom Configuration' },
        { src: './images/projects/eInvoice/einvoice-HelpSupportPage.png', alt: 'Help and Support Page' },
        { src: './images/projects/eInvoice/einvoice-inboundpage-4.png', alt: 'Inbound Page' },
        { src: './images/projects/eInvoice/einvoice-LHDNConfigurationSettings.png', alt: 'LHDN Configuration Settings' },
        { src: './images/projects/eInvoice/einvoice-outboundpage-3.png', alt: 'Outbound Page' },
        { src: './images/projects/eInvoice/einvoice-profile-changepassword-settings-7.png', alt: 'Profile Change Password Settings' },
        { src: './images/projects/eInvoice/einvoice-settingspage-6.png', alt: 'Settings Page' },
        { src: './images/projects/eInvoice/einvoice-VideoTutorialshowtoNavigateanduseLHDNMiddlewareeInvoicePortal.png', alt: 'Video Tutorial Navigation Guide' }
      ]
    },
    {
      title: 'Field Services Management System',
      description:
        'Comprehensive web portal for managing field service operations. Features robust job scheduling, worker dispatch management, customer relationship management, and real-time service tracking.',
      tech: ['React', 'Next.js', 'Firebase', 'Tanstack', 'Bootstrap', 'SAP B1'],
      features: [
        'Real-time Dashboard',
        'Job Scheduling & Dispatch',
        'Worker Management',
        'Customer Management',
        'Calendar Planning',
        'Service Analytics',
        'Mobile Integration',
        'Task Assignment',
        'Performance Tracking',
        'Document Management'
      ],
      icon: Network,
      images: [
        { src: './images/projects/fsm/fsm-login-page.png', alt: 'Field Service Login Page' },
        { src: './images/projects/fsm/fsm-login-authentication.png', alt: 'User Authentication Flow' },
        { src: './images/projects/fsm/fsm-create-job.png', alt: 'Create New Service Job' },
        { src: './images/projects/fsm/fsm-create-job-2.png', alt: 'Service Job Creation Form' },
        { src: './images/projects/fsm/fsm-job-calendar.png', alt: 'Service Jobs Calendar View' },
        { src: './images/projects/fsm/fsm-job-page.png', alt: 'Job Details Page' },
        { src: './images/projects/fsm/fsm-view-job-details.png', alt: 'Detailed Job Information' },
        { src: './images/projects/fsm/fsm-create-worker.png', alt: 'Add New Field Service Worker' },
        { src: './images/projects/fsm/fsm-worker-dispatch.png', alt: 'Worker Dispatch Management' },
        { src: './images/projects/fsm/fsm-workers-page.png', alt: 'Field Workers Overview' },
        { src: './images/projects/fsm/fsm-customers-page.png', alt: 'Customer Management' },
        { src: './images/projects/fsm/fsm-view-customer-page.png', alt: 'Customer Details View' },
        { src: './images/projects/fsm/fsm-whatsnew-modal.png', alt: "What's New Feature Modal" },
        { src: './images/projects/fsm/fsm-dashboard.png', alt: 'Field Service Management Dashboard' }
      ]
    },
    {
      title: 'Field Services Mobility App',
      description:
        'Integrated web portal and mobile app solution for field service management. Streamlines field operations with real-time job tracking, digital documentation, and efficient worker management.',
      tech: ['React Native', 'React', 'Next.js', 'Firebase', 'TypeScript', 'Expo', 'Google API', 'Tailwind CSS'],
      features: [
        'Cross-platform Mobile & Web',
        'Real-time Job Tracking',
        'Digital Signature Capture',
        'Photo Documentation',
        'Clock In/Out System',
        'Job Status Management',
        'Task Assignment',
        'Service History',
        'Offline Capability',
        'Mobile-first Design'
      ],
      icon: Smartphone,
      images: [
        { src: './images/projects/fsm-mobile/fsm-mobile-splash.png', alt: 'Mobile App Splash Screen' },
        { src: './images/projects/fsm-mobile/fsm-mobile-login.png', alt: 'Mobile Login Screen' },
        { src: './images/projects/fsm-mobile/fsm-mobile-navigation.png', alt: 'Navigation Menu' },
        { src: './images/projects/fsm-mobile/fsm-mobile-aboutapp.png', alt: 'About Mobile Application' },
        { src: './images/projects/fsm-mobile/fsm-mobile-profile.png', alt: 'User Profile View' },
        { src: './images/projects/fsm-mobile/fsm-mobile-editprofile.png', alt: 'Edit Profile Screen' },
        { src: './images/projects/fsm-mobile/fsm-mobile-settings.png', alt: 'App Settings' },
        { src: './images/projects/fsm-mobile/fsm-mobile-currentjobs.png', alt: 'Current Jobs Overview' },
        { src: './images/projects/fsm-mobile/fsm-mobile-jobdetails.png', alt: 'Job Details Screen' },
        { src: './images/projects/fsm-mobile/fsm-mobile-viewjobdetails.png', alt: 'Detailed Job Information' },
        { src: './images/projects/fsm-mobile/fsm-mobile-jobworkerservices.png', alt: 'Worker Services List' },
        { src: './images/projects/fsm-mobile/fsm-mobile-addtask.png', alt: 'Add New Task' },
        { src: './images/projects/fsm-mobile/fsm-mobile-finishtask.png', alt: 'Finish Task' },
        { src: './images/projects/fsm-mobile/fsm-mobile-jobstarted.png', alt: 'Job Started Status' },
        { src: './images/projects/fsm-mobile/fsm-mobile-startjobconfirmation.png', alt: 'Start Job Confirmation' },
        { src: './images/projects/fsm-mobile/fsm-mobile-clockin.png', alt: 'Clock In Screen' },
        { src: './images/projects/fsm-mobile/fsm-mobile-clockin2.png', alt: 'Clock In Confirmation' },
        { src: './images/projects/fsm-mobile/fsm-mobile-completejobscreen.png', alt: 'Complete Job Screen' },
        { src: './images/projects/fsm-mobile/fsm-mobile-jobcompleted.png', alt: 'Job Completed Status' },
        { src: './images/projects/fsm-mobile/fsm-mobile-jobcompleted-cannotstart.png', alt: 'Completed Job - Cannot Start New' },
        { src: './images/projects/fsm-mobile/fsm-mobile-submissionconfirmation.png', alt: 'Submission Confirmation' },
        { src: './images/projects/fsm-mobile/fsm-mobile-finalizesubmission.png', alt: 'Finalize Job Submission' },
        { src: './images/projects/fsm-mobile/fsm-mobile-customerdetails.png', alt: 'Customer Details' },
        { src: './images/projects/fsm-mobile/fsm-mobile-customersview.png', alt: 'Customers List View' },
        { src: './images/projects/fsm-mobile/fsm-mobile-customersignature.png', alt: 'Customer Signature Capture' },
        { src: './images/projects/fsm-mobile/fsm-mobile-savingsignature.png', alt: 'Save Signature' },
        { src: './images/projects/fsm-mobile/fsm-mobile-signaturemodal.png', alt: 'Signature Modal' },
        { src: './images/projects/fsm-mobile/fsm-mobile-uploadimages.png', alt: 'Upload Images' },
        { src: './images/projects/fsm-mobile/fsm-mobile-historyjobs.png', alt: 'Job History' },
        { src: './images/projects/fsm-mobile/fsm-mobile-submitservices.png', alt: 'Submit Services' },
        { src: './images/projects/fsm-mobile/fsm-mobile-terms.png', alt: 'Terms and Conditions' },
        { src: './images/projects/fsm-mobile/fsm-mobile-privacypolicy.png', alt: 'Privacy Policy' }
      ]
    }
  ];

  const getImagePath = (path: string) => {
    return path.startsWith('./') ? path.slice(2) : path;
  };

  const handleImageClick = (index: number) => {
    setEnlargedImageIndex(index);
    setIsEnlargedModalOpen(true);
  };

  const handleNext = () => {
    if (selectedProject && enlargedImageIndex !== null) {
      setEnlargedImageIndex((enlargedImageIndex + 1) % selectedProject.images.length);
    }
  };

  const handlePrevious = () => {
    if (selectedProject && enlargedImageIndex !== null) {
      setEnlargedImageIndex(
        (enlargedImageIndex - 1 + selectedProject.images.length) % selectedProject.images.length
      );
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
    <section id="projects" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Projects
          </p>
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Featured Work
          </h2>
          <p className="text-slate-400">
            Selected products I&apos;ve designed and built end to end.
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <article
              key={index}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14"
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-navy-800">
                    <project.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {project.title}
                  </h3>
                </div>

                <p className="mb-6 text-base leading-relaxed text-slate-400">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-md border border-white/10 bg-navy-800 px-3 py-1 text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <button
                  type="button"
                  className="group relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-navy-900 text-left"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsGalleryModalOpen(true);
                  }}
                >
                  {project.images[0] && (
                    <Image
                      src={getImagePath(project.images[0].src)}
                      alt={project.images[0].alt}
                      fill
                      className="object-cover transition-opacity group-hover:opacity-80"
                      priority={index === 0}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-navy-950/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-md border border-white/20 bg-navy-900/90 px-4 py-2 text-sm font-medium text-white">
                      View Gallery
                    </span>
                  </div>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Modal isOpen={isGalleryModalOpen} onClose={handleCloseGallery}>
        {selectedProject && (
          <div className="bg-navy-950 p-6">
            <div className="mx-auto mb-8 max-w-6xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-800">
                  <Globe className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">Gallery</p>
                  <h3 className="text-lg font-semibold text-white">{selectedProject.title}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {selectedProject.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    className="group flex flex-col gap-2 text-left"
                    onClick={() => handleImageClick(index)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-navy-900">
                      <Image
                        src={getImagePath(image.src)}
                        alt={image.alt}
                        fill
                        className="object-cover transition-opacity group-hover:opacity-80"
                      />
                    </div>
                    <span className="text-center text-sm text-slate-400">{image.alt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isEnlargedModalOpen} onClose={handleCloseEnlarged}>
        {selectedProject && enlargedImageIndex !== null && (
          <div className="relative flex min-h-[70vh] items-center justify-center bg-navy-950 p-4">
            <div className="relative h-[70vh] w-full">
              <Image
                src={getImagePath(selectedProject.images[enlargedImageIndex].src)}
                alt={selectedProject.images[enlargedImageIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-navy-800 p-3 text-white transition-colors hover:bg-navy-700"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-navy-800 p-3 text-white transition-colors hover:bg-navy-700"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-6 inset-x-0 flex justify-center">
              <p className="rounded-md border border-white/10 bg-navy-900/90 px-4 py-2 text-sm text-slate-200">
                {selectedProject.images[enlargedImageIndex].alt}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
