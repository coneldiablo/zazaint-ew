import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getTeamMembers, saveTeamMembers, getSiteConfig, saveSiteConfig, resetToDefaults, TeamMember, SiteConfig } from '../utils/adminStorage';

const Admin: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [config, setConfig] = useState<SiteConfig>(getSiteConfig());
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (authenticated) {
      setMembers(getTeamMembers());
      setConfig(getSiteConfig());
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'zaza2024';
    if (password === adminPassword) {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const handleStackChange = (index: number, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], stack: value.split(',').map(s => s.trim()).filter(Boolean) };
    setMembers(updated);
  };

  const handleProjectChange = (memberIndex: number, projectIndex: number, field: 'title' | 'year', value: string) => {
    const updated = [...members];
    const projects = [...updated[memberIndex].projects];
    projects[projectIndex] = { ...projects[projectIndex], [field]: value };
    updated[memberIndex] = { ...updated[memberIndex], projects };
    setMembers(updated);
  };

  const addProject = (memberIndex: number) => {
    const updated = [...members];
    const projects = [...updated[memberIndex].projects, { title: '', year: '2024' }];
    updated[memberIndex] = { ...updated[memberIndex], projects };
    setMembers(updated);
  };

  const removeProject = (memberIndex: number, projectIndex: number) => {
    const updated = [...members];
    const projects = updated[memberIndex].projects.filter((_, i) => i !== projectIndex);
    updated[memberIndex] = { ...updated[memberIndex], projects };
    setMembers(updated);
  };

  const addMember = () => {
    const newId = `DEV_${String(members.length + 1).padStart(2, '0')}`;
    setMembers([...members, {
      id: newId,
      name: '',
      role: '',
      roleRu: '',
      stack: [],
      projects: [],
      avatarUrl: ''
    }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    saveTeamMembers(members);
    saveSiteConfig(config);
    setSaveMessage(language === 'ru' ? 'Сохранено!' : 'Saved!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleReset = () => {
    if (window.confirm(language === 'ru' ? 'Сбросить все данные к значениям по умолчанию?' : 'Reset all data to defaults?')) {
      resetToDefaults();
      setMembers(getTeamMembers());
      setConfig(getSiteConfig());
      setSaveMessage(language === 'ru' ? 'Сброшено!' : 'Reset!');
      setTimeout(() => setSaveMessage(''), 2000);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="font-display text-3xl font-medium text-white tracking-tight">ZAZA</span>
            <span className="italic font-light text-white/50 ml-1 text-3xl font-display">ADMIN</span>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-light uppercase tracking-widest text-silver-dim ml-1 block mb-2">
                {language === 'ru' ? 'Пароль' : 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
                className={`w-full px-4 py-3 bg-white/5 border text-white rounded-sm text-sm font-light placeholder-white/20 focus:bg-white/10 focus:ring-0 focus:outline-none transition-all ${passwordError ? 'border-red-500/50' : 'border-white/15 focus:border-white/50'}`}
                placeholder="••••••••"
              />
              {passwordError && (
                <p className="text-[10px] text-red-400 uppercase tracking-wider pl-1 mt-1 animate-pulse">
                  {language === 'ru' ? 'Неверный пароль' : 'Invalid password'}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-gray-200 transition-colors"
            >
              {language === 'ru' ? 'Войти' : 'Enter'}
            </button>
          </form>
          <button
            onClick={toggleLanguage}
            className="mt-4 w-full py-2 text-xs font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors"
          >
            {language === 'en' ? 'RU' : 'EN'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-white font-body px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display text-2xl font-medium">
            ZAZA <span className="italic font-light text-white/50">ADMIN</span>
          </h1>
          <p className="text-xs text-white/30 font-mono uppercase tracking-widest mt-1">
            {language === 'ru' ? 'Панель управления' : 'Control Panel'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-full transition-all"
          >
            {language === 'en' ? 'RU' : 'EN'}
          </button>
          <button
            onClick={() => setAuthenticated(false)}
            className="px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-full transition-all"
          >
            {language === 'ru' ? 'Выйти' : 'Logout'}
          </button>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="font-display text-lg font-medium mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-white/40">location_on</span>
          {language === 'ru' ? 'Настройки сайта' : 'Site Settings'}
        </h2>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-light uppercase tracking-widest text-silver-dim block mb-1">
                HQ (EN)
              </label>
              <input
                type="text"
                value={config.hq}
                onChange={(e) => setConfig({ ...config, hq: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white rounded text-sm focus:border-white/50 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-light uppercase tracking-widest text-silver-dim block mb-1">
                HQ (RU)
              </label>
              <input
                type="text"
                value={config.hqRu}
                onChange={(e) => setConfig({ ...config, hqRu: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white rounded text-sm focus:border-white/50 focus:outline-none transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-light uppercase tracking-widest text-silver-dim block mb-1">
                {language === 'ru' ? 'Описание (EN)' : 'Description (EN)'}
              </label>
              <input
                type="text"
                value={config.descDagestan}
                onChange={(e) => setConfig({ ...config, descDagestan: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white rounded text-sm focus:border-white/50 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-light uppercase tracking-widest text-silver-dim block mb-1">
                {language === 'ru' ? 'Описание (RU)' : 'Description (RU)'}
              </label>
              <input
                type="text"
                value={config.descDagestanRu}
                onChange={(e) => setConfig({ ...config, descDagestanRu: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white rounded text-sm focus:border-white/50 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg font-medium flex items-center gap-3">
            <span className="material-symbols-outlined text-white/40">group</span>
            {language === 'ru' ? 'Участники команды' : 'Team Members'}
            <span className="text-xs font-mono text-white/30 ml-2">[{members.length}]</span>
          </h2>
          <button
            onClick={addMember}
            className="px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-full transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            {language === 'ru' ? 'Добавить' : 'Add'}
          </button>
        </div>

        <div className="space-y-6">
          {members.map((member, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-6 relative group">
              <button
                onClick={() => removeMember(i)}
                className="absolute top-3 right-3 text-white/20 hover:text-red-400 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-white/30 tracking-widest border border-white/10 px-2 py-0.5 rounded">{member.id}</span>
                <span className="font-display text-lg font-medium">{member.name || (language === 'ru' ? 'Новый участник' : 'New Member')}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs font-light uppercase tracking-widest text-silver-dim block mb-1">
                    {language === 'ru' ? 'Имя' : 'Name'}
                  </label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleMemberChange(i, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white rounded text-sm focus:border-white/50 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-light uppercase tracking-widest text-silver-dim block mb-1">
                    Role (EN)
                  </label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => handleMemberChange(i, 'role', e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white rounded text-sm focus:border-white/50 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-light uppercase tracking-widest text-silver-dim block mb-1">
                    Role (RU)
                  </label>
                  <input
                    type="text"
                    value={member.roleRu}
                    onChange={(e) => handleMemberChange(i, 'roleRu', e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white rounded text-sm focus:border-white/50 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-light uppercase tracking-widest text-silver-dim block mb-1">
                    {language === 'ru' ? 'Стек (через запятую)' : 'Stack (comma-separated)'}
                  </label>
                  <input
                    type="text"
                    value={member.stack.join(', ')}
                    onChange={(e) => handleStackChange(i, e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white rounded text-sm focus:border-white/50 focus:outline-none transition-all"
                    placeholder="React, TypeScript, Node"
                  />
                </div>
                <div>
                  <label className="text-xs font-light uppercase tracking-widest text-silver-dim block mb-1">
                    {language === 'ru' ? 'URL фотографии' : 'Avatar URL'}
                  </label>
                  <input
                    type="text"
                    value={member.avatarUrl}
                    onChange={(e) => handleMemberChange(i, 'avatarUrl', e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white rounded text-sm focus:border-white/50 focus:outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-light uppercase tracking-widest text-silver-dim">
                    {language === 'ru' ? 'Проекты' : 'Projects'}
                  </label>
                  <button
                    onClick={() => addProject(i)}
                    className="text-xs text-white/30 hover:text-white transition-colors flex items-center gap-0.5"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    {language === 'ru' ? 'Добавить' : 'Add'}
                  </button>
                </div>
                {member.projects.map((proj, j) => (
                  <div key={j} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => handleProjectChange(i, j, 'title', e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white/5 border border-white/15 text-white rounded text-sm focus:border-white/50 focus:outline-none transition-all"
                      placeholder={language === 'ru' ? 'Название' : 'Title'}
                    />
                    <input
                      type="text"
                      value={proj.year}
                      onChange={(e) => handleProjectChange(i, j, 'year', e.target.value)}
                      className="w-20 px-3 py-1.5 bg-white/5 border border-white/15 text-white rounded text-sm focus:border-white/50 focus:outline-none transition-all"
                      placeholder="2024"
                    />
                    <button
                      onClick={() => removeProject(i, j)}
                      className="text-white/20 hover:text-red-400 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="sticky bottom-0 bg-obsidian/90 backdrop-blur-xl border-t border-white/10 py-4 -mx-4 md:-mx-8 px-4 md:px-8 flex items-center justify-between">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-mono uppercase tracking-widest text-white/30 hover:text-red-400 border border-white/10 hover:border-red-400/30 rounded-full transition-all"
        >
          {language === 'ru' ? 'Сбросить' : 'Reset'}
        </button>
        <div className="flex items-center gap-4">
          {saveMessage && (
            <span className="text-xs text-green-400 font-mono uppercase tracking-widest animate-pulse">{saveMessage}</span>
          )}
          <button
            onClick={handleSave}
            className="px-8 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors"
          >
            {language === 'ru' ? 'Сохранить всё' : 'Save All'}
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          href="/"
          className="text-xs font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors"
        >
          ← {language === 'ru' ? 'Вернуться на сайт' : 'Back to site'}
        </a>
      </div>
    </div>
  );
};

export default Admin;
