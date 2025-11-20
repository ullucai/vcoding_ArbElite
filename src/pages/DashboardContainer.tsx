import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import LiveFeed from './dashboard/LiveFeed';
import SettingsPage from './dashboard/SettingsPage';
import ProfilePage from './dashboard/ProfilePage';

interface DashboardContainerProps {
  userTier: 'free' | 'pro' | 'admin';
  onLogout: () => void;
}

export default function DashboardContainer({ userTier, onLogout }: DashboardContainerProps) {
  const [currentPage, setCurrentPage] = useState('feed');

  const renderPage = () => {
    switch (currentPage) {
      case 'feed':
        return <LiveFeed userTier={userTier} />;
      case 'settings':
        return <SettingsPage userTier={userTier} />;
      case 'profile':
        return <ProfilePage userTier={userTier} />;
      case 'analytics':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-black text-white mb-4">Analytics Dashboard</h2>
            <p className="text-gray-400">Coming soon - Advanced performance analytics and reports</p>
          </div>
        );
      default:
        return <LiveFeed userTier={userTier} />;
    }
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onLogout={onLogout}
      userTier={userTier}
    >
      {renderPage()}
    </DashboardLayout>
  );
}
