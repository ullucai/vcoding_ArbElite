import React, { useState } from 'react';
import { Settings, Wallet, ShieldCheck, Power, Filter, Lock, Activity, TrendingUp, ChevronDown, Search, SlidersHorizontal, RefreshCw, Zap, Clock, Calendar, BarChart3, X } from 'lucide-react';

interface ArbitrageOpportunity {
  id: string;
  sport: string;
  league: string;
  event: string;
  startTime: string;
  yield: number;
  stake: number;
  profit: number;
  bookmaker1: string;
  odds1: number;
  outcome1: string;
  bookmaker2: string;
  odds2: number;
  outcome2: string;
  decayTime: string;
}

export default function ProfessionalDashboard({ isUserLoggedIn, onRequestLogin }: { isUserLoggedIn: boolean, onRequestLogin: () => void }) {
  const [bankroll, setBankroll] = useState(5000);
  const [selectedSport, setSelectedSport] = useState('all');
  const [minYield, setMinYield] = useState(2.0);
  const [sortBy, setSortBy] = useState('yield');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [bookies, setBookies] = useState([
    { name: 'Pinnacle', active: true, color: 'blue' },
    { name: 'Bet365', active: true, color: 'green' },
    { name: '1xBet', active: true, color: 'blue' },
    { name: 'Unibet', active: true, color: 'green' },
    { name: 'Betfair', active: true, color: 'yellow' },
    { name: 'WilliamHill', active: false, color: 'blue' },
    { name: '888sport', active: false, color: 'orange' },
    { name: 'Betway', active: false, color: 'red' },
  ]);

  const sports = ['all', 'Football', 'Basketball', 'Tennis', 'Ice Hockey', 'Volleyball', 'Baseball'];

  const opportunities: ArbitrageOpportunity[] = [
    {
      id: '1',
      sport: 'Football',
      league: 'Premier League',
      event: 'Manchester City vs Arsenal',
      startTime: '2h 15m',
      yield: 4.8,
      stake: 1250,
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
      stake: 980,
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
      stake: 1500,
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
      stake: 750,
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
      stake: 2000,
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
      stake: 1100,
      profit: 40.7,
      bookmaker1: 'Bet365',
      odds1: 1.90,
      outcome1: 'Swiatek',
      bookmaker2: '1xBet',
      odds2: 2.20,
      outcome2: 'Sabalenka',
      decayTime: '2m 33s'
    }
  ];

  const filteredOpportunities = opportunities
    .filter(opp => selectedSport === 'all' || opp.sport === selectedSport)
    .filter(opp => opp.yield >= minYield)
    .filter(opp => searchQuery === '' || opp.event.toLowerCase().includes(searchQuery.toLowerCase()) || opp.league.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'yield') return b.yield - a.yield;
      if (sortBy === 'profit') return b.profit - a.profit;
      if (sortBy === 'time') return parseInt(a.startTime) - parseInt(b.startTime);
      return 0;
    });

  const isLocked = !isUserLoggedIn;
  const avgYield = filteredOpportunities.length > 0 ? filteredOpportunities.reduce((sum, opp) => sum + opp.yield, 0) / filteredOpportunities.length : 0;
  const totalProfit = filteredOpportunities.reduce((sum, opp) => sum + opp.profit, 0);
  const activeBookies = bookies.filter(b => b.active).length;

  return (
    <div className="pt-24 px-4 md:px-8 max-w-[1800px] mx-auto pb-12 min-h-screen relative">
      {/* TOP STATS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Wallet size={16} className="text-orange-500" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Bankroll</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-orange-500 font-bold">$</span>
            <input
              type="number"
              value={bankroll}
              onChange={(e) => setBankroll(Number(e.target.value))}
              className="bg-transparent text-xl font-black text-white w-24 focus:outline-none border-b border-transparent hover:border-white/10 focus:border-orange-500 transition"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-green-500" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Avg Yield</span>
          </div>
          <div className="text-xl font-black text-green-400">{avgYield.toFixed(2)}%</div>
        </div>

        <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={16} className="text-blue-500" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Profit</span>
          </div>
          <div className="text-xl font-black text-white">${totalProfit.toFixed(2)}</div>
        </div>

        <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-purple-500" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Active Arbs</span>
          </div>
          <div className="text-xl font-black text-white">{filteredOpportunities.length}</div>
        </div>

        <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={16} className="text-green-500" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Stealth</span>
          </div>
          <div className="text-xl font-black text-green-400">98%</div>
        </div>
      </div>

      {/* MAIN PANEL */}
      <div className="relative bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        {/* LOCK SCREEN OVERLAY */}
        {isLocked && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-2xl">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-orange-500/40 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(234,88,12,0.3)]">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500/30 to-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-orange-500/40 animate-pulse">
                <Lock size={40} className="text-orange-500" />
              </div>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Elite Access Required</h2>
              <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                Unlock professional arbitrage detection, Kelly Criterion optimization, and real-time market analytics.
              </p>
              <button
                onClick={onRequestLogin}
                className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-400 hover:to-orange-500 text-white font-black py-5 rounded-xl transition-all hover:scale-105 shadow-2xl shadow-orange-600/40 mb-5 text-lg"
              >
                Start 7-Day Free Trial
              </button>
              <p className="text-sm text-gray-500">
                No payment required • Instant access • Cancel anytime
              </p>
            </div>
          </div>
        )}

        {/* DASHBOARD CONTENT (Blurred when locked) */}
        <div className={isLocked ? "filter blur-3xl opacity-10 pointer-events-none select-none" : ""}>
          {/* TOOLBAR */}
          <div className="p-6 border-b border-white/10 bg-[#0f0f0f]/50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Zap size={22} className="text-orange-500" />
                <h2 className="font-black text-white text-xl">Live Arbitrage Feed</h2>
                <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full border border-green-500/30 font-bold animate-pulse">
                  {filteredOpportunities.length} LIVE
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold text-sm transition-all border ${showFilters ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 rounded-lg flex items-center gap-2 transition font-semibold text-sm">
                  <RefreshCw size={16} /> Refresh
                </button>
              </div>
            </div>

            {/* FILTER PANEL */}
            {showFilters && (
              <div className="mt-6 p-6 bg-black/30 rounded-xl border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Sport Filter */}
                  <div>
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">Sport</label>
                    <select
                      value={selectedSport}
                      onChange={(e) => setSelectedSport(e.target.value)}
                      className="w-full bg-[#171717] border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 transition font-semibold text-sm"
                    >
                      {sports.map(sport => (
                        <option key={sport} value={sport}>{sport === 'all' ? 'All Sports' : sport}</option>
                      ))}
                    </select>
                  </div>

                  {/* Min Yield */}
                  <div>
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">Min Yield: {minYield}%</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={minYield}
                      onChange={(e) => setMinYield(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-[#171717] border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 transition font-semibold text-sm"
                    >
                      <option value="yield">Highest Yield</option>
                      <option value="profit">Highest Profit</option>
                      <option value="time">Starting Soon</option>
                    </select>
                  </div>

                  {/* Search */}
                  <div>
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">Search</label>
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Event, league..."
                        className="w-full bg-[#171717] border border-white/10 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 transition text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Bookmaker Pills */}
                <div className="mt-6">
                  <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3 block">Active Bookmakers ({activeBookies}/{bookies.length})</label>
                  <div className="flex flex-wrap gap-2">
                    {bookies.map((bookie, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const updated = [...bookies];
                          updated[idx].active = !updated[idx].active;
                          setBookies(updated);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          bookie.active
                            ? 'bg-orange-500/20 border-orange-500/50 text-orange-300'
                            : 'bg-white/5 border-white/10 text-gray-600 hover:border-white/20'
                        }`}
                      >
                        {bookie.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* OPPORTUNITIES LIST */}
          <div className="p-6">
            {filteredOpportunities.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter size={32} className="text-gray-600" />
                </div>
                <p className="text-gray-500 font-semibold">No arbitrage opportunities match your filters</p>
                <p className="text-gray-600 text-sm mt-2">Try adjusting your criteria</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-orange-500/40 rounded-xl p-5 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-orange-500/5"
                  >
                    <div className="flex items-center justify-between">
                      {/* LEFT: Event Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/5 px-3 py-2 rounded-lg border border-orange-500/30">
                          <span className="text-xs font-black text-orange-400 uppercase">{opp.sport}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-bold text-sm mb-1">{opp.event}</div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {opp.league}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {opp.startTime}
                            </span>
                            <span className="flex items-center gap-1 text-orange-400 font-semibold">
                              Decay: {opp.decayTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CENTER: Bookmakers */}
                      <div className="flex gap-4 mx-8">
                        <div className="bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-lg text-center">
                          <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">{opp.bookmaker1}</div>
                          <div className="text-sm font-black text-white">{opp.outcome1}</div>
                          <div className="text-xs text-blue-400 font-bold">{opp.odds1.toFixed(2)}</div>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-lg text-center">
                          <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">{opp.bookmaker2}</div>
                          <div className="text-sm font-black text-white">{opp.outcome2}</div>
                          <div className="text-xs text-green-400 font-bold">{opp.odds2.toFixed(2)}</div>
                        </div>
                      </div>

                      {/* RIGHT: Stats & Action */}
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-[10px] text-gray-500 font-semibold uppercase">Yield</div>
                          <div className="text-2xl font-black text-green-400">{opp.yield.toFixed(1)}%</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-gray-500 font-semibold uppercase">Profit</div>
                          <div className="text-lg font-bold text-white">${opp.profit.toFixed(2)}</div>
                        </div>
                        <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-lg shadow-orange-600/30 opacity-0 group-hover:opacity-100">
                          Execute
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
