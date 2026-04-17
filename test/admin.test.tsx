import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryProvider } from './test-utils';
import Admin from '../pages/Admin';
import { saveTeamMembers, saveSiteConfig, defaultTeamMembers, defaultSiteConfig, resetToDefaults } from '../utils/adminStorage';

function renderAdmin() {
  return render(
    <MemoryProvider initialEntry="/admin">
      <Admin />
    </MemoryProvider>
  );
}

describe('Admin Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows login form initially', () => {
    renderAdmin();
    expect(screen.getByText(/ZAZA/i)).toBeTruthy();
    expect(screen.getByPlaceholderText('••••••••')).toBeTruthy();
  });

  it('rejects wrong password', () => {
    renderAdmin();
    const input = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /enter|войти/i });
    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.click(submitBtn);
    expect(screen.getByText(/invalid|неверный/i)).toBeTruthy();
  });

  it('accepts correct password and shows dashboard', () => {
    renderAdmin();
    const input = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /enter|войти/i });
    fireEvent.change(input, { target: { value: 'zaza2024' } });
    fireEvent.click(submitBtn);
    expect(screen.getByText(/control panel|панель управления/i)).toBeTruthy();
  });

  it('shows team members after login', async () => {
    renderAdmin();
    const input = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /enter|войти/i });
    fireEvent.change(input, { target: { value: 'zaza2024' } });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      defaultTeamMembers.forEach(member => {
        expect(screen.getAllByDisplayValue(member.name).length).toBeGreaterThan(0);
      });
    });
  });

  it('shows site settings after login', async () => {
    renderAdmin();
    const input = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /enter|войти/i });
    fireEvent.change(input, { target: { value: 'zaza2024' } });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByDisplayValue(defaultSiteConfig.hq)).toBeTruthy();
      expect(screen.getByDisplayValue(defaultSiteConfig.hqRu)).toBeTruthy();
    });
  });

  it('can add a new team member', async () => {
    renderAdmin();
    const input = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /enter|войти/i });
    fireEvent.change(input, { target: { value: 'zaza2024' } });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByText(/team members|участники команды/i)).toBeTruthy();
    });
    const addBtns = screen.getAllByText(/^add|добавить$/i);
    fireEvent.click(addBtns[0]);
    const stackInputs = screen.getAllByPlaceholderText(/react|typescript|stack/i);
    expect(stackInputs.length).toBeGreaterThan(0);
  });

  it('saves and persists changes', async () => {
    renderAdmin();
    const input = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /enter|войти/i });
    fireEvent.change(input, { target: { value: 'zaza2024' } });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByText(/save all|сохранить всё/i)).toBeTruthy();
    });
    const saveBtn = screen.getByText(/save all|сохранить всё/i);
    fireEvent.click(saveBtn);
    await waitFor(() => {
      expect(screen.getByText(/saved|сохранено/i)).toBeTruthy();
    });
  });
});
