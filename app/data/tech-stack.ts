import type { IconType } from 'react-icons';
import {
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiExpo,
  SiVuedotjs,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiDotnet,
  SiLaravel,
  SiOpenapiinitiative,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiFirebase,
  SiDocker,
  SiTraefikproxy,
  SiGithubactions,
  SiGithub,
  SiUbuntu,
  SiSuse,
  SiGit,
  SiSap,
  SiSage,
} from 'react-icons/si';
import {
  TbBrandCSharp,
  TbDatabase,
  TbShieldLock,
  TbWebhook,
  TbBuildingStore,
  TbReceiptTax,
  TbReportAnalytics,
  TbFileReport,
  TbChartBar,
  TbChartPie,
} from 'react-icons/tb';
import { DiMsqlServer } from 'react-icons/di';

export interface Tech {
  name: string;
  icon: IconType;
  /** Brand colour tuned for legibility on the paper dossier background. */
  color: string;
  /** Marks the stack I am most comfortable working in. */
  favorite?: boolean;
}

export interface TechCategory {
  category: string;
  items: Tech[];
}

export const techCategories: TechCategory[] = [
  {
    category: 'Languages',
    items: [
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', favorite: true },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', favorite: true },
      { name: 'C#', icon: TbBrandCSharp, color: '#A879C9' },
      { name: 'PHP', icon: SiPhp, color: '#8993BE' },
      { name: 'Python', icon: SiPython, color: '#4B8BBE' },
      { name: 'SQL', icon: TbDatabase, color: '#8BA4D9' },
    ],
  },
  {
    category: 'Frontend & Mobile',
    items: [
      { name: 'React', icon: SiReact, color: '#61DAFB', favorite: true },
      { name: 'Next.js', icon: SiNextdotjs, color: '#111111', favorite: true },
      { name: 'React Native', icon: SiReact, color: '#61DAFB', favorite: true },
      { name: 'Expo', icon: SiExpo, color: '#4630EB' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8', favorite: true },
      { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#9B7BD4' },
    ],
  },
  {
    category: 'Backend & APIs',
    items: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#6CC24A', favorite: true },
      { name: 'Express.js', icon: SiExpress, color: '#404040', favorite: true },
      { name: 'ASP.NET', icon: SiDotnet, color: '#9B7BF7' },
      { name: 'Laravel', icon: SiLaravel, color: '#FF5B47' },
      { name: 'REST APIs', icon: SiOpenapiinitiative, color: '#8BC34A', favorite: true },
      { name: 'OAuth', icon: TbShieldLock, color: '#8BA4D9' },
      { name: 'Webhooks', icon: TbWebhook, color: '#8BA4D9' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MS-SQL', icon: DiMsqlServer, color: '#E5534B', favorite: true },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#5B8DEF' },
      { name: 'MySQL', icon: SiMysql, color: '#5A9BD5' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', favorite: true },
      { name: 'HANA DB', icon: SiSap, color: '#4FC3F7' },
      { name: 'Redis', icon: SiRedis, color: '#FF6B5E' },
    ],
  },
  {
    category: 'DevOps & Infrastructure',
    items: [
      { name: 'Docker', icon: SiDocker, color: '#2496ED', favorite: true },
      { name: 'Docker Compose', icon: SiDocker, color: '#2496ED' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#4C9AFF', favorite: true },
      { name: 'Git', icon: SiGit, color: '#F05032', favorite: true },
      { name: 'Traefik', icon: SiTraefikproxy, color: '#37B7D0' },
      { name: 'GHCR', icon: SiGithub, color: '#24292F' },
      { name: 'Ubuntu', icon: SiUbuntu, color: '#E95420' },
      { name: 'SUSE Linux', icon: SiSuse, color: '#4FD18B' },
    ],
  },
  {
    category: 'Enterprise & Reporting',
    items: [
      { name: 'SAP B1', icon: SiSap, color: '#4FC3F7', favorite: true },
      { name: 'LHDN SDK', icon: TbReceiptTax, color: '#8BA4D9', favorite: true },
      { name: 'SAGE X3', icon: SiSage, color: '#4FD18B' },
      { name: 'NetSuite', icon: TbBuildingStore, color: '#8BA4D9' },
      { name: 'SSRS', icon: TbReportAnalytics, color: '#8BA4D9' },
      { name: 'Crystal Reports', icon: TbFileReport, color: '#8BA4D9' },
      { name: 'Power BI', icon: TbChartBar, color: '#F2C744' },
      { name: 'BI360', icon: TbChartPie, color: '#8BA4D9' },
    ],
  },
];

export const favoriteCount = techCategories.reduce(
  (total, group) => total + group.items.filter((item) => item.favorite).length,
  0
);
