export interface TeamProject {
  title: string;
  year: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleRu: string;
  stack: string[];
  projects: TeamProject[];
  avatarUrl: string;
}

export interface SiteConfig {
  hq: string;
  hqRu: string;
  descDagestan: string;
  descDagestanRu: string;
}

const TEAM_KEY = 'zaza-team-members';
const CONFIG_KEY = 'zaza-site-config';

export const defaultTeamMembers: TeamMember[] = [
  {
    id: 'DEV_01',
    name: 'Мага',
    role: 'Full Stack Architect',
    roleRu: 'Фулстек Архитектор',
    stack: ['React', 'TypeScript', 'Node'],
    projects: [
      { title: 'Platform Alpha', year: '2024' },
      { title: 'FinTech Dashboard', year: '2024' }
    ],
    avatarUrl: ''
  },
  {
    id: 'DEV_02',
    name: 'Мирза',
    role: 'Creative Developer',
    roleRu: 'Креативный Разработчик',
    stack: ['Three.js', 'GSAP', 'Figma'],
    projects: [
      { title: 'Brand Identity', year: '2024' },
      { title: 'Interactive 3D', year: '2024' }
    ],
    avatarUrl: ''
  },
  {
    id: 'DEV_03',
    name: 'Магомедъ',
    role: 'Systems Engineer',
    roleRu: 'Системный Инженер',
    stack: ['Go', 'Docker', 'PostgreSQL'],
    projects: [
      { title: 'Cloud Infrastructure', year: '2024' },
      { title: 'API Gateway', year: '2024' }
    ],
    avatarUrl: ''
  }
];

export const defaultSiteConfig: SiteConfig = {
  hq: 'Derbent, Dagestan',
  hqRu: 'Дербент, Дагестан',
  descDagestan: 'A collective of sovereign developers from Dagestan.',
  descDagestanRu: 'Коллектив суверенных разработчиков из Дагестана.'
};

export function getTeamMembers(): TeamMember[] {
  try {
    const raw = localStorage.getItem(TEAM_KEY);
    if (!raw) return defaultTeamMembers;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultTeamMembers;
    return parsed;
  } catch {
    return defaultTeamMembers;
  }
}

export function saveTeamMembers(members: TeamMember[]): void {
  localStorage.setItem(TEAM_KEY, JSON.stringify(members));
}

export function getSiteConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return defaultSiteConfig;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return defaultSiteConfig;
    return { ...defaultSiteConfig, ...parsed };
  } catch {
    return defaultSiteConfig;
  }
}

export function saveSiteConfig(config: SiteConfig): void {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export function resetToDefaults(): void {
  localStorage.removeItem(TEAM_KEY);
  localStorage.removeItem(CONFIG_KEY);
}
