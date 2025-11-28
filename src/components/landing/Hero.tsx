import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { Link } from 'wouter';
import { useArbitrageData } from '../../hooks/useArbitrageData';

type UserTier = 'free' | 'pro' | 'admin';

// Time Formatter Helper
const formatTime = (iso: string) => {
  if (!iso) return 'LIVE';
  const min = Math.floor((new Date(iso).getTime() - new Date().getTime()) / 60000);
  if (min < 0) return 'LIVE';
  if (min > 1440) return `STARTS IN ${Math.floor(min / 1440)} DAYS`;
  if (min > 60) return `STARTS IN ${Math.floor(min / 60)}H ${min % 60}M`;
  return `STARTS IN ${min}M`;
};

interface HeroProps {
  onOpenAuth: () => void;
  isUserLoggedIn: boolean;
  userTier: UserTier;
}

interface Opportunity {
  id: string;
  eventName: string;
  sportKey: string;
  sportTitle: string;
  profitPercentage: number;
  homeTeam: string;
  awayTeam: string;
  commence_time?: string;
  odds: Array<{
    bookmaker: string;
    outcome: string;
    odds: number;
  }>;
}

export default function Hero({ onOpenAuth, isUserLoggedIn, userTier }: HeroProps) {
  const { matches, loading } = useArbitrageData();
  const [liveProfit, setLiveProfit] = useState(4.25);
  const [currentMatch, setCurrentMatch] = useState<Opportunity | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Convert API matches to Opportunity format
  useEffect(() => {
    if (Array.isArray(matches) && matches.length > 0) {
      try {
        const sortedMatches = [...matches].sort((a: any, b: any) => (Number(b?.profit_percentage) || 0) - (Number(a?.profit_percentage) || 0));
        const freeMatches = sortedMatches.slice(3);
        const matchToDisplay = freeMatches?.[0] || sortedMatches?.[0];
        
        if (!matchToDisplay?.id) {
          setCurrentMatch(null);
          return;
        }
        
        const formatted: Opportunity = {
          id: matchToDisplay.id,
          eventName: matchToDisplay.event_name || 'Match',
          sportKey: matchToDisplay.sport_key || 'unknown',
          sportTitle: matchToDisplay.sport_title || 'Live Match',
          profitPercentage: Number(matchToDisplay.profit_percentage) || 0,
          homeTeam: matchToDisplay.home_team || 'Home',
          awayTeam: matchToDisplay.away_team || 'Away',
          commence_time: matchToDisplay.commence_time,
          odds: (Array.isArray(matchToDisplay.bets) ? matchToDisplay.bets : []).map((bet: any) => ({
            bookmaker: bet?.bookmaker || 'Unknown',
            outcome: bet?.label_name || bet?.outcome || 'Unknown',
            odds: Number(bet?.price || bet?.odds) || 1
          }))
        };
        setCurrentMatch(formatted);
        setLiveProfit(formatted.profitPercentage + (Math.random() - 0.5) * 0.5);
      } catch (err) {
        console.error('Error formatting match data:', err);
      }
    }
  }, [matches]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Profit animation (keeps updating)
    const profitInterval = setInterval(() => {
      setLiveProfit(prev => {
        const change = (Math.random() - 0.5) * 0.2;
        const newValue = prev + change;
        return Math.max(2.5, Math.min(6.5, newValue));
      });
    }, 3000);

    return () => {
      clearInterval(profitInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm font-semibold text-orange-400 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Mathematically Calculated Returns
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold text-white leading-tight ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
              Stop Gambling.<br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Start Investing.
              </span>
            </h1>

            <p className={`text-xl text-neutral-400 leading-relaxed max-w-xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              The mathematical way to beat the bookmakers. Calculated edge on every position, regardless of the outcome.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <button
                onClick={onOpenAuth}
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenAuth}
                className="px-8 py-4 bg-transparent border-2 border-white/10 hover:border-orange-500/50 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Create Account
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-white">4.8%</div>
                <div className="text-sm text-neutral-500">Avg. Return</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-3xl font-bold text-white">80+</div>
                <div className="text-sm text-neutral-500">Bookmakers</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-neutral-500">Live Feed</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent blur-3xl" />
            <div className="relative bg-[#171717] border border-white/10 rounded-2xl p-6 backdrop-blur-xl animate-float-slow">
              {currentMatch ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wide mb-2">
                        {currentMatch.sportTitle}
                      </div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wide">
                        {formatTime(currentMatch.commence_time || '')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-orange-400 mb-1">
                        {liveProfit.toFixed(2)}%
                      </div>
                      <div className="text-xs text-green-400">Live updating</div>
                    </div>
                  </div>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-white">{currentMatch.homeTeam}</div>
                      <div className="text-neutral-600 font-semibold">VS</div>
                      <div className="text-lg font-semibold text-white">{currentMatch.awayTeam}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {currentMatch.odds.map((odd, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm py-2 px-3 bg-white/5 rounded-lg">
                        <span className="text-neutral-400">{odd.bookmaker}</span>
                        <div className="flex gap-4">
                          <div className="text-neutral-300">{odd.outcome}</div>
                          <div className="font-semibold text-orange-400 font-mono">{odd.odds}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/dashboard"
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all text-center block"
                  >
                    View More Opportunities
                  </Link>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-neutral-500">Loading live matches...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
