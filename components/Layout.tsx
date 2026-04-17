import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-obsidian text-white font-body selection:bg-white selection:text-black overflow-hidden">
      {/* Static Atmospheric Background (Zero Performance Cost) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.03),_transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.02),_transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
      </div>

      <Navigation />
      <main className="relative z-10 w-full min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;