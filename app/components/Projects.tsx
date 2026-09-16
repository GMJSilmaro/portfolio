'use client'

import React, { useState } from 'react';
import { Globe, Network, Smartphone, Images, FileCheck2, Boxes } from 'lucide-react';
import { Modal } from './ui/modal';
import { Reveal } from './ui/reveal';
import Image from 'next/image';

interface ProjectImage {
  src: string;
  alt: string;
}

interface Project {
  title: string;
  period: string;
  company: string;
  description: string;
  tech: string[];
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  images: ProjectImage[];
}

const TECH_TAG_LIMIT = 5;

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [enlargedImageIndex, setEnlargedImageIndex] = useState<number | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isEnlargedModalOpen, setIsEnlargedModalOpen] = useState(false);

  const projects: Project[] = [
    {
      title: 'e-Invoice Middleware',
      period: '2023 — 2026',
      company: 'Pixelcare Consulting',
      description:
        'Middleware portal integrated with LHDN for automated tax workflows, digital invoice processing, real-time sync, and reporting — built for compliance and day-to-day ops.',
      tech: ['Node.js', 'Express.js', 'SQL Server', 'REST APIs', 'LHDN SDK', 'SAP B1', 'Bootstrap'],
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
        { src: './images/projects/eInvoice/einvoice-dasdhboard-2.1.png', alt: 'Dashboard with Welcome Modal' },
        { src: './images/projects/eInvoice/einvoice-companyprofile-page-5.png', alt: 'Company Profile' },
        { src: './images/projects/eInvoice/einvoice-ERPSAPCustomConfiguration.png', alt: 'ERP SAP Configuration' },
        { src: './images/projects/eInvoice/einvoice-HelpSupportPage.png', alt: 'Help & Support' },
        { src: './images/projects/eInvoice/einvoice-inboundpage-4.png', alt: 'Inbound Page' },
        { src: './images/projects/eInvoice/einvoice-LHDNConfigurationSettings.png', alt: 'LHDN Settings' },
        { src: './images/projects/eInvoice/einvoice-outboundpage-3.png', alt: 'Outbound Page' },
        { src: './images/projects/eInvoice/einvoice-profile-changepassword-settings-7.png', alt: 'Password Settings' },
        { src: './images/projects/eInvoice/einvoice-settingspage-6.png', alt: 'Settings Page' },
        { src: './images/projects/eInvoice/einvoice-VideoTutorialshowtoNavigateanduseLHDNMiddlewareeInvoicePortal.png', alt: 'Video Tutorial Guide' }
      ]
    },
    {
      title: 'Field Services Management',
      period: '2024 — Present',
      company: 'Pixelcare Consulting',
      description:
        'Web portal for field operations — job scheduling, worker dispatch, CRM, calendars, and live service tracking with ERP integration.',
      tech: ['React', 'Next.js', 'Firebase', 'Tanstack', 'Bootstrap', 'SAP B1'],
      features: [
        'Real-time Dashboard',
        'Job Scheduling & Dispatch',
        'Worker Management',
        'Customer Management',
        'Calendar Planning',
        'Service Analytics',
        'Mobile Integration',
        'Document Management'
      ],
      icon: Network,
      images: [
        { src: './images/projects/fsm/fsm-login-page.png', alt: 'Login Page' },
        { src: './images/projects/fsm/fsm-login-authentication.png', alt: 'Authentication Flow' },
        { src: './images/projects/fsm/fsm-create-job.png', alt: 'Create Service Job' },
        { src: './images/projects/fsm/fsm-create-job-2.png', alt: 'Job Creation Form' },
        { src: './images/projects/fsm/fsm-job-calendar.png', alt: 'Jobs Calendar' },
        { src: './images/projects/fsm/fsm-job-page.png', alt: 'Job Details' },
        { src: './images/projects/fsm/fsm-view-job-details.png', alt: 'Detailed Job Info' },
        { src: './images/projects/fsm/fsm-create-worker.png', alt: 'Add Worker' },
        { src: './images/projects/fsm/fsm-worker-dispatch.png', alt: 'Worker Dispatch' },
        { src: './images/projects/fsm/fsm-workers-page.png', alt: 'Workers Overview' },
        { src: './images/projects/fsm/fsm-customers-page.png', alt: 'Customer Management' },
        { src: './images/projects/fsm/fsm-view-customer-page.png', alt: 'Customer Details' },
        { src: './images/projects/fsm/fsm-whatsnew-modal.png', alt: "What's New Modal" },
        { src: './images/projects/fsm/fsm-dashboard.png', alt: 'FSM Dashboard' }
      ]
    },
    {
      title: 'Field Services Mobile App',
      period: '2024 — Present',
      company: 'Pixelcare Consulting',
      description:
        'Cross-platform React Native app for technicians — live job tracking, signatures, photos, clock in/out, and offline-friendly workflows.',
      tech: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Google API', 'Tailwind CSS'],
      features: [
        'Cross-platform Mobile',
        'Real-time Job Tracking',
        'Digital Signatures',
        'Photo Documentation',
        'Clock In/Out',
        'Offline Capability',
        'Task Assignment',
        'Service History'
      ],
      icon: Smartphone,
      images: [
        { src: './images/projects/fsm-mobile/fsm-mobile-splash.png', alt: 'Splash Screen' },
        { src: './images/projects/fsm-mobile/fsm-mobile-login.png', alt: 'Login Screen' },
        { src: './images/projects/fsm-mobile/fsm-mobile-navigation.png', alt: 'Navigation Menu' },
        { src: './images/projects/fsm-mobile/fsm-mobile-aboutapp.png', alt: 'About App' },
        { src: './images/projects/fsm-mobile/fsm-mobile-profile.png', alt: 'User Profile' },
        { src: './images/projects/fsm-mobile/fsm-mobile-editprofile.png', alt: 'Edit Profile' },
        { src: './images/projects/fsm-mobile/fsm-mobile-settings.png', alt: 'Settings' },
        { src: './images/projects/fsm-mobile/fsm-mobile-currentjobs.png', alt: 'Current Jobs' },
        { src: './images/projects/fsm-mobile/fsm-mobile-jobdetails.png', alt: 'Job Details' },
        { src: './images/projects/fsm-mobile/fsm-mobile-viewjobdetails.png', alt: 'Detailed Job Info' },
        { src: './images/projects/fsm-mobile/fsm-mobile-jobworkerservices.png', alt: 'Worker Services' },
        { src: './images/projects/fsm-mobile/fsm-mobile-addtask.png', alt: 'Add Task' },
        { src: './images/projects/fsm-mobile/fsm-mobile-finishtask.png', alt: 'Finish Task' },
        { src: './images/projects/fsm-mobile/fsm-mobile-jobstarted.png', alt: 'Job Started' },
        { src: './images/projects/fsm-mobile/fsm-mobile-startjobconfirmation.png', alt: 'Start Confirmation' },
        { src: './images/projects/fsm-mobile/fsm-mobile-clockin.png', alt: 'Clock In' },
        { src: './images/projects/fsm-mobile/fsm-mobile-clockin2.png', alt: 'Clock In Confirm' },
        { src: './images/projects/fsm-mobile/fsm-mobile-completejobscreen.png', alt: 'Complete Job' },
        { src: './images/projects/fsm-mobile/fsm-mobile-jobcompleted.png', alt: 'Job Completed' },
        { src: './images/projects/fsm-mobile/fsm-mobile-jobcompleted-cannotstart.png', alt: 'Cannot Start New' },
        { src: './images/projects/fsm-mobile/fsm-mobile-submissionconfirmation.png', alt: 'Submission Confirm' },
        { src: './images/projects/fsm-mobile/fsm-mobile-finalizesubmission.png', alt: 'Finalize Submission' },
        { src: './images/projects/fsm-mobile/fsm-mobile-customerdetails.png', alt: 'Customer Details' },
        { src: './images/projects/fsm-mobile/fsm-mobile-customersview.png', alt: 'Customers List' },
        { src: './images/projects/fsm-mobile/fsm-mobile-customersignature.png', alt: 'Signature Capture' },
        { src: './images/projects/fsm-mobile/fsm-mobile-savingsignature.png', alt: 'Save Signature' },
        { src: './images/projects/fsm-mobile/fsm-mobile-signaturemodal.png', alt: 'Signature Modal' },
        { src: './images/projects/fsm-mobile/fsm-mobile-uploadimages.png', alt: 'Upload Images' },
        { src: './images/projects/fsm-mobile/fsm-mobile-historyjobs.png', alt: 'Job History' },
        { src: './images/projects/fsm-mobile/fsm-mobile-submitservices.png', alt: 'Submit Services' },
        { src: './images/projects/fsm-mobile/fsm-mobile-terms.png', alt: 'Terms' },
        { src: './images/projects/fsm-mobile/fsm-mobile-privacypolicy.png', alt: 'Privacy Policy' }
      ]
    }
  ];

  const enterpriseWork = [
    {
      title: 'Pinnacle e-Invoice Middleware',
      period: '2023 — 2026',
      clientCount: '9 enterprise clients',
      icon: FileCheck2,
      summary:
        'Designed and delivered an e-Invoice middleware platform connecting customer systems to government e-Invoicing platforms and service providers, then supported it in production across multiple client rollouts.',
      scope: [
        'Invoice generation, submission, validation, status tracking, and document delivery',
        'UBL, XML, and JSON generation validated against LHDN e-Invoicing rules',
        'OAuth flows with access and refresh token handling, secure credentials, webhooks, and API monitoring',
        'Enterprise integrations over REST APIs, database links, and scheduled middleware processes'
      ],
      sectors: ['Manufacturing', 'F&B', 'Engineering', 'Media', 'Insurance', 'Automotive', 'Trading']
    },
    {
      title: 'SAP Business One Projects',
      period: '2024 — Present',
      clientCount: '3 enterprise clients',
      icon: Boxes,
      summary:
        'Led technical design and development of SAP Business One integrated applications, covering business processes, integrations, APIs, and custom solutions as Technical Lead Consultant.',
      scope: [
        'SAP B1 Service Layer integrations across sales, purchasing, inventory, warehouse, and finance',
        'Integrations to web portals, mobile applications, POS systems, and third-party services',
        'Field Service Management solutions with service orders, scheduling, technicians, and inventory',
        'Stock movements, goods issue and receipt, branch allocation, and SAP synchronization'
      ],
      sectors: ['Technology', 'Retail & Distribution', 'M&E Engineering']
    }
  ];

  const getImagePath = (path: string) => (path.startsWith('./') ? path.slice(2) : path);

  const openGallery = (project: Project) => {
    setSelectedProject(project);
    setIsGalleryModalOpen(true);
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
    <section id="projects" className="border-t border-white/10 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="mb-10 max-w-2xl">
          <p className="section-kicker">02 — Projects</p>
          <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Featured Work
          </h2>
          <p className="text-slate-400">
            Production products I designed and built — tap any screenshot to open the gallery.
          </p>
        </Reveal>

        <div className="space-y-10 sm:space-y-14">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 80}>
              <article className="card-interactive group overflow-hidden">
                <button
                  type="button"
                  onClick={() => openGallery(project)}
                  className="relative block aspect-[16/10] w-full overflow-hidden bg-navy-800 sm:aspect-video"
                >
                  {project.images[0] && (
                    <Image
                      src={getImagePath(project.images[0].src)}
                      alt={project.images[0].alt}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      priority={index === 0}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent transition-opacity duration-300 group-hover:from-navy-950/60" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-navy-950/85 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-all duration-300 group-hover:border-accent/60 group-hover:bg-accent group-hover:text-navy-950 sm:text-sm">
                      <Images className="h-4 w-4 text-accent transition-colors group-hover:text-navy-950" />
                      View gallery · {project.images.length} shots
                    </span>
                  </div>
                </button>

                <div className="p-5 sm:p-7">
                  <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                    <span className="font-medium text-accent-soft">{project.period}</span>
                    <span className="text-slate-600">|</span>
                    <span>{project.company}</span>
                  </div>

                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-navy-800 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-navy-700">
                      <project.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-accent-soft sm:text-2xl">
                      {project.title}
                    </h3>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300 sm:text-base">
                    {project.description}
                  </p>

                  <div className="mb-5">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Highlights
                    </h4>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
                    {project.tech.slice(0, TECH_TAG_LIMIT).map((tech) => (
                      <span key={tech} className="chip cursor-default text-xs lowercase">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > TECH_TAG_LIMIT && (
                      <span
                        className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-soft"
                        title={project.tech.slice(TECH_TAG_LIMIT).join(', ')}
                      >
                        +{project.tech.length - TECH_TAG_LIMIT}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mb-8 mt-16 max-w-2xl">
          <h3 className="mb-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Enterprise Delivery
          </h3>
          <p className="text-slate-400">
            Long-running platform work delivered for enterprise clients across Malaysia, Singapore,
            and other markets. Client names are withheld under confidentiality.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {enterpriseWork.map((work, index) => (
            <Reveal key={work.title} delay={index * 80}>
              <div className="card-interactive group h-full p-5 sm:p-7">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-navy-800 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-navy-700">
                      <work.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{work.title}</h4>
                      <p className="text-xs text-slate-500">{work.period}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-soft">
                    {work.clientCount}
                  </span>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300">
                  {work.summary}
                </p>

                <div className="mb-5">
                  <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Scope
                  </h5>
                  <ul className="space-y-2">
                    {work.scope.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-slate-400">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Sectors Served
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {work.sectors.map((sector) => (
                      <span key={sector} className="chip cursor-default text-xs">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal isOpen={isGalleryModalOpen} onClose={handleCloseGallery}>
        {selectedProject && (
          <div className="bg-navy-950 p-4 sm:p-6">
            <div className="mb-6 pr-10">
              <p className="text-xs uppercase tracking-wider text-slate-500">Gallery</p>
              <h3 className="text-lg font-semibold text-white sm:text-xl">{selectedProject.title}</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedProject.images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className="group text-left"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-navy-900">
                    <Image
                      src={getImagePath(image.src)}
                      alt={image.alt}
                      fill
                      className="object-cover transition-opacity group-hover:opacity-85"
                    />
                  </div>
                  <span className="block text-center text-xs text-slate-400 sm:text-sm">{image.alt}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isEnlargedModalOpen} onClose={handleCloseEnlarged}>
        {selectedProject && enlargedImageIndex !== null && (
          <div className="relative flex min-h-[60vh] flex-col items-center justify-center bg-navy-950 p-4 sm:min-h-[70vh]">
            <div className="relative h-[55vh] w-full sm:h-[65vh]">
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
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-navy-800 text-white hover:bg-navy-700"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-navy-800 text-white hover:bg-navy-700"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <p className="mt-4 rounded-md border border-white/10 bg-navy-900 px-4 py-2 text-center text-sm text-slate-200">
              {selectedProject.images[enlargedImageIndex].alt}
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
};
