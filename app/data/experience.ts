export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    role: 'Technical Lead Consultant',
    company: 'Pixelcare Consulting',
    location: 'Remote',
    period: '2026 — Present',
    current: true,
    summary:
      'Leading technical delivery across multiple client projects, owning architecture, infrastructure, and the standard of code that ships.',
    highlights: [
      'Lead and coordinate software development across concurrent client projects',
      'Provide technical guidance, mentoring, and code review for the development team',
      'Manage Docker environments, Traefik routing, SSL, and Ubuntu/Linux deployments',
      'Implement CI/CD pipelines with GitHub Actions and container workflows via GHCR',
      'Operate production PostgreSQL and Redis services and resolve integration issues',
      'Review architecture, security, performance, and infrastructure requirements'
    ],
    tech: ['Docker', 'Traefik', 'GitHub Actions', 'GHCR', 'PostgreSQL', 'Redis', 'Ubuntu', 'Next.js', 'TypeScript']
  },
  {
    role: 'Software Engineer',
    company: 'Pixelcare Consulting',
    location: 'Remote',
    period: '2023 — 2026',
    summary:
      'Built the enterprise products the business runs on: field service operations, a technician mobile app, and e-Invoice compliance middleware.',
    highlights: [
      'Built a Field Service Management System for scheduling, dispatch, and customer management',
      'Built a technician mobile app with job tracking, digital signatures, and clock in/out',
      'Developed e-Invoice middleware integrating LHDN with enterprise systems',
      'Developed REST APIs and integrated third-party services and enterprise platforms',
      'Prepared documentation and supported users through system implementation'
    ],
    tech: ['Next.js', 'React', 'React Native', 'Node.js', 'Firebase', 'TypeScript', 'SQL', 'SAP B1', 'LHDN SDK']
  },
  {
    role: 'Web Developer',
    company: 'Blue Ocean Data Solutions',
    location: 'On-site',
    period: '2023',
    summary:
      'Modernised legacy business applications into maintainable production web systems.',
    highlights: [
      'Migrated legacy applications into production ASP.NET web applications',
      'Implemented authentication, data management, reporting, dashboards, and workflows',
      'Performed testing, debugging, troubleshooting, and performance optimization'
    ],
    tech: ['ASP.NET', 'C#', 'MS-SQL', 'SSRS']
  },
  {
    role: 'Fullstack Developer',
    company: 'Eonbotz Technology',
    location: 'On-site',
    period: '2021 — 2023',
    summary:
      'Delivered school management platforms end to end while mentoring the web development team.',
    highlights: [
      'Developed school management systems, student portals, and parent portals using C#',
      'Built and maintained fullstack web applications from business requirements',
      'Led and mentored web developers through project implementation',
      'Planned development tasks, monitored timelines, and prepared documentation'
    ],
    tech: ['C#', 'ASP.NET', 'MS-SQL', 'JavaScript', 'Bootstrap']
  },
  {
    role: 'Freelance Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: '2023',
    summary:
      'Built a biometric-enabled events and profile management platform for a private client.',
    highlights: [
      'Developed a Laravel 10 TALL-stack application with fingerprint biometric scanning',
      'Implemented event and user profile management features',
      'Built report generation and reporting workflows end to end'
    ],
    tech: ['Laravel', 'PHP', 'Livewire', 'Alpine.js', 'Tailwind CSS', 'MySQL']
  },
  {
    role: 'Freelance Developer',
    company: 'Caravan & 1Export',
    location: 'Remote',
    period: '2021',
    summary:
      'Designed and shipped client-facing marketing and authentication interfaces.',
    highlights: [
      'Developed and maintained web applications using Laravel and Vue.js',
      'Designed responsive landing pages and login interfaces',
      'Communicated directly with clients on requirements and changes'
    ],
    tech: ['Laravel', 'Vue.js', 'PHP', 'MySQL']
  },
  {
    role: 'Game Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: '2017 — 2018',
    summary:
      'Built an Android educational game helping children with dyslexia learn through play.',
    highlights: [
      'Developed an Android educational game for children with dyslexia',
      'Built game mechanics and interactive learning activities using Unity and C#',
      'Integrated Firebase for application data and backend functionality'
    ],
    tech: ['Unity', 'C#', 'Firebase', 'Android']
  },
  {
    role: 'Graphic Designer',
    company: 'Love Radio Davao',
    location: 'On-site',
    period: '2015',
    summary:
      'Produced on-brand campaign and social media design for a regional radio station.',
    highlights: [
      'Produced posters and social graphics aligned with brand guidelines',
      'Designed layouts for events, promotions, and social media posts',
      'Coordinated with DJs, sales, and station management on design requirements'
    ],
    tech: ['Adobe Photoshop', 'Adobe Illustrator', 'Layout Design']
  }
];
