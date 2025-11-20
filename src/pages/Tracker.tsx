import { useState } from 'react';
import { TrendingUp, DollarSign, Percent, Filter, Calendar } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { formatCurrency } from '../utils/calculations';

export default function Tracker() {
  const { betHistory, updateBetStatus, totalProfit, totalInvestment, roi } = useUser();
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'settled' | 'cancelled'>('all');

  const filteredHistory = statusFilter === 'all'
    ? betHistory
    : betHistory.filter(bet => bet.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'settled':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'pending':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'cancelled':
        return 'text-neutral-400 bg-neutral-500/10 border-neutral-500/20';
      default:
        return 'text-neutral-400 bg-neutral-500/10 border-neutral-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Bet Tracker</h1>
        <p className="text-neutral-400">Track your arbitrage betting history and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#171717] to-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-neutral-400">Total Profit</div>
              <div className="text-xs text-neutral-500">All Time</div>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-400">
            {formatCurrency(totalProfit)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#171717] to-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-neutral-400">Total Investment</div>
              <div className="text-xs text-neutral-500">Settled Bets</div>
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            {formatCurrency(totalInvestment)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#171717] to-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Percent className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-neutral-400">ROI</div>
              <div className="text-xs text-neutral-500">Return on Investment</div>
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-400">
            {roi.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="bg-[#171717] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-neutral-400" />
              <span className="text-sm font-semibold text-white">Filter by Status</span>
            </div>

            <div className="flex gap-2">
              {(['all', 'pending', 'settled', 'cancelled'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    statusFilter === status
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0a0a] border-b border-white/10">
              <tr className="text-left">
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">
                  Profit %
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">
                  Investment
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">
                  Net Profit
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                    No bets found. Start tracking your arbitrage bets to see them here.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((bet) => (
                  <tr key={bet.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm text-neutral-400">
                      {bet.date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {bet.event}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-orange-400 text-right">
                      +{bet.profitPercentage.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-sm text-white text-right">
                      {formatCurrency(bet.investment)}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-400 text-right">
                      {formatCurrency(bet.netProfit)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(bet.status)}`}>
                        {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={bet.status}
                        onChange={(e) => updateBetStatus(bet.id, e.target.value as any)}
                        className="bg-[#0a0a0a] border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                      >
                        <option value="pending">Pending</option>
                        <option value="settled">Settled</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
