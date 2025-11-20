import { Calculator, Clock } from 'lucide-react';
import { ArbitrageOpportunity } from '../types/arbitrage';
import { formatTime } from '../utils/calculations';

interface OpportunityGridProps {
  opportunities: ArbitrageOpportunity[];
  onCalculate: (opportunity: ArbitrageOpportunity) => void;
}

export default function OpportunityGrid({ opportunities, onCalculate }: OpportunityGridProps) {
  const getProfitColor = (profit: number) => {
    if (profit >= 5) return 'text-emerald-400';
    if (profit >= 3) return 'text-green-400';
    if (profit >= 2) return 'text-orange-400';
    return 'text-orange-300';
  };

  return (
    <div className="bg-[#171717] border border-white/10 rounded-xl overflow-hidden">
      <div className="grid grid-cols-[120px_1fr_140px_auto_100px_60px] gap-4 px-4 py-3 bg-[#0a0a0a] border-b border-white/10 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
        <div>Time & League</div>
        <div>Match</div>
        <div>Market</div>
        <div>Arbitrage</div>
        <div className="text-right">Profit</div>
        <div className="text-right">Action</div>
      </div>

      <div className="divide-y divide-white/5">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="grid grid-cols-[120px_1fr_140px_auto_100px_60px] gap-4 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer group"
            onClick={() => onCalculate(opp)}
          >
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                <Clock className="w-3 h-3" />
                <span>{formatTime(opp.startTime)}</span>
              </div>
              <div className="text-xs text-neutral-500 truncate">{opp.league}</div>
              {opp.isLive && (
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-red-400 uppercase">Live</span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-sm font-semibold text-white truncate">
                {opp.homeTeam} vs {opp.awayTeam}
              </div>
            </div>

            <div className="flex items-center">
              <span className="inline-flex px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 rounded text-xs font-medium text-orange-400">
                {opp.market}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {opp.outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-[#0a0a0a] border border-white/5 rounded px-3 py-2 min-w-[140px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-neutral-300 truncate">
                        {outcome.label}
                      </div>
                      <div className="text-xs text-neutral-500 truncate">{outcome.bookmaker}</div>
                    </div>
                    <div className="text-sm font-bold text-white ml-2">
                      {outcome.odds.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end">
              <span className={`text-lg font-bold ${getProfitColor(opp.profit)}`}>
                +{opp.profit.toFixed(2)}%
              </span>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCalculate(opp);
                }}
                className="w-9 h-9 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/40 rounded-lg flex items-center justify-center text-orange-400 transition-all group-hover:scale-110"
              >
                <Calculator className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
