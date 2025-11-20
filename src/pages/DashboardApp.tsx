import { useState } from 'react';
import Navbar from '../components/Navbar';
import AppSidebar from '../components/AppSidebar';
import Dashboard from './Dashboard';
import Tracker from './Tracker';
import Settings from './Settings';

export default function DashboardApp() {
  const [currentPage, setCurrentPage] = useState<'feed' | 'tracker' | 'settings'>('feed');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="flex h-[calc(100vh-4rem)]">
        <AppSidebar currentPage={currentPage} onNavigate={setCurrentPage} />

        <main className="flex-1 overflow-y-auto">
          {currentPage === 'feed' && <Dashboard />}
          {currentPage === 'tracker' && <Tracker />}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}
