import type { LucideIcon } from 'lucide-react';
import { Boxes, FileCheck2, Globe, Network, Smartphone } from 'lucide-react';

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  title: string;
  period: string;
  company: string;
  description: string;
  tech: string[];
  features: string[];
  icon: LucideIcon;
  images: ProjectImage[];
  caseId: string;
}

export interface EnterpriseWork {
  title: string;
  period: string;
  clientCount: string;
  icon: LucideIcon;
  summary: string;
  scope: string[];
  sectors: string[];
  caseId: string;
}

export const projects: Project[] = [
  {
    caseId: 'CASE-01',
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
      'ERP Integration',
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
      {
        src: './images/projects/eInvoice/einvoice-VideoTutorialshowtoNavigateanduseLHDNMiddlewareeInvoicePortal.png',
        alt: 'Video Tutorial Guide',
      },
    ],
  },
  {
    caseId: 'CASE-02',
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
      'Document Management',
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
      { src: './images/projects/fsm/fsm-dashboard.png', alt: 'FSM Dashboard' },
    ],
  },
  {
    caseId: 'CASE-03',
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
      'Service History',
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
      { src: './images/projects/fsm-mobile/fsm-mobile-privacypolicy.png', alt: 'Privacy Policy' },
    ],
  },
];

export const enterpriseWork: EnterpriseWork[] = [
  {
    caseId: 'ENT-01',
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
      'Enterprise integrations over REST APIs, database links, and scheduled middleware processes',
    ],
    sectors: ['Manufacturing', 'F&B', 'Engineering', 'Media', 'Insurance', 'Automotive', 'Trading'],
  },
  {
    caseId: 'ENT-02',
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
      'Stock movements, goods issue and receipt, branch allocation, and SAP synchronization',
    ],
    sectors: ['Technology', 'Retail & Distribution', 'M&E Engineering'],
  },
];
