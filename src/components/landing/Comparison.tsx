import { X, Check } from 'lucide-react';

export default function Comparison() {
  const comparisons = [
    {
      aspect: 'Risk Level',
      gambling: { text: 'High Risk', negative: true },
      arbelite: { text: 'Zero Risk', positive: true }
    },
    {
      aspect: 'Decision Basis',
      gambling: { text: 'Emotional & Luck-based', negative: true },
      arbelite: { text: 'Mathematical & Data-driven', positive: true }
    },
    {
      aspect: 'Outcome Predictability',
      gambling: { text: 'Unpredictable', negative: true },
      arbelite: { text: 'Guaranteed Profit', positive: true }
    },
    {
      aspect: 'Long-term Results',
      gambling: { text: 'Net Loss (House Edge)', negative: true },
      arbelite: { text: 'Consistent Returns', positive: true }
    },
    {
      aspect: 'Strategy',
      gambling: { text: 'Hope & Intuition', negative: true },
      arbelite: { text: 'Arbitrage & Precision', positive: true }
    },
    {
      aspect: 'Emotional State',
      gambling: { text: 'Stress & Anxiety', negative: true },
      arbelite: { text: 'Calm & Calculated', positive: true }
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Gambling vs. Investment
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            See the difference between traditional betting and mathematical arbitrage
          </p>
        </div>

        <div className="bg-[#171717] border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 bg-[#0a0a0a] border-b border-white/10">
            <div className="p-6" />
            <div className="p-6 border-x border-white/10">
              <div className="text-center">
                <div className="text-red-400 font-semibold mb-2">Traditional Gambling</div>
                <div className="flex items-center justify-center gap-2 text-xs text-red-400/60">
                  <X className="w-4 h-4" />
                  <span>High Risk</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center">
                <div className="text-orange-400 font-semibold mb-2">ArbElite Investment</div>
                <div className="flex items-center justify-center gap-2 text-xs text-orange-400/60">
                  <Check className="w-4 h-4" />
                  <span>Zero Risk</span>
                </div>
              </div>
            </div>
          </div>

          {comparisons.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 ${
                index !== comparisons.length - 1 ? 'border-b border-white/5' : ''
              } hover:bg-white/5 transition-colors`}
            >
              <div className="p-6 flex items-center">
                <span className="text-neutral-300 font-medium">{item.aspect}</span>
              </div>

              <div className="p-6 border-x border-white/5 flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-neutral-400">{item.gambling.text}</span>
                </div>
              </div>

              <div className="p-6 flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="text-white font-medium">{item.arbelite.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">The Mathematical Advantage</h3>
              <p className="text-neutral-300 leading-relaxed">
                Traditional betting relies on predicting outcomes, where the house always has an edge. Arbitrage betting exploits price differences between bookmakers, guaranteeing profit regardless of the result. It's not gambling—it's pure mathematics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
