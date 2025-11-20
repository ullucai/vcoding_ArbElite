import React, { useState } from 'react';
import { TrendingUp, Filter, SlidersHorizontal, RefreshCw, Zap, Calendar, Clock, Lock, ChevronRight } from 'lucide-react';

interface LiveFeedProps {
  userTier: 'free' | 'pro' | 'admin';
}

export default function LiveFeed({ userTier }: LiveFeedProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSport, setSelectedSport] = useState('all');
  const [minYield, setMinYield] = useState(2.0);

  const sports = ['all', 'Football', 'Basketball', 'Tennis', 'Ice Hockey', 'Baseball'];

  const opportunities = [
    {
      id: '1',
      sport: 'Football',
      league: 'Premier League',
      event: 'Manchester City vs Arsenal',
      startTime: '2h 15m',
      yield: 4.8,
      profit: 60,
      bookmaker1: 'Pinnacle',
      odds1: 2.15,
      outcome1: 'Home',
      bookmaker2: 'Bet365',
      odds2: 3.40,
      outcome2: 'Away',
      decayTime: '2m 45s'
    },
    {
      id: '2',
      sport: 'Basketball',
      league: 'NBA',
      event: 'Lakers vs Celtics',
      startTime: '5h 30m',
      yield: 3.2,
      profit: 31.36,
      bookmaker1: 'Unibet',
      odds1: 1.95,
      outcome1: 'Over 215.5',
      bookmaker2: 'Betfair',
      odds2: 2.05,
      outcome2: 'Under 215.5',
      decayTime: '4m 12s'
    },
    {
      id: '3',
      sport: 'Tennis',
      league: 'ATP Australian Open',
      event: 'Djokovic vs Alcaraz',
      startTime: '1h 45m',
      yield: 6.5,
      profit: 97.5,
      bookmaker1: 'Pinnacle',
      odds1: 1.85,
      outcome1: 'Djokovic',
      bookmaker2: '1xBet',
      odds2: 2.30,
      outcome2: 'Alcaraz',
      decayTime: '1m 28s'
    },
    {
      id: '4',
      sport: 'Ice Hockey',
      league: 'NHL',
      event: 'Boston Bruins vs NY Rangers',
      startTime: '3h 20m',
      yield: 2.9,
      profit: 21.75,
      bookmaker1: 'Bet365',
      odds1: 2.10,
      outcome1: 'Bruins',
      bookmaker2: 'Betfair',
      odds2: 2.25,
      outcome2: 'Rangers',
      decayTime: '3m 55s'
    },
    {
      id: '5',
      sport: 'Football',
      league: 'La Liga',
      event: 'Real Madrid vs Barcelona',
      startTime: '6h 00m',
      yield: 5.4,
      profit: 108,
      bookmaker1: 'Pinnacle',
      odds1: 2.05,
      outcome1: 'Draw',
      bookmaker2: 'Unibet',
      odds2: 2.15,
      outcome2: 'Away',
      decayTime: '5m 20s'
    },
    {
      id: '6',
      sport: 'Tennis',
      league: 'WTA Indian Wells',
      event: 'Swiatek vs Sabalenka',
      startTime: '4h 10m',
      yield: 3.7,
      profit: 40.7,
      bookmaker1: 'Bet365',
      odds1: 1.90,
      outcome1: 'Swiatek',
      bookmaker2: '1xBet',
      odds2: 2.20,
      outcome2: 'Sabalenka',
      decayTime: '2m 33s'
    },
    {
      id: '7',
      sport: 'Basketball',
      league: 'Euroleague',
      event: 'Real Madrid vs Barcelona',
      startTime: '7h 00m',
      yield: 4.1,
      profit: 53,
      bookmaker1: 'Pinnacle',
      odds1: 2.00,
      outcome1: 'Real',
      bookmaker2: 'Unibet',
      odds2: 2.10,
      outcome2: 'Barca',
      decayTime: '6m 15s'
    },
    {
      id: '8',
      sport: 'Football',
      league: 'Bundesliga',
      event: 'Bayern Munich vs Dortmund',
      startTime: '8h 15m',
      yield: 3.5,
      profit: 45,
      bookmaker1: 'Bet365',
      odds1: 1.95,
      outcome1: 'Home',
      bookmaker2: 'Betfair',
      odds2: 2.25,
      outcome2: 'Away',
      decayTime: '7m 40s'
    }
  ];

  const filteredOpportunities = opportunities
    .filter(opp => selectedSport === 'all' || opp.sport === selectedSport)
    .filter(opp => opp.yield >= minYield);

  const visibleCount = userTier === 'free' ? 3 : filteredOpportunities.length;
  const lockedCount = filteredOpportunities.length - visibleCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Live Arbitrage Feed</h1>
          <p className="text-gray-400">Real-time opportunities across global bookmakers</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold text-sm transition-all border ${
              showFilters ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 rounded-lg flex items-center gap-2 transition font-semibold text-sm">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={18} className="text-orange-500" />
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Active Opportunities</span>
          </div>
          <div className="text-3xl font-black text-white">{filteredOpportunities.length}</div>
        </div>

        <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-green-500" />
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Avg Yield</span>
          </div>
          <div className="text-3xl font-black text-green-400">
            {(filteredOpportunities.reduce((sum, o) => sum + o.yield, 0) / filteredOpportunities.length).toFixed(1)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={18} className="text-blue-500" />
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Markets</span>
          </div>
          <div className="text-3xl font-black text-white">12</div>
        </div>

        <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} className="text-purple-500" />
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Scan Rate</span>
          </div>
          <div className="text-3xl font-black text-white">0.2s</div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">Sport</label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 transition font-semibold text-sm"
              >
                {sports.map(sport => (
                  <option key={sport} value={sport}>{sport === 'all' ? 'All Sports' : sport}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">
                Min Yield: {minYield}%
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={minYield}
                onChange={(e) => setMinYield(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div className="flex items-end">
              <button className="w-full bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 text-orange-400 font-bold py-2 rounded-lg transition">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Opportunities List */}
      <div className="relative">
        <div className="space-y-3">
          {filteredOpportunities.slice(0, visibleCount).map((opp) => (
            <div
              key={opp.id}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-orange-500/40 rounded-xl p-5 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-orange-500/5"
            >
              <div className="flex items-center justify-between">
                {/* Event Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/5 px-3 py-2 rounded-lg border border-orange-500/30">
                    <span className="text-xs font-black text-orange-400 uppercase">{opp.sport}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-bold text-sm mb-1">{opp.event}</div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{opp.league}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {opp.startTime}
                      </span>
                      <span>•</span>
                      <span className="text-orange-400 font-semibold">Decay: {opp.decayTime}</span>
                    </div>
                  </div>
                </div>

                {/* Bookmakers */}
                <div className="flex gap-4 mx-8">
                  <div className="bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-lg text-center min-w-[100px]">
                    <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">{opp.bookmaker1}</div>
                    <div className="text-sm font-black text-white">{opp.outcome1}</div>
                    <div className="text-xs text-blue-400 font-bold">{opp.odds1.toFixed(2)}</div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-lg text-center min-w-[100px]">
                    <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">{opp.bookmaker2}</div>
                    <div className="text-sm font-black text-white">{opp.outcome2}</div>
                    <div className="text-xs text-green-400 font-bold">{opp.odds2.toFixed(2)}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-[10px] text-gray-500 font-semibold uppercase">Yield</div>
                    <div className="text-2xl font-black text-green-400">{opp.yield.toFixed(1)}%</div>
                  </div>
                  <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-lg shadow-orange-600/30 opacity-0 group-hover:opacity-100 flex items-center gap-2">
                    Execute <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free Tier Lock Overlay */}
        {userTier === 'free' && lockedCount > 0 && (
          <div className="relative mt-3">
            <div className="absolute inset-0 z-10 backdrop-blur-md bg-[#0a0a0a]/60 rounded-xl flex items-center justify-center">
              <div className="text-center bg-gradient-to-br from-[#171717] to-[#0f0f0f] border-2 border-orange-500/40 rounded-2xl p-8 max-w-md">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/40">
                  <Lock size={28} className="text-orange-500" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Unlock {lockedCount} More Opportunities</h3>
                <p className="text-gray-400 mb-6">Upgrade to Pro to access unlimited arbitrage opportunities</p>
                <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-3 rounded-lg transition-all hover:scale-105 shadow-xl shadow-orange-600/40">
                  Upgrade to Pro
                </button>
              </div>
            </div>

            {/* Blurred Preview */}
            <div className="filter blur-xl opacity-30 pointer-events-none space-y-3">
              {filteredOpportunities.slice(visibleCount).map((opp) => (
                <div key={opp.id} className="bg-white/5 border border-white/10 rounded-xl p-5 h-24" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
