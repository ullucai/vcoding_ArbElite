import { Trophy, CircleDot, Building2 } from 'lucide-react';
import { FilterState, Sport } from '../types/arbitrage';
import { bookmakers } from '../data/mockData';

interface SidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function Sidebar({ filters, onFiltersChange }: SidebarProps) {
  const sports: { id: Sport; label: string; icon: React.ReactNode }[] = [
    { id: 'football', label: 'Football', icon: <Trophy className="w-4 h-4" /> },
    { id: 'basketball', label: 'Basketball', icon: <Trophy className="w-4 h-4" /> },
    { id: 'tennis', label: 'Tennis', icon: <CircleDot className="w-4 h-4" /> }
  ];

  const toggleSport = (sport: Sport) => {
    const newSports = filters.sports.includes(sport)
      ? filters.sports.filter(s => s !== sport)
      : [...filters.sports, sport];
    onFiltersChange({ ...filters, sports: newSports });
  };

  const toggleBookmaker = (bookmaker: string) => {
    const newBookmakers = filters.bookmakers.includes(bookmaker)
      ? filters.bookmakers.filter(b => b !== bookmaker)
      : [...filters.bookmakers, bookmaker];
    onFiltersChange({ ...filters, bookmakers: newBookmakers });
  };

  const handleProfitRangeChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.profitRange];
    newRange[index] = value;
    onFiltersChange({ ...filters, profitRange: newRange });
  };

  return (
    <aside className="w-64 bg-[#171717] border-r border-white/10 overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            Sports
          </h3>
          <div className="space-y-2">
            {sports.map(sport => (
              <button
                key={sport.id}
                onClick={() => toggleSport(sport.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  filters.sports.includes(sport.id)
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                {sport.icon}
                <span className="text-sm font-medium">{sport.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            Bookmakers
          </h3>
          <div className="space-y-2">
            {bookmakers.map(bookmaker => (
              <button
                key={bookmaker}
                onClick={() => toggleBookmaker(bookmaker)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  filters.bookmakers.includes(bookmaker)
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">{bookmaker}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            Profit Range
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-neutral-500 mb-2">
                <span>Min</span>
                <span className="text-orange-400 font-semibold">{filters.profitRange[0]}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={filters.profitRange[0]}
                onChange={(e) => handleProfitRangeChange(0, parseFloat(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-neutral-500 mb-2">
                <span>Max</span>
                <span className="text-orange-400 font-semibold">{filters.profitRange[1]}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={filters.profitRange[1]}
                onChange={(e) => handleProfitRangeChange(1, parseFloat(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
