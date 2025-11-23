import { Zap, Shield, PieChart, Target, TrendingUp, Clock } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: <Zap size={32} />,
      title: '0ms Latency Feed',
      description: 'Sub-millisecond arbitrage detection. Direct infrastructure integration with bookmaker APIs ensures you see opportunities before market movement.',
      visual: (
        <div className="flex items-center gap-2 mt-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-400 font-mono font-semibold">LIVE • CONNECTED</span>
        </div>
      )
    },
    {
      icon: <Shield size={32} />,
      title: 'Stealth Mode',
      description: 'Proprietary anti-detection algorithms protect your accounts. Pattern randomization, bet sizing variance, and timing obfuscation keep you under the radar.',
      visual: (
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <div className="h-2 flex-1 bg-green-500/20 rounded-full overflow-hidden">
            <div className="h-full w-[98%] bg-green-500/60 rounded-full" />
          </div>
          <span className="font-mono font-semibold">98%</span>
        </div>
      )
    },
    {
      icon: <PieChart size={32} />,
      title: 'Bankroll Manager',
      description: 'Automated Kelly Criterion staking calculates mathematically optimal bet sizes. Never over-leverage your capital or miss maximum yield opportunities.',
      visual: (
        <div className="mt-4 flex gap-1 h-16 items-end">
          {[40, 60, 80, 50, 70].map((h, i) => (
            <div key={i} className="flex-1 bg-orange-500/20 rounded-t border border-orange-500/30" style={{ height: `${h}%` }} />
          ))}
        </div>
      )
    },
    {
      icon: <Target size={32} />,
      title: 'Precision Alerts',
      description: 'Only receive opportunities that meet your configured yield threshold. Zero noise, zero spam—just profitable arbitrage positions ready to execute.',
      visual: (
        <div className="mt-4 flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
            <Target size={20} className="text-orange-500" />
          </div>
          <div className="text-xs text-gray-500">Min Yield: <span className="text-orange-400 font-bold">2.5%</span></div>
        </div>
      )
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Portfolio Analytics',
      description: 'Advanced tracking across all markets, bookmakers, and bet types. Identify your most profitable strategies and optimize allocation in real-time.',
      visual: (
        <div className="mt-4 flex gap-3 text-xs">
          <div><span className="text-gray-500">ROI:</span> <span className="text-green-400 font-bold">+14.2%</span></div>
          <div><span className="text-gray-500">Volume:</span> <span className="text-white font-bold">$48.2K</span></div>
          <div><span className="text-gray-500">Bets:</span> <span className="text-white font-bold">127</span></div>
        </div>
      )
    },
    {
      icon: <Clock size={32} />,
      title: 'Live & Pre-Match',
      description: 'Continuous 24/7 market scanning across both live in-play and pre-match events. Capture arbitrage opportunities across all time horizons.',
      visual: (
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <Clock size={14} className="text-orange-500" />
          <span className="font-mono font-semibold">24/7 SCANNING</span>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm font-semibold text-orange-400 mb-6">
            <Zap size={16} />
            Built for Unfair Advantages
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Technology that<br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Beats the Market
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Every feature engineered for one purpose: extracting consistent profit from bookmaker inefficiencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:from-orange-500/20 group-hover:to-orange-600/10 group-hover:scale-110 transition-all duration-300 border border-orange-500/20">
                {feature.icon}
              </div>

              <h3 className="text-xl font-black text-white mb-3 group-hover:text-orange-400 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
                {feature.description}
              </p>

              <div className="h-12 flex items-end">
                {feature.visual}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-[#171717] to-[#0a0a0a] border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Your Edge?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join the platform built by mathematicians, for serious bettors.
            </p>
            <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-600/30">
              Start Free Trial
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
