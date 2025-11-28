import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import LiveFeed from './dashboard/LiveFeed';
import SettingsPage from './dashboard/SettingsPage';
import ProfilePage from './dashboard/ProfilePage';
import { useArbitrageData } from '../hooks/useArbitrageData';
import { StakeCalculator } from '../components/dashboard/StakeCalculator';
import { RiskAnalyzer } from '../components/dashboard/RiskAnalyzer';

interface DashboardContainerProps {
  userTier: 'free' | 'pro' | 'admin';
  onLogout: () => void;
  username?: string;
}

export default function DashboardContainer({ userTier, onLogout, username }: DashboardContainerProps) {
  const user = {
    role: userTier === 'admin' ? 'admin' : userTier === 'pro' ? 'premium' : 'user'
  };
  const [currentPage, setCurrentPage] = useState('feed');
  const { opportunities } = useArbitrageData();
  const avgProfit = opportunities.length > 0 
    ? opportunities.reduce((sum, o) => sum + o.profit_percentage, 0) / opportunities.length
    : 0;

  const renderPage = () => {
    switch (currentPage) {
      case 'feed':
        return <LiveFeed userTier={userTier} user={user} />;
      case 'tools':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black text-white mb-2">Tools & Calculators</h1>
              <p className="text-gray-400">Professional arbitrage tools to maximize your edge</p>
            </div>
            <StakeCalculator opportunityProfit={avgProfit} />
            <RiskAnalyzer opportunities={opportunities} />
          </div>
        );
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
        return <LiveFeed userTier={userTier} user={user} />;
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
