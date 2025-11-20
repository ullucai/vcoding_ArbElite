import { useState, useEffect } from 'react';
import { X, Calculator, TrendingUp, DollarSign, Ticket, Plus, ArrowRight } from 'lucide-react';
import { ArbitrageOpportunity } from '../types/arbitrage';
import { calculateArbitrageStakes, formatCurrency, CalculationResult } from '../utils/calculations';
import { useUser } from '../contexts/UserContext';

interface CalculatorModalProps {
  opportunity: ArbitrageOpportunity;
  onClose: () => void;
}

export default function CalculatorModal({ opportunity, onClose }: CalculatorModalProps) {
  const [totalStake, setTotalStake] = useState<string>('1000');
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);
  const { settings, addBet } = useUser();

  useEffect(() => {
    const stake = parseFloat(totalStake);
    if (!isNaN(stake) && stake > 0) {
      const result = calculateArbitrageStakes(opportunity.outcomes, stake, settings.roundStakes);
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [totalStake, opportunity.outcomes, settings.roundStakes]);

  const handleAddToTracker = () => {
    if (calculation) {
      addBet({
        date: new Date(),
        event: `${opportunity.homeTeam} vs ${opportunity.awayTeam}`,
        profitPercentage: calculation.profitPercentage,
        investment: calculation.totalStake,
        netProfit: calculation.guaranteedProfit,
        status: 'pending'
      });
      onClose();
    }
  };

  const handleStakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setTotalStake(value);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#171717] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#171717] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Betting Ticket</h2>
              <p className="text-xs text-neutral-500">Calculate optimal stake distribution</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
            <div className="text-sm text-neutral-400 mb-2">{opportunity.league}</div>
            <div className="text-lg font-bold text-white mb-1">
              {opportunity.homeTeam} vs {opportunity.awayTeam}
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <span>{opportunity.market}</span>
              <span className="text-neutral-600">•</span>
              <span className="text-orange-400 font-semibold">{opportunity.profit.toFixed(2)}% profit</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-neutral-300">
                Total Stake Amount
              </label>
              <button
                onClick={() => settings.roundStakes ? '' : ''}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  settings.roundStakes
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'bg-white/5 text-neutral-400 border border-white/10'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                Round Stakes
              </button>
            </div>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                value={totalStake}
                onChange={handleStakeChange}
                placeholder="1000"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-12 py-4 text-lg font-bold text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
            {settings.roundStakes && (
              <p className="text-xs text-neutral-500 mt-2">
                Stakes will be rounded to avoid suspicion from bookmakers
              </p>
            )}
          </div>

          {calculation && (
            <>
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-orange-300 mb-1">Guaranteed Profit</div>
                    <div className="text-3xl font-bold text-orange-400">
                      {formatCurrency(calculation.guaranteedProfit)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                    <span className="text-xl font-bold text-orange-400">
                      {calculation.profitPercentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-300 mb-3 uppercase tracking-wide">
                  Stake Distribution
                </h3>
                <div className="space-y-3">
                  {calculation.stakes.map((stake, index) => {
                    const isHighest = stake.stake === Math.max(...calculation.stakes.map(s => s.stake));
                    return (
                      <div
                        key={index}
                        className={`bg-[#0a0a0a] border rounded-xl p-4 transition-all ${
                          isHighest
                            ? 'border-orange-500/50 ring-2 ring-orange-500/20'
                            : 'border-white/10 hover:border-orange-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="text-sm font-semibold text-white mb-1">
                              {stake.outcome.label}
                              {isHighest && (
                                <span className="ml-2 text-xs text-orange-400 font-bold">HIGHEST</span>
                              )}
                            </div>
                            <div className="text-xs text-neutral-500">
                              {stake.outcome.bookmaker} @ {stake.outcome.odds.toFixed(2)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-orange-400">
                              {formatCurrency(stake.stake)}
                            </div>
                            <div className="text-xs text-neutral-500">
                              {((stake.stake / calculation.totalStake) * 100).toFixed(1)}% of total
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden mb-3">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${(stake.stake / calculation.totalStake) * 100}%` }}
                          />
                        </div>
                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-lg text-sm text-neutral-400 hover:text-orange-400 font-medium transition-all flex items-center justify-center gap-2 group">
                          <span>Place Bet at {stake.outcome.bookmaker}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                <div className="text-xs text-neutral-500 mb-3 uppercase tracking-wide font-semibold">
                  Summary
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Total Investment</span>
                    <span className="font-semibold text-white">{formatCurrency(calculation.totalStake)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Guaranteed Return</span>
                    <span className="font-semibold text-white">{formatCurrency(calculation.stakes[0].potentialReturn)}</span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between text-base">
                    <span className="text-neutral-300 font-semibold">Net Profit</span>
                    <span className="font-bold text-orange-400">{formatCurrency(calculation.guaranteedProfit)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToTracker}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25"
              >
                <Plus className="w-5 h-5" />
                Add to Bet Tracker
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
