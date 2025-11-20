import { useState } from 'react';
import { Scan, Calculator, TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';

export default function HowItWorks() {
  const [investment, setInvestment] = useState(1000);
  const profitRate = 4.25;
  const profit = (investment * profitRate) / 100;

  const steps = [
    {
      icon: <Scan className="w-8 h-8" />,
      title: 'Scan',
      description: 'We scan 80+ bookmakers in real-time, monitoring millions of odds every second.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Calculate',
      description: 'Our algorithm finds price differences (arbitrage opportunities) across bookmakers.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Profit',
      description: 'You bet on all outcomes to lock in a guaranteed profit, no matter who wins.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Is it Magic? No, it's Math.
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Arbitrage betting exploits price differences between bookmakers to guarantee profit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-[#171717] border border-white/10 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-300 transform hover:scale-105 h-full">
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white mb-6`}>
                  {step.icon}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="text-5xl font-bold text-neutral-800">{index + 1}</div>
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                </div>

                <p className="text-neutral-400 leading-relaxed">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#171717] to-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm font-semibold text-orange-400 mb-4">
                <DollarSign className="w-4 h-4" />
                Interactive Profit Simulator
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">See Your Potential</h3>
              <p className="text-neutral-400">Adjust the slider to calculate your guaranteed returns</p>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-semibold text-neutral-300 uppercase tracking-wide">
                    Your Investment
                  </label>
                  <div className="text-3xl font-bold text-white">
                    {formatCurrency(investment)}
                  </div>
                </div>

                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={investment}
                  onChange={(e) => setInvestment(parseInt(e.target.value))}
                  className="w-full h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  style={{
                    background: `linear-gradient(to right, rgb(234 88 12) 0%, rgb(234 88 12) ${((investment - 100) / (10000 - 100)) * 100}%, rgb(38 38 38) ${((investment - 100) / (10000 - 100)) * 100}%, rgb(38 38 38) 100%)`
                  }}
                />

                <div className="flex justify-between text-xs text-neutral-500 mt-2">
                  <span>$100</span>
                  <span>$10,000</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-orange-300 mb-2">Risk-Free Profit</div>
                    <div className="text-4xl md:text-5xl font-bold text-orange-400">
                      {formatCurrency(profit)}
                    </div>
                    <div className="text-sm text-orange-300/60 mt-2">
                      in approximately 10 minutes
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-orange-300 mb-2">Return Rate</div>
                    <div className="text-3xl font-bold text-orange-400">{profitRate}%</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{formatCurrency(investment / 3)}</div>
                  <div className="text-xs text-neutral-500">Bet 1</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{formatCurrency(investment / 3)}</div>
                  <div className="text-xs text-neutral-500">Bet 2</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{formatCurrency(investment / 3)}</div>
                  <div className="text-xs text-neutral-500">Bet 3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
