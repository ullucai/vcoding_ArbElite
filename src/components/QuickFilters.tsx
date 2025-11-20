import { TrendingUp, Clock, Zap, Trophy } from 'lucide-react';

export type QuickFilter = 'all' | 'highest-profit' | 'upcoming' | 'live' | 'football';

interface QuickFiltersProps {
  activeFilter: QuickFilter;
  onFilterChange: (filter: QuickFilter) => void;
  liveCount: number;
}

export default function QuickFilters({ activeFilter, onFilterChange, liveCount }: QuickFiltersProps) {
  const filters = [
    { id: 'all' as const, label: 'All Opportunities', icon: <Zap className="w-4 h-4" /> },
    { id: 'highest-profit' as const, label: 'Highest Profit', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'upcoming' as const, label: 'Next Hour', icon: <Clock className="w-4 h-4" /> },
    { id: 'live' as const, label: `Live (${liveCount})`, icon: <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> },
    { id: 'football' as const, label: 'Football Only', icon: <Trophy className="w-4 h-4" /> }
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeFilter === filter.id
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
              : 'bg-[#171717] border border-white/10 text-neutral-400 hover:bg-white/5 hover:text-white hover:border-white/20'
          }`}
        >
          {filter.icon}
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
}
