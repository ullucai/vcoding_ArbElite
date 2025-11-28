import { AlertTriangle, ShieldCheck, TrendingUp, Clock } from 'lucide-react';

interface RiskAnalyzerProps {
  opportunities: any[];
}

export function RiskAnalyzer({ opportunities }: RiskAnalyzerProps) {
  if (opportunities.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-6 text-center">
        <AlertTriangle size={32} className="text-gray-600 mx-auto mb-2" />
        <p className="text-gray-400">No opportunities to analyze</p>
      </div>
    );
  }

  const avgRiskScore = (opportunities.reduce((sum, o) => sum + o.risk_score, 0) / opportunities.length).toFixed(1);
  const lowRiskCount = opportunities.filter(o => o.risk_score <= 3).length;
  const mediumRiskCount = opportunities.filter(o => o.risk_score > 3 && o.risk_score <= 6).length;
  const highRiskCount = opportunities.filter(o => o.risk_score > 6).length;

  const avgProfit = (opportunities.reduce((sum, o) => sum + o.profit_percentage, 0) / opportunities.length).toFixed(2);
  const highProfitOpp = opportunities.filter(o => o.profit_percentage > 5).length;

  // Calculate timing risk
  const now = Date.now();
  const avgTimeToEvent = opportunities.reduce((sum, o) => {
    return sum + (new Date(o.commence_time).getTime() - now);
  }, 0) / opportunities.length;
  const hoursToEvent = avgTimeToEvent / (1000 * 60 * 60);

  return (
    <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-purple-500/20 p-2 rounded-lg">
          <ShieldCheck size={24} className="text-purple-500" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white">Risk Analysis</h3>
          <p className="text-xs text-gray-500">Portfolio risk metrics</p>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-white">Risk Distribution</span>
            <span className="text-xs text-gray-500">Avg Risk: {avgRiskScore}/10</span>
          </div>
          
          <div className="space-y-2">
            {/* Low Risk */}
            <div className="flex items-center gap-3">
              <div className="w-24">
                <div className="text-xs font-semibold text-green-400">Low Risk</div>
                <div className="text-[10px] text-gray-600">{lowRiskCount} opportunities</div>
              </div>
              <div className="flex-1 bg-[#0a0a0a] rounded-full h-2">
                <div 
                  className="bg-green-500 h-full rounded-full" 
                  style={{ width: `${(lowRiskCount / opportunities.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Medium Risk */}
            <div className="flex items-center gap-3">
              <div className="w-24">
                <div className="text-xs font-semibold text-yellow-400">Medium Risk</div>
                <div className="text-[10px] text-gray-600">{mediumRiskCount} opportunities</div>
              </div>
              <div className="flex-1 bg-[#0a0a0a] rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-full rounded-full" 
                  style={{ width: `${(mediumRiskCount / opportunities.length) * 100}%` }}
                />
              </div>
            </div>

            {/* High Risk */}
            <div className="flex items-center gap-3">
              <div className="w-24">
                <div className="text-xs font-semibold text-red-400">High Risk</div>
                <div className="text-[10px] text-gray-600">{highRiskCount} opportunities</div>
              </div>
              <div className="flex-1 bg-[#0a0a0a] rounded-full h-2">
                <div 
                  className="bg-red-500 h-full rounded-full" 
                  style={{ width: `${(highRiskCount / opportunities.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Avg Profit</div>
          <div className="text-lg font-black text-blue-400">{avgProfit}%</div>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
          <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">High Yield</div>
          <div className="text-lg font-black text-green-400">{highProfitOpp}</div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
          <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Time to Event</div>
          <div className="text-lg font-black text-purple-400">{hoursToEvent.toFixed(1)}h</div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-lg p-4 flex gap-3">
        <TrendingUp size={20} className="text-orange-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <div className="font-bold text-orange-400 mb-1">Strategy Recommendation</div>
          <div className="text-xs text-orange-300">
            {avgRiskScore > 6 
              ? `Portfolio is high-risk. Consider filtering for lower risk opportunities (scores < 4).`
              : avgRiskScore > 3
              ? `Balanced risk profile. Proceed with standard Kelly position sizing.`
              : `Low-risk portfolio. You can increase position sizes if bankroll management allows.`}
          </div>
        </div>
      </div>
    </div>
  );
}
