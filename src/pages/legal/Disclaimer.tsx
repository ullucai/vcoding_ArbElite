import { ChevronLeft } from 'lucide-react';

interface DisclaimerProps {
  onNavigate: (page: string) => void;
}

export default function Disclaimer({ onNavigate }: DisclaimerProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/10 h-20 flex items-center px-8">
        <h1 className="text-2xl font-black">Risk Disclaimer</h1>
      </div>

      <div className="pt-32 pb-32 px-8 max-w-4xl mx-auto space-y-8">
        <div className="bg-orange-600/20 border-2 border-orange-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-orange-400 mb-3">IMPORTANT: READ CAREFULLY BEFORE USING THIS SERVICE</h3>
          <p className="text-white leading-relaxed">Arbitrage trading involves substantial financial risk. You should carefully consider whether such trading is suitable for you in light of your financial condition and risk tolerance.</p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Financial Risk Warning</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">All forms of trading and investing involve risk. While arbitrage trading is often described as "risk-free," this characterization is theoretical and does not account for practical execution risks.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Not Financial Advice</h2>
          <p className="text-neutral-300 leading-relaxed">The information provided through ArbElite is for informational and educational purposes only. It does not constitute financial advice, investment advice, trading advice, or any other type of professional advice.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Past Performance Disclaimer</h2>
          <p className="text-neutral-300 leading-relaxed"><strong>PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.</strong> Any historical returns, expected returns, or probability projections are hypothetical in nature and may not reflect actual future performance.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Data Accuracy</h2>
          <p className="text-neutral-300 leading-relaxed">While we strive to provide accurate and up-to-date information, we make no representations or warranties regarding the accuracy, completeness, or timeliness of any data or opportunities displayed on our platform.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Legal and Regulatory Compliance</h2>
          <p className="text-neutral-300 leading-relaxed">It is your responsibility to ensure that your use of ArbElite and any trading activities comply with all applicable laws and regulations in your jurisdiction.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">6. No Guarantees</h2>
          <p className="text-neutral-300 leading-relaxed">We make no guarantees regarding the availability of arbitrage opportunities, the profitability of any displayed opportunities, the continued operation of our service, or the accuracy of our calculations.</p>
        </section>

        <section className="bg-gradient-to-br from-orange-600/10 to-orange-800/10 border border-orange-600/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Questions or Concerns?</h2>
          <p className="text-neutral-300 leading-relaxed">For any questions about this disclaimer, please contact us at <a href="mailto:info@arbelite.co" className="text-orange-500 hover:text-orange-400 font-semibold transition-colors">info@arbelite.co</a></p>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f]/80 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-4xl mx-auto px-8 py-6 flex items-center justify-between">
          <button onClick={() => onNavigate('privacy')} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-lg transition-all text-white font-semibold">
            <ChevronLeft size={20} /> Back
          </button>
          <button onClick={() => onNavigate('home')} className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-lg transition-all text-white font-semibold">Home</button>
        </div>
      </div>
    </div>
  );
}
