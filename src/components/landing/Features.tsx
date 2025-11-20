import { Zap, Calculator, Trophy, Moon, Bell, Shield } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Live Feed',
      description: 'Instant alerts faster than the market moves. Real-time updates every second.',
      highlight: 'Sub-second latency'
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: 'Smart Calculator',
      description: 'Precision staking tools built-in. Calculate optimal bet distribution instantly.',
      highlight: 'Zero margin error'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Diverse Sports',
      description: 'Football, NBA, Tennis, Esports and more. Global coverage across all major leagues.',
      highlight: '15+ sports'
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: 'Dark Mode',
      description: 'Easy on the eyes for pro bettors. Designed for extended sessions.',
      highlight: 'Eye-comfort focus'
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Smart Alerts',
      description: 'Custom notifications for high-profit opportunities. Never miss a winning bet.',
      highlight: 'Push notifications'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Bank-grade encryption. Your data and strategies stay completely confidential.',
      highlight: 'AES-256 encryption'
    }
  ];

  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm font-semibold text-orange-400 mb-4">
            Premium Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to Win
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Professional-grade tools designed for serious arbitrage bettors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-[#171717] border border-white/10 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed mb-4">{feature.description}</p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span className="text-xs font-semibold text-orange-400">{feature.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-[#171717] to-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Built for Strategic Sports Investors
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-6">
                ArbElite is designed from the ground up for serious investors who demand precision, speed, and reliability. Our platform handles the complex mathematics so you can focus on maximizing returns.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Advanced Filtering</div>
                    <div className="text-sm text-neutral-400">Filter by sport, bookmaker, profit range, and more</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Instant Calculations</div>
                    <div className="text-sm text-neutral-400">Real-time stake distribution with precision accuracy</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Performance Analytics</div>
                    <div className="text-sm text-neutral-400">Track your returns and optimize your strategy</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent blur-3xl" />
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-neutral-400">Performance Stats</div>
                  <div className="text-xs text-green-400 font-semibold">Last 30 Days</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="text-sm text-neutral-400">Total Return</div>
                      <div className="text-2xl font-bold text-orange-400">+$4,250</div>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{ width: '87%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="text-sm text-neutral-400">Opportunities</div>
                      <div className="text-2xl font-bold text-white">342</div>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '65%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="text-sm text-neutral-400">Avg. Profit</div>
                      <div className="text-2xl font-bold text-green-400">4.8%</div>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '93%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
