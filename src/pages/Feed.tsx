import { useState, useMemo, useEffect } from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { FilterState, ArbitrageOpportunity } from '../types/arbitrage';
import { mockArbitrageData } from '../data/mockData';
import { useUser } from '../contexts/UserContext';
import Sidebar from '../components/Sidebar';
import OpportunityGrid from '../components/OpportunityGrid';
import CalculatorModal from '../components/CalculatorModal';
import QuickFilters, { QuickFilter } from '../components/QuickFilters';
import Tooltip from '../components/Tooltip';

export default function Feed() {
  const { settings } = useUser();
  const [filters, setFilters] = useState<FilterState>({
    sports: ['football', 'basketball', 'tennis'],
    bookmakers: settings.enabledBookmakers,
    profitRange: [0, 10]
  });

  const [selectedOpportunity, setSelectedOpportunity] = useState<ArbitrageOpportunity | null>(null);
  const [quickFilter, setQuickFilter] = useState<QuickFilter>('all');
  const [dataRefresh, setDataRefresh] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataRefresh(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredOpportunities = useMemo(() => {
    let opportunities = mockArbitrageData.filter(opp => {
      if (!filters.sports.includes(opp.sport)) return false;

      if (opp.profit < filters.profitRange[0] || opp.profit > filters.profitRange[1]) return false;

      const allBookmakersEnabled = opp.outcomes.every(outcome =>
        settings.enabledBookmakers.includes(outcome.bookmaker)
      );
      if (!allBookmakersEnabled) return false;

      return true;
    });

    switch (quickFilter) {
      case 'highest-profit':
        opportunities = opportunities.sort((a, b) => b.profit - a.profit).slice(0, 5);
        break;
      case 'upcoming':
        opportunities = opportunities.filter(opp => {
          const diff = opp.startTime.getTime() - new Date().getTime();
          return diff < 60 * 60 * 1000;
        });
        break;
      case 'live':
        opportunities = opportunities.filter(opp => opp.isLive);
        break;
      case 'football':
        opportunities = opportunities.filter(opp => opp.sport === 'football');
        break;
      default:
        opportunities = opportunities.sort((a, b) => b.profit - a.profit);
    }

    return opportunities;
  }, [filters, settings.enabledBookmakers, quickFilter, dataRefresh]);

  const averageProfit = useMemo(() => {
    if (filteredOpportunities.length === 0) return 0;
    const sum = filteredOpportunities.reduce((acc, opp) => acc + opp.profit, 0);
    return sum / filteredOpportunities.length;
  }, [filteredOpportunities]);

  const liveCount = filteredOpportunities.filter(opp => opp.isLive).length;

  return (
    <>
      <div className="flex h-full">
        <Sidebar filters={filters} onFiltersChange={setFilters} />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">Live Arbitrage Opportunities</h1>
                  <p className="text-sm text-neutral-400">
                    Real-time opportunities filtered by your bookmakers
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#171717] border border-white/10 rounded-lg px-4 py-2">
                    <div className="text-xs text-neutral-500 mb-0.5 flex items-center">
                      Avg. Profit
                      <Tooltip text="Average profit percentage across all displayed opportunities" />
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-400" />
                      <span className="text-lg font-bold text-orange-400 transition-all duration-500">{averageProfit.toFixed(2)}%</span>
                    </div>
                  </div>

                  {liveCount > 0 && (
                    <div className="bg-[#171717] border border-white/10 rounded-lg px-4 py-2">
                      <div className="text-xs text-neutral-500 mb-0.5">Live Now</div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-lg font-bold text-red-400">{liveCount}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-500 mb-6">
                <span>
                  Showing <span className="font-semibold text-white">{filteredOpportunities.length}</span> opportunities
                </span>
                <span className="text-neutral-700">•</span>
                <span>
                  {settings.enabledBookmakers.length} bookmakers configured
                </span>
                <span className="text-neutral-700">•</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium">Live updates</span>
                </div>
              </div>

              <QuickFilters
                activeFilter={quickFilter}
                onFilterChange={setQuickFilter}
                liveCount={mockArbitrageData.filter(opp => opp.isLive).length}
              />
            </div>

            {settings.enabledBookmakers.length === 0 ? (
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-8 text-center">
                <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Configure Your Bookmakers</h3>
                <p className="text-neutral-400 mb-4">
                  You need to select at least one bookmaker to see arbitrage opportunities.
                </p>
                <button
                  onClick={() => window.location.hash = 'settings'}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all"
                >
                  Go to Settings
                </button>
              </div>
            ) : filteredOpportunities.length === 0 ? (
              <div className="bg-[#171717] border border-white/10 rounded-xl p-12 text-center">
                <div className="text-neutral-500 mb-2">No opportunities match your current filters</div>
                <div className="text-sm text-neutral-600">
                  Try adjusting your sport, bookmaker, or profit range filters
                </div>
              </div>
            ) : (
              <OpportunityGrid
                opportunities={filteredOpportunities}
                onCalculate={setSelectedOpportunity}
              />
            )}
          </div>
        </div>
      </div>

      {selectedOpportunity && (
        <CalculatorModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
        />
      )}
    </>
  );
}
