import { motion } from 'framer-motion';
import { Target, Users, Zap, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  const timeline = [
    { year: '1990s', event: 'Traditional Betting Era', description: 'Bookmakers hold all the power. Bettors rely on luck.' },
    { year: '2000s', event: 'Online Revolution', description: 'Betting moves online. Odds comparison sites emerge.' },
    { year: '2010s', event: 'Sharp Money', description: 'Professional syndicates use basic arbitrage. Manual, slow, inefficient.' },
    { year: '2024', event: 'The ArbElite Era', description: 'Mathematical precision meets millisecond execution. The house edge is broken.' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Hero Hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm font-semibold text-orange-400 mb-6">
            <Target size={16} />
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The House Always Wins?<br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Not Anymore.
            </span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            We're a team of ex-quants and mathematicians who got tired of seeing bookmakers
            rake in billions from retail bettors. So we built the weapon that levels the playing field.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            ArbElite exists to democratize arbitrage betting. What was once only accessible to
            Wall Street-level operations is now available to anyone with discipline and capital.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            We believe in data-driven investing, not gambling. Every bet placed through our platform
            is mathematically guaranteed to profit, regardless of the game outcome.
          </p>
        </motion.div>

        {/* The Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Built by Experts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-4">
                <Target size={28} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Quant Traders</h3>
              <p className="text-gray-400 text-sm">
                Alumni from top-tier hedge funds and prop trading firms
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-4">
                <Zap size={28} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Engineers</h3>
              <p className="text-gray-400 text-sm">
                Low-latency infrastructure experts from HFT backgrounds
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-4">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Mathematicians</h3>
              <p className="text-gray-400 text-sm">
                PhD-level probability and statistics experts
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">The Evolution of Betting</h2>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === timeline.length - 1
                      ? 'bg-orange-500/20 text-orange-500 border-2 border-orange-500'
                      : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}>
                    {item.year}
                  </div>
                </div>
                <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.event}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 bg-gradient-to-br from-[#171717] to-[#0a0a0a] border border-white/10 rounded-2xl p-10"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">1,200+</div>
              <div className="text-gray-400">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">$24M+</div>
              <div className="text-gray-400">Total Profit Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">2.8%</div>
              <div className="text-gray-400">Average ROI per Bet</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
