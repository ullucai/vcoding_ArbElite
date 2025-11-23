import { Check, Zap } from 'lucide-react';

export default function Pricing() {
  const tiers = [
    {
      name: 'Starter',
      hook: 'For the curious.',
      price: '$0',
      period: '',
      description: 'Free Forever',
      features: [
        'Manual scan (delayed)',
        '5 arbitrage opportunities per day',
        'Basic calculator',
        'Community support'
      ],
      highlighted: false
    },
    {
      name: 'Pro',
      hook: 'For the side-hustler.',
      price: '$49',
      period: '/mo',
      description: 'Most Popular',
      features: [
        'Real-time feed (sub-second)',
        'Unlimited arbitrage opportunities',
        'Pre-match & live betting',
        'Smart alerts & notifications',
        'Advanced calculator',
        'Priority support'
      ],
      highlighted: true
    },
    {
      name: 'Whale',
      hook: 'For the heavy hitter.',
      price: '$149',
      period: '/mo',
      description: 'Premium',
      features: [
        'Everything in Pro',
        'API access',
        'Personal account manager',
        'Hidden/sharp bookmakers',
        'Custom integrations',
        'White-glove onboarding'
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm font-semibold text-orange-400 mb-4">
            <Zap size={16} />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your Edge
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 ${
                tier.highlighted
                  ? 'bg-gradient-to-b from-orange-500/10 to-transparent border-2 border-orange-500/50 shadow-2xl shadow-orange-500/20'
                  : 'bg-[#171717]/80 border border-white/10'
              } backdrop-blur-xl`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {tier.description}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm">{tier.hook}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white">{tier.price}</span>
                  {tier.period && (
                    <span className="text-gray-400 text-sm">{tier.period}</span>
                  )}
                </div>
                <p className="text-gray-500 text-xs mt-1">{tier.description}</p>
              </div>

              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all mb-8 ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl hover:shadow-orange-500/30'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                {tier.price === '$0' ? 'Get Started' : 'Start Free Trial'}
              </button>

              <div className="space-y-4">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className={`mt-0.5 flex-shrink-0 ${
                        tier.highlighted ? 'text-orange-500' : 'text-gray-400'
                      }`}
                    />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm">
            All plans include bank-grade encryption and 24/7 monitoring.
          </p>
        </div>
      </div>
    </div>
  );
}
