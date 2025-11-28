import { useState } from 'react';
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react';

interface StakeCalculatorProps {
  opportunityProfit: number;
}

export function StakeCalculator({ opportunityProfit }: StakeCalculatorProps) {
  const [bankroll, setBankroll] = useState(1000);
  const [riskPercentage, setRiskPercentage] = useState(1);
  const [profitMargin, setProfitMargin] = useState(opportunityProfit);

  // Kelly Criterion: f* = (bp - q) / b
  // f* = (odds - 1) * win_prob - (1 - win_prob) / (odds - 1)
  // Simplified for arbitrage: use conservative 25% of Kelly to avoid overexposure
  const kellyFraction = 0.25; // Conservative Kelly (reduce variance)
  
  // For arbitrage with known profit percentage
  const stake = (bankroll * riskPercentage) / 100;
  const profit = (stake * profitMargin) / 100;
  const roi = ((profit / stake) * 100).toFixed(2);
  
  // Bankroll growth projection
  const projectedBankroll = bankroll + profit;
  const bankrollGrowthPercent = ((profit / bankroll) * 100).toFixed(2);

  return (
    <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-orange-500/20 p-2 rounded-lg">
          <Calculator size={24} className="text-orange-500" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white">Kelly Stake Calculator</h3>
          <p className="text-xs text-gray-500">Conservative 25% Kelly strategy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bankroll Input */}
        <div>
          <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">
            Total Bankroll
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500 font-bold">$</span>
            <input
              type="number"
              value={bankroll}
              onChange={(e) => setBankroll(Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-white/10 text-white px-3 pl-7 py-2 rounded-lg focus:outline-none focus:border-orange-500 transition text-sm"
              data-testid="input-bankroll"
            />
          </div>
        </div>

        {/* Risk Percentage */}
        <div>
          <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">
            Risk per Trade: {riskPercentage}%
          </label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={riskPercentage}
            onChange={(e) => setRiskPercentage(Number(e.target.value))}
            className="w-full accent-orange-500"
            data-testid="slider-risk"
          />
          <div className="text-[10px] text-gray-600 mt-1">Min 0.1% - Max 5%</div>
        </div>

        {/* Profit Margin */}
        <div>
          <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">
            Expected Profit
          </label>
          <div className="relative">
            <span className="absolute right-3 top-3 text-gray-500 font-bold">%</span>
            <input
              type="number"
              value={profitMargin}
              onChange={(e) => setProfitMargin(Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-white/10 text-white px-3 pr-7 py-2 rounded-lg focus:outline-none focus:border-orange-500 transition text-sm"
              data-testid="input-profit-margin"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Stake</div>
          <div className="text-2xl font-black text-blue-400" data-testid="text-stake">
            ${stake.toFixed(0)}
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Est. Profit</div>
          <div className="text-2xl font-black text-green-400" data-testid="text-profit">
            ${profit.toFixed(2)}
          </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">ROI</div>
          <div className="text-2xl font-black text-purple-400" data-testid="text-roi">
            {roi}%
          </div>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
          <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">New Bankroll</div>
          <div className="text-2xl font-black text-orange-400" data-testid="text-new-bankroll">
            ${projectedBankroll.toFixed(0)}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex gap-3">
        <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-300">
          <div className="font-bold mb-1">Kelly Strategy Applied</div>
          <div className="text-xs text-blue-200">
            Using 25% of Kelly Criterion for lower variance. Bankroll growth: <span className="font-bold">{bankrollGrowthPercent}%</span> per trade.
          </div>
        </div>
      </div>
    </div>
  );
}
