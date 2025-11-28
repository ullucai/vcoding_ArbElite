import { Zap, Shield, TrendingUp, BarChart3, Clock, Lock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Real-Time Detection",
      desc: "Instantly identify arbitrage opportunities across 50+ bookmakers with live odds updates. No delays, no missed opportunities."
    },
    {
      icon: Shield,
      title: "Risk Management",
      desc: "Intelligent risk scoring and portfolio analysis to protect your bankroll. Never bet blind again."
    },
    {
      icon: TrendingUp,
      title: "Kelly Criterion",
      desc: "Professional bankroll management using Kelly Criterion algorithm. Maximize growth while minimizing variance."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      desc: "Detailed profit projections and performance tracking across all your trades and bookmakers."
    },
    {
      icon: Clock,
      title: "Multi-Sport Coverage",
      desc: "Track NFL, NBA, EPL, Tennis, MMA, Cricket, Rugby, Golf and more in one elite platform."
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      desc: "Bank-grade encryption protects your data and betting strategies. Your privacy is our priority."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            <span className="text-orange-500">Premium Features</span>
            <br />
            For Elite Traders
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to find, analyze, and execute profitable arbitrage opportunities with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-orange-500/30 p-8 rounded-2xl transition-all duration-300 group hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl flex items-center justify-center mb-6 border border-orange-500/30 group-hover:scale-110 transition-transform">
                  <Icon className="text-orange-500" size={28} />
                </div>
                <h3 className="text-xl font-black text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-orange-600/20 to-orange-500/10 border border-orange-500/30 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Start Trading Smarter?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Join professional arbitrage traders who are already finding profitable opportunities daily
          </p>
          <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black px-12 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-600/30">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </div>
  );
}
