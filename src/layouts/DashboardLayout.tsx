import { useState } from 'react';
import { Settings, TrendingUp, BarChart3, User, LogOut, Menu, X, Bell, Search, Zap } from 'lucide-react';
import Logo from '../components/Logo';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userTier: 'free' | 'pro' | 'admin';
}

export default function DashboardLayout({ children, currentPage, onNavigate, onLogout, userTier }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const handleLogoutClick = () => {
    setLogoutConfirmOpen(true);
  };

  const confirmLogout = () => {
    setLogoutConfirmOpen(false);
    onLogout();
  };

  const menuItems = [
    { id: 'feed', label: 'Live Feed', icon: TrendingUp, tier: 'free' },
    { id: 'tools', label: 'Tools', icon: Zap, tier: 'free' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, tier: 'pro' },
    { id: 'settings', label: 'Settings', icon: Settings, tier: 'free' },
    { id: 'profile', label: 'Profile', icon: User, tier: 'free' },
  ];

  const tierBadges = {
    free: { label: 'Free', color: 'gray' },
    pro: { label: 'Pro', color: 'orange' },
    admin: { label: 'Admin', color: 'purple' }
  };

  const currentBadge = tierBadges[userTier];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-400 hover:text-white transition"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Logo />
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-48"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition">
              <Bell size={18} className="text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            </button>

            {/* User Badge */}
            <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${
              currentBadge.color === 'orange' ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' :
              currentBadge.color === 'purple' ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' :
              'bg-gray-500/20 border-gray-500/50 text-gray-400'
            }`}>
              {currentBadge.label}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogoutClick}
              className="p-2 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-lg transition text-gray-400 hover:text-red-400"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed top-20 left-0 bottom-0 z-30 bg-gradient-to-b from-[#171717] to-[#0f0f0f] border-r border-white/10 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-0 lg:w-20'
      } overflow-hidden`}>
        <div className="p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isLocked = item.tier === 'pro' && userTier === 'free';
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => !isLocked && onNavigate(item.id)}
                disabled={isLocked}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/50 text-white shadow-lg shadow-orange-500/10'
                    : isLocked
                    ? 'bg-white/5 border border-white/5 text-gray-600 cursor-not-allowed'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && (
                  <span className="font-semibold text-sm flex-1 text-left">{item.label}</span>
                )}
                {isLocked && sidebarOpen && (
                  <span className="text-[10px] bg-orange-500/20 border border-orange-500/50 text-orange-400 px-2 py-0.5 rounded-full font-bold">
                    PRO
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Upgrade Banner for Free Users */}
        {userTier === 'free' && sidebarOpen && (
          <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-4">
            <h4 className="text-white font-bold text-sm mb-2">Upgrade to Pro</h4>
            <p className="text-gray-400 text-xs mb-3">Unlock all features and unlimited arbitrage opportunities</p>
            <button onClick={() => window.location.href = '/pricing'} className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold text-xs py-2 rounded-lg transition-all hover:scale-105">
              Upgrade Now
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`pt-20 transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}`}>
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-[#171717] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2">Confirm Logout</h2>
            <p className="text-gray-400 mb-6">Are you sure you want to log out?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
