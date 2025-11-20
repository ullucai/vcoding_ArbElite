import { TrendingUp, History, Settings as SettingsIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface AppSidebarProps {
  currentPage: 'feed' | 'tracker' | 'settings';
  onNavigate: (page: 'feed' | 'tracker' | 'settings') => void;
}

export default function AppSidebar({ currentPage, onNavigate }: AppSidebarProps) {
  const { settings, toggleSidebar } = useUser();
  const { sidebarCollapsed } = settings;

  const navItems = [
    { id: 'feed' as const, label: 'Live Feed', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'tracker' as const, label: 'Bet Tracker', icon: <History className="w-5 h-5" /> },
    { id: 'settings' as const, label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> }
  ];

  return (
    <aside className={`bg-[#171717] border-r border-white/10 transition-all duration-300 ${
      sidebarCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="p-4">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 transition-colors text-neutral-400 hover:text-white mb-6"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>

        <nav className="space-y-2">
          {navItems.map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                {item.icon}
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
