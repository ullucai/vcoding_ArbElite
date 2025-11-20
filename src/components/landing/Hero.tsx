import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenAuth: () => void;
}

export default function Hero({ onOpenAuth }: HeroProps) {
  const [liveProfit, setLiveProfit] = useState(4.25);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setLiveProfit(prev => {
        const change = (Math.random() - 0.5) * 0.2;
        const newValue = prev + change;
        return Math.max(3.5, Math.min(5.5, newValue));
      });
    }, 3000);
    return () => clearInterval(interval);
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
              Mathematically Guaranteed Returns
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold text-white leading-tight ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
              Stop Gambling.<br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Start Investing.
              </span>
            </h1>

            <p className={`text-xl text-neutral-400 leading-relaxed max-w-xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              The mathematical way to beat the bookmakers. Guaranteed yield on every position, regardless of the outcome.
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
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-neutral-500 uppercase tracking-wide">Live Opportunity</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-green-400">ACTIVE</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="text-sm text-neutral-400">Premier League</div>
                <div className="text-lg font-bold text-white">Man City vs Liverpool</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-4 mb-4 transition-all duration-300">
                <div className="text-sm text-orange-300 mb-1">Guaranteed Profit</div>
                <div className="text-4xl font-bold text-orange-400 transition-all duration-500">+{liveProfit.toFixed(2)}%</div>
                <div className="text-xs text-orange-300/60 mt-1 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live updating
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between bg-[#0a0a0a] rounded-lg px-3 py-2 border border-white/5">
                  <div>
                    <div className="text-sm font-medium text-neutral-300">Home Win</div>
                    <div className="text-xs text-neutral-500">Pinnacle</div>
                  </div>
                  <div className="text-base font-bold text-white">2.15</div>
                </div>
                <div className="flex items-center justify-between bg-[#0a0a0a] rounded-lg px-3 py-2 border border-white/5">
                  <div>
                    <div className="text-sm font-medium text-neutral-300">Draw</div>
                    <div className="text-xs text-neutral-500">Bet365</div>
                  </div>
                  <div className="text-base font-bold text-white">3.80</div>
                </div>
                <div className="flex items-center justify-between bg-[#0a0a0a] rounded-lg px-3 py-2 border border-white/5">
                  <div>
                    <div className="text-sm font-medium text-neutral-300">Away Win</div>
                    <div className="text-xs text-neutral-500">WilliamHill</div>
                  </div>
                  <div className="text-base font-bold text-white">3.45</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
