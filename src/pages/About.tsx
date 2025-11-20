import InfoPageLayout from '../layouts/InfoPageLayout';

export default function About() {
  return (
    <InfoPageLayout
      title="About ArbElite"
      description="Building the future of intelligent arbitrage trading"
    >
      <div className="space-y-12">
        <section className="border-l-4 border-orange-600 pl-8 py-4">
          <blockquote className="text-3xl md:text-4xl font-light text-white leading-relaxed italic">
            "We believe financial markets should be accessible, transparent, and profitable for everyone willing to learn the mathematics behind them."
          </blockquote>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-neutral-300 leading-relaxed text-lg mb-4">
            ArbElite was founded on a simple principle: arbitrage opportunities exist everywhere in financial markets, but accessing them requires sophisticated technology, real-time data, and mathematical precision.
          </p>
          <p className="text-neutral-300 leading-relaxed text-lg mb-4">
            We've built a platform that democratizes access to institutional-grade arbitrage tools. Our algorithms scan thousands of markets per second, identifying risk-free profit opportunities that disappear in minutes. What used to require a team of analysts and custom software is now available to individual traders.
          </p>
          <p className="text-neutral-300 leading-relaxed text-lg">
            We're not building a betting platform. We're building a financial instrument for the modern age—precise, mathematical, and designed for serious traders who understand that consistent profits come from disciplined execution and superior information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Our Approach</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Technology First</h3>
              <p className="text-neutral-300 leading-relaxed">
                Built on cutting-edge infrastructure with microsecond-level precision. Our systems process millions of data points daily to identify opportunities others miss.
              </p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Risk Management</h3>
              <p className="text-neutral-300 leading-relaxed">
                Every feature is designed with capital preservation in mind. We provide the tools to manage exposure, calculate optimal positions, and protect your portfolio.
              </p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Transparency</h3>
              <p className="text-neutral-300 leading-relaxed">
                No hidden fees, no misleading promises. We show you the math, the risks, and the realistic expectations of arbitrage trading.
              </p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Community</h3>
              <p className="text-neutral-300 leading-relaxed">
                Join thousands of traders sharing strategies, insights, and market intelligence. Success in arbitrage comes from continuous learning.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-orange-600/10 to-orange-800/10 border border-orange-600/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Join Us</h2>
          <p className="text-neutral-300 leading-relaxed text-lg mb-6">
            Whether you're an experienced trader or just discovering arbitrage opportunities, ArbElite provides the infrastructure you need to succeed. Start with our free tier and scale as your operation grows.
          </p>
          <a
            href="/pricing"
            className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            View Pricing
          </a>
        </section>
      </div>
    </InfoPageLayout>
  );
}
