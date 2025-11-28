import React, { useEffect, useState } from 'react';
import { RefreshCw, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import { useArbitrageData } from '../../hooks/useArbitrageData';
import { Link } from 'wouter';

const formatStartTime = (isoString: string) => {
  if (!isoString) return 'Live';
  const diff = new Date(isoString).getTime() - new Date().getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 0) return 'LIVE';
  if (minutes < 60) return `${minutes}m`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h`;
  return `${Math.floor(minutes / 1440)}d`;
};

interface LiveFeedProps {
  userTier?: string;
  user?: { role?: string; tier?: string };
}

const LiveFeed = ({ user, userTier }: LiveFeedProps & { userTier?: string }) => {
  const { opportunities, loading, usageStats } = useArbitrageData();
  const [timedOut, setTimedOut] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(timer);
  }, []);
  
  const isAdmin = user?.role === 'admin' || userTier === 'admin';
  const isPremium = isAdmin || user?.tier === 'premium' || userTier === 'pro';

  if (loading && !timedOut) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <RefreshCw className="w-8 h-8 animate-spin mb-2 text-orange-500" />
        <p>Scanning markets...</p>
      </div>
    );
  }

  const safeMatches = Array.isArray(opportunities) ? opportunities : [];
  
  // Filter by user tier: Free users see only FREE matches (<2.5%), Premium see all
  const filteredMatches = safeMatches.filter((match: any) => {
    const profit = Number(match.profit_percentage || 0);
    const isPremiumMatch = profit >= 2.5;
    // Show all for premium/admin, only free matches for free users
    return isPremium || !isPremiumMatch;
  });
  
  if (filteredMatches.length === 0) {
    return (
      <div className="p-8 text-center border border-gray-800 rounded-xl bg-gray-900/50">
        <AlertCircle className="w-12 h-12 mx-auto text-gray-600 mb-3" />
        <h3 className="text-xl font-bold text-white">No Matches Available</h3>
        <p className="text-gray-400 mb-4">{isPremium ? 'Syncing with bookmakers...' : 'Upgrade to Premium for more opportunities'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Arbitrage Opportunities</h1>
          <p className="text-gray-400 text-sm mt-1">1xbet vs major bookmakers • Real-time calculations</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs">Total Matches</p>
          <p className="text-2xl font-bold text-orange-400">{filteredMatches.length}</p>
        </div>
      </div>

      {/* Admin Quota Bar */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-orange-950/30 to-orange-900/10 border border-orange-500/30 p-4 rounded-lg flex justify-between items-center text-sm">
           <div>
             <span className="text-gray-300 font-semibold">API Quota</span>
             <p className="text-gray-500 text-xs mt-1">Monthly requests remaining</p>
           </div>
           <div className="text-right">
             <span className="text-orange-400 font-bold text-xl">{usageStats?.requests_remaining || 500}</span>
             <span className="text-gray-500 text-xs block">/500 requests</span>
           </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
          <p className="text-gray-400 text-xs">Avg Profit</p>
          <p className="text-lg font-bold text-green-400">
            {filteredMatches.length > 0 ? (filteredMatches.reduce((sum, m) => sum + Number(m.profit_percentage || 0), 0) / filteredMatches.length).toFixed(2) : '0.00'}%
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
          <p className="text-gray-400 text-xs">Premium (≥2.5%)</p>
          <p className="text-lg font-bold text-orange-400">
            {safeMatches.filter(m => Number(m.profit_percentage || 0) >= 2.5).length}
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
          <p className="text-gray-400 text-xs">Free (&lt;2.5%)</p>
          <p className="text-lg font-bold text-blue-400">
            {safeMatches.filter(m => Number(m.profit_percentage || 0) < 2.5).length}
          </p>
        </div>
      </div>

      {/* Match List */}
      <div className="space-y-3">
        {filteredMatches.map((match: any, index: number) => {
          const profit = Number(match.profit_percentage || 0);
          const isPremiumTier = profit >= 2.5;
          
          return (
            <div key={match.id || index} className="bg-gray-800/40 border border-gray-700/50 rounded-lg p-4 hover:border-gray-600/80 transition-all">
              
              {/* Top Row: Sport, Tier Badge, Time, Profit */}
              <div className="flex justify-between items-start mb-3 gap-3">
                <div className="flex items-center gap-3 flex-1">
                  {/* Sport Badge */}
                  <span className="px-2 py-1 bg-gray-700/60 text-gray-300 text-[10px] uppercase tracking-wider rounded font-semibold">
                    {match.sport_title || 'Sport'}
                  </span>
                  
                  {/* Tier Badge */}
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                    isPremiumTier 
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' 
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    {isPremiumTier ? 'PREMIUM' : 'FREE'}
                  </span>

                  {/* Time */}
                  <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                    <Clock className="w-3 h-3" />
                    {formatStartTime(match.commence_time)}
                  </span>
                </div>
                
                {/* Profit Badge - Right aligned, larger */}
                <div className={`text-right font-mono font-black text-xl min-w-[80px] ${
                  isPremiumTier ? 'text-green-400' : 'text-blue-400'
                }`}>
                  +{profit.toFixed(2)}%
                </div>
              </div>

              {/* Match Info */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="text-white font-semibold truncate" title={match.home_team}>
                  {match.home_team}
                </div>
                <div className="text-gray-600 text-xs px-3 font-bold">VS</div>
                <div className="text-white font-semibold truncate text-right" title={match.away_team}>
                  {match.away_team}
                </div>
              </div>

              {/* Bets Grid - 1xbet vs Other Bookmaker */}
              <div className="grid grid-cols-2 gap-2">
                {match.bets && Array.isArray(match.bets) && match.bets.length >= 2 ? (
                  <>
                    <div className="bg-gray-900/60 border border-gray-600/50 rounded p-3">
                      <div className="text-[10px] text-gray-400 mb-1">HOME BOOKMAKER</div>
                      <div className="text-sm font-bold text-orange-400 mb-1">{match.bets[0].bookmaker}</div>
                      <div className="text-xs text-gray-300 mb-2">{match.bets[0].label_name}</div>
                      <div className="text-lg font-mono font-bold text-white">{Number(match.bets[0].price).toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-900/60 border border-gray-600/50 rounded p-3">
                      <div className="text-[10px] text-gray-400 mb-1">BEST ODDS</div>
                      <div className="text-sm font-bold text-blue-400 mb-1">{match.bets[1].bookmaker}</div>
                      <div className="text-xs text-gray-300 mb-2">{match.bets[1].label_name}</div>
                      <div className="text-lg font-mono font-bold text-white">{Number(match.bets[1].price).toFixed(2)}</div>
                    </div>
                  </>
                ) : (
                  <div className="col-span-2 text-center text-xs text-gray-600 py-2">
                    Analysis pending...
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveFeed;
