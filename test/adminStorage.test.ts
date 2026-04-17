import { describe, it, expect, beforeEach } from 'vitest';
import {
  getTeamMembers,
  saveTeamMembers,
  getSiteConfig,
  saveSiteConfig,
  resetToDefaults,
  defaultTeamMembers,
  defaultSiteConfig,
} from '../utils/adminStorage';

describe('adminStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getTeamMembers', () => {
    it('returns default members when localStorage is empty', () => {
      const members = getTeamMembers();
      expect(members).toEqual(defaultTeamMembers);
      expect(members).toHaveLength(3);
    });

    it('returns stored members from localStorage', () => {
      const custom = [
        { id: 'DEV_99', name: 'Test', role: 'Tester', roleRu: 'Тестер', stack: ['Jest'], projects: [{ title: 'Test Proj', year: '2024' }], avatarUrl: '' }
      ];
      localStorage.setItem('zaza-team-members', JSON.stringify(custom));
      expect(getTeamMembers()).toEqual(custom);
    });

    it('returns defaults for invalid JSON', () => {
      localStorage.setItem('zaza-team-members', 'not-json');
      expect(getTeamMembers()).toEqual(defaultTeamMembers);
    });

    it('returns defaults for empty array', () => {
      localStorage.setItem('zaza-team-members', '[]');
      expect(getTeamMembers()).toEqual(defaultTeamMembers);
    });
  });

  describe('saveTeamMembers', () => {
    it('saves members to localStorage', () => {
      const custom = [
        { id: 'DEV_10', name: 'New', role: 'Dev', roleRu: 'Разработчик', stack: ['TS'], projects: [], avatarUrl: '' }
      ];
      saveTeamMembers(custom);
      const stored = JSON.parse(localStorage.getItem('zaza-team-members')!);
      expect(stored).toEqual(custom);
    });
  });

  describe('getSiteConfig', () => {
    it('returns default config when localStorage is empty', () => {
      expect(getSiteConfig()).toEqual(defaultSiteConfig);
    });

    it('returns stored config', () => {
      const custom = { ...defaultSiteConfig, hq: 'Moscow, Russia', hqRu: 'Москва, Россия', descDagestan: 'Test EN', descDagestanRu: 'Тест RU' };
      localStorage.setItem('zaza-site-config', JSON.stringify(custom));
      expect(getSiteConfig()).toEqual(custom);
    });

    it('merges with defaults for partial config', () => {
      localStorage.setItem('zaza-site-config', JSON.stringify({ hq: 'Test' }));
      const config = getSiteConfig();
      expect(config.hq).toBe('Test');
      expect(config.hqRu).toBe(defaultSiteConfig.hqRu);
    });
  });

  describe('saveSiteConfig', () => {
    it('saves config to localStorage', () => {
      const custom = { ...defaultSiteConfig, hq: 'Paris' };
      saveSiteConfig(custom);
      expect(JSON.parse(localStorage.getItem('zaza-site-config')!)).toEqual(custom);
    });
  });

  describe('resetToDefaults', () => {
    it('clears all stored data', () => {
      saveTeamMembers([{ id: 'DEV_00', name: 'X', role: '', roleRu: '', stack: [], projects: [], avatarUrl: '' }]);
      saveSiteConfig({ ...defaultSiteConfig, hq: 'X' });
      resetToDefaults();
      expect(localStorage.getItem('zaza-team-members')).toBeNull();
      expect(localStorage.getItem('zaza-site-config')).toBeNull();
      expect(getTeamMembers()).toEqual(defaultTeamMembers);
      expect(getSiteConfig()).toEqual(defaultSiteConfig);
    });
  });

  describe('default team members', () => {
    it('has exactly 3 members', () => {
      expect(defaultTeamMembers).toHaveLength(3);
    });

    it('contains Мага, Мирза, Магомедъ', () => {
      const names = defaultTeamMembers.map(m => m.name);
      expect(names).toContain('Мага');
      expect(names).toContain('Мирза');
      expect(names).toContain('Магомедъ');
    });

    it('each member has required fields', () => {
      defaultTeamMembers.forEach(member => {
        expect(member).toHaveProperty('id');
        expect(member).toHaveProperty('name');
        expect(member).toHaveProperty('role');
        expect(member).toHaveProperty('roleRu');
        expect(member).toHaveProperty('stack');
        expect(member).toHaveProperty('projects');
        expect(member).toHaveProperty('avatarUrl');
        expect(Array.isArray(member.stack)).toBe(true);
        expect(Array.isArray(member.projects)).toBe(true);
      });
    });

    it('each member has bilingual roles', () => {
      defaultTeamMembers.forEach(member => {
        expect(member.role).toBeTruthy();
        expect(member.roleRu).toBeTruthy();
      });
    });
  });

  describe('default site config', () => {
    it('contains Dagestan references', () => {
      expect(defaultSiteConfig.hq).toContain('Dagestan');
      expect(defaultSiteConfig.hqRu).toContain('Дагестан');
      expect(defaultSiteConfig.descDagestan).toContain('Dagestan');
      expect(defaultSiteConfig.descDagestanRu).toContain('Дагестан');
    });

    it('contains Derbent', () => {
      expect(defaultSiteConfig.hq).toContain('Derbent');
      expect(defaultSiteConfig.hqRu).toContain('Дербент');
    });
  });
});
