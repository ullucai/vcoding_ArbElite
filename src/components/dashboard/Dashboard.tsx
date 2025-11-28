import React, { useState, useEffect } from 'react';
import { Settings, Wallet, ShieldCheck, Power, Filter, Lock, Activity, TrendingUp, Zap } from 'lucide-react';

interface OpportunityData {
  id: string;
  event_name: string;
  sport_key: string;
  sport_title: string;
  profit_percentage: number;
  home_team: string;
  away_team: string;
  tier: 'FREE' | 'PREMIUM';
  time_until_start: string;
  bets: Array<{ outcome: string; bookmaker: string; odds: number }>;
}

export default function Dashboard({ isUserLoggedIn, userTier }: { isUserLoggedIn: boolean; userTier: string }) {
  const [bankroll, setBankroll] = useState(2500);
  const [opportunities, setOpportunities] = useState<OpportunityData[]>([]);
  const [bookies, setBookies] = useState([
    { name: 'Pinnacle', active: true },
    { name: 'Bet365', active: true },
    { name: '1xBet', active: false },
    { name: 'Unibet', active: true },
    { name: 'Betfair', active: true },
    { name: 'WilliamHill', active: false },
  ]);

  const isLocked = !isUserLoggedIn;

  // Fetch opportunities on component mount
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch('/api/opportunities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier: userTier === 'admin' || userTier === 'pro' ? 'premium' : 'free' })
        });
        const data = await response.json();
        setOpportunities(data.opportunities || []);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };

    fetchOpportunities();
    // Refresh every 10 minutes to conserve quota
    const interval = setInterval(fetchOpportunities, 600000);
    return () => clearInterval(interval);
  }, [userTier]);

  return (
    <div className="pt-24 px-4 md:px-8 max-w-[1600px] mx-auto pb-12 min-h-screen relative">

      {/* ADMIN NOTICE - Only visible to admins */}
      {userTier === 'admin' && (
        <div className="mb-6 bg-orange-500/5 border border-orange-500/30 rounded-xl p-4">
          <p className="text-sm text-orange-300">
            <span className="font-bold">Admin Mode:</span> Use mock/test data for demonstration purposes, OR Adjust the arbitrage threshold to find more marginal opportunities
          </p>
        </div>
      )}

      {/* SECTION A: COMMAND CENTER (Visible Preview) */}
      <div className={`grid gap-6 mb-8 ${userTier === 'admin' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
         {/* API Quota - Admin Only */}
         {userTier === 'admin' && (
           <div className="bg-[#171717] border border-orange-500/20 p-6 rounded-2xl" data-testid="card-api-quota">
             <h3 className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-4">API Quota</h3>
             <div className="text-3xl font-black text-orange-400 mb-2">340 <span className="text-sm text-orange-300">/500</span></div>
             <div className="text-xs text-orange-300/60">Requests remaining this month</div>
           </div>
         )}

         {/* Upgrade Button - Non-Admin Only */}
         {userTier !== 'admin' && (
           <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 p-6 rounded-2xl flex flex-col justify-center">
             <h3 className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-3">Premium Access</h3>
             <p className="text-sm text-gray-300 mb-4">Unlock all arbitrage opportunities</p>
             <button onClick={() => window.location.href = '/pricing'} className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-2 px-4 rounded-lg transition-all hover:scale-105">
               Upgrade Now
             </button>
           </div>
         )}

         {/* Strategy Card - EDITABLE BANKROLL */}
         <div className="bg-[#171717] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-orange-500/20 transition-colors">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Settings size={16} className="text-gray-500 cursor-pointer hover:text-orange-500 transition" />
            </div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Active Bankroll</h3>
            <div className="flex items-center gap-2 mb-4">
               <Wallet size={20} className="text-orange-500" />
               <span className="text-2xl font-black text-orange-500">$</span>
               <input
                 type="number"
                 value={bankroll}
                 onChange={(e) => setBankroll(Number(e.target.value))}
                 className="bg-transparent text-2xl font-black text-white w-32 focus:outline-none border-b border-transparent hover:border-white/10 focus:border-orange-500 transition placeholder-gray-600 cursor-pointer"
               />
            </div>
            <div className="flex items-center gap-2 text-xs bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/20">
              <ShieldCheck size={14} className="text-green-400" />
              <span className="text-green-400 font-semibold">Stealth Index: 98% (Elite)</span>
            </div>
         </div>

         {/* Liquidity Network */}
         <div className="lg:col-span-2 bg-[#171717] border border-white/10 p-6 rounded-2xl hover:border-orange-500/20 transition-colors">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Liquidity Network</h3>
                <div className="flex items-center gap-2 text-xs">
                  <Activity size={12} className="text-green-400" />
                  <span className="text-green-400 font-semibold">{bookies.filter(b => b.active).length}/{bookies.length} Active</span>
                </div>
            </div>
            <div className="flex gap-3 flex-wrap">
               {bookies.map((b, i) => (
                 <button
                   key={i}
                   onClick={() => {
                      const n = [...bookies];
                      n[i].active = !n[i].active;
                      setBookies(n);
                   }}
                   className={`px-4 py-2 rounded-xl border text-sm font-bold flex items-center gap-2 transition-all ${
                     b.active
                       ? 'border-orange-500 text-white bg-orange-500/10 shadow-lg shadow-orange-500/10'
                       : 'border-white/5 text-gray-600 bg-black/20 hover:border-white/10'
                   }`}
                 >
                    <Power size={12} className={b.active ? 'text-orange-500' : 'text-gray-600'} />
                    {b.name}
                 </button>
               ))}
            </div>
         </div>
      </div>

      {/* SECTION B: DATA GRID CONTAINER */}
      <div className="relative bg-[#171717] border border-white/5 rounded-xl overflow-hidden min-h-[600px]">

        {/* GHOST ADMIN LOCK SCREEN */}
        {isLocked && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-xl">
            <div className="bg-gradient-to-br from-[#171717] to-[#0a0a0a] border border-orange-500/30 p-10 rounded-3xl text-center max-w-lg shadow-2xl shadow-orange-500/10">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500/30">
                <Lock size={36} className="text-orange-500" />
              </div>
              <h2 className="text-3xl font-black text-white mb-3">Premium Data Access Required</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Unlock real-time arbitrage detection, Kelly Criterion staking, and advanced portfolio analytics.
              </p>
              <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-600/30 mb-4">
                Start 7-Day Trial
              </button>
              <p className="text-xs text-gray-600">
                No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        )}

        {/* OPPORTUNITY FEED (Blurred when locked) */}
        <div className={isLocked ? "filter blur-2xl opacity-20 pointer-events-none select-none" : ""}>
           <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <TrendingUp size={20} className="text-orange-500" />
                <h2 className="font-black text-white text-lg">Live Opportunities</h2>
                <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20 font-semibold">
                  12 Active
                </span>
              </div>
              <button className="text-xs bg-white/5 hover:bg-white/10 text-gray-400 px-4 py-2 rounded-lg flex items-center gap-2 transition border border-white/5">
                <Filter size={12} /> Filters
              </button>
           </div>
           <div className="p-6 grid gap-4">
               {opportunities.length === 0 ? (
                 <div className="text-center py-12 text-gray-500">
                   <TrendingUp className="mx-auto mb-2 opacity-50" size={32} />
                   <p>5 live opportunities loading...</p>
                 </div>
               ) : (
                 opportunities.map((opp, i) => (
                   <div key={i} className="bg-white/5 border border-white/5 hover:border-orange-500/30 rounded-xl p-4 flex items-center justify-between transition-all group cursor-pointer">
                     <div className="flex items-center gap-4">
                       <div className="bg-orange-500/10 px-3 py-1 rounded-lg border border-orange-500/20">
                         <span className="text-xs font-black text-orange-400">{opp.sport_title}</span>
                       </div>
                       <div>
                         <div className="font-bold text-white text-sm flex items-center gap-2">
                           {opp.event_name}
                           <span className={`text-xs px-2 py-1 rounded font-semibold ${
                             opp.tier === 'PREMIUM' 
                               ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                               : 'bg-green-500/20 text-green-400 border border-green-500/30'
                           }`}>
                             {opp.tier}
                           </span>
                         </div>
                         <div className="text-gray-500 text-xs mt-1">{opp.time_until_start} • {opp.bets?.length || 0} bookmakers</div>
                       </div>
                     </div>
                     <div className="flex items-center gap-6">
                       <div className="text-right">
                         <div className="text-xs text-gray-500">Profit %</div>
                         <div className={`text-lg font-black ${opp.profit_percentage >= 2.5 ? 'text-yellow-400' : 'text-green-400'}`}>
                           +{opp.profit_percentage}%
                         </div>
                       </div>
                       <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-2 rounded-lg transition opacity-0 group-hover:opacity-100">
                         Details
                       </button>
                     </div>
                   </div>
               ))}
           </div>
        </div>
      </div>
    </div>
  );
}
