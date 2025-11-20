import { Check, Zap, Crown } from 'lucide-react';

interface PricingProps {
  onStartTrial: () => void;
}

export default function Pricing({ onStartTrial }: PricingProps) {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: <Zap className="w-5 h-5" />,
      features: [
        'Delayed feed (15 min)',
        'Limited opportunities',
        'Basic calculator',
        'Email support',
        '1 sport',
        'Desktop only'
      ],
      cta: 'Start Free',
      highlighted: false,
      gradient: 'from-neutral-500 to-neutral-600'
    },
    {
      name: 'Professional',
      price: '29',
      period: 'per month',
      description: 'Most popular for serious traders',
      icon: <Zap className="w-5 h-5" />,
      badge: 'Most Popular',
      features: [
        'Real-time live feed',
        'Unlimited opportunities',
        'Advanced calculator',
        'Priority support',
        'All sports',
        'Mobile + Desktop',
        'Custom alerts',
        'Performance analytics'
      ],
      cta: 'Start Free Trial',
      highlighted: true,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Whale',
      price: '99',
      period: 'per month',
      description: 'For professional operations',
      icon: <Crown className="w-5 h-5" />,
      features: [
        'Everything in Professional',
        'API access',
        'White-label options',
        'Personal account manager',
        'Custom integrations',
        'Advanced analytics',
        '24/7 phone support',
        'Early access to features'
      ],
      cta: 'Contact Sales',
      highlighted: false,
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm font-semibold text-orange-400 mb-4">
            Simple Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include 14-day money-back guarantee.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-[#171717] border rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'border-orange-500/50 transform scale-105 shadow-2xl shadow-orange-500/20'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg">
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${plan.gradient} rounded-lg text-white mb-4`}>
                  {plan.icon}
                  <span className="font-semibold">{plan.name}</span>
                </div>

                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-neutral-500 ml-2">/ {plan.period}</span>
                </div>

                <p className="text-neutral-400 text-sm">{plan.description}</p>
              </div>

              <button
                onClick={plan.highlighted ? onStartTrial : undefined}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 mb-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transform hover:scale-105 shadow-lg shadow-orange-500/25'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                {plan.cta}
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'bg-orange-500/20' : 'bg-white/10'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.highlighted ? 'text-orange-400' : 'text-neutral-400'}`} />
                    </div>
                    <span className="text-sm text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-neutral-400 mb-6">
            All plans include 14-day money-back guarantee. No questions asked.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-orange-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-orange-400" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-orange-400" />
              <span>Secure payment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
