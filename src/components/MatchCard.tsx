import { Clock, Trophy, CircleDot, TrendingUp } from 'lucide-react';
import { ArbitrageOpportunity } from '../types/arbitrage';
import { formatTime } from '../utils/calculations';

interface MatchCardProps {
  opportunity: ArbitrageOpportunity;
  onClick: () => void;
}

export default function MatchCard({ opportunity, onClick }: MatchCardProps) {
  const getSportIcon = () => {
    switch (opportunity.sport) {
      case 'football':
        return <Trophy className="w-4 h-4" />;
      case 'basketball':
        return <Trophy className="w-4 h-4" />;
      case 'tennis':
        return <CircleDot className="w-4 h-4" />;
    }
  };

  const profitColor = opportunity.profit >= 5
    ? 'text-emerald-400'
    : opportunity.profit >= 3
    ? 'text-green-400'
    : 'text-orange-400';

  const profitBgColor = opportunity.profit >= 5
    ? 'bg-emerald-500/20 border-emerald-500/30'
    : opportunity.profit >= 3
    ? 'bg-green-500/20 border-green-500/30'
    : 'bg-orange-500/20 border-orange-500/30';

  return (
    <div
      onClick={onClick}
      className="bg-[#171717] border border-white/10 rounded-xl p-5 hover:border-orange-500/50 transition-all duration-200 cursor-pointer group hover:transform hover:scale-[1.01]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-neutral-400">
              {getSportIcon()}
            </div>
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
              {opportunity.league}
            </span>
            {opportunity.isLive && (
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-red-400 uppercase">Live</span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="text-sm font-semibold text-neutral-200">
              {opportunity.homeTeam}
            </div>
            <div className="text-sm font-semibold text-neutral-200">
              {opportunity.awayTeam}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 text-xs text-neutral-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(opportunity.startTime)}</span>
            <span className="text-neutral-600">•</span>
            <span>{opportunity.market}</span>
          </div>
        </div>

        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${profitBgColor}`}>
          <TrendingUp className={`w-4 h-4 ${profitColor}`} />
          <span className={`text-lg font-bold ${profitColor}`}>
            {opportunity.profit.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {opportunity.outcomes.map((outcome, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-[#0a0a0a] rounded-lg px-3 py-2.5 border border-white/5 group-hover:border-white/10 transition-colors"
          >
            <div className="flex-1">
              <div className="text-sm font-medium text-neutral-300">{outcome.label}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{outcome.bookmaker}</div>
            </div>
            <div className="text-base font-bold text-white">
              {outcome.odds.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
