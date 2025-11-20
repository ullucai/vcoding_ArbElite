import InfoPageLayout from '../../layouts/InfoPageLayout';

export default function Disclaimer() {
  return (
    <InfoPageLayout
      title="Risk Disclaimer"
      description="Important information about financial risk and arbitrage trading"
    >
      <div className="space-y-8">
        <div className="bg-orange-600/20 border-2 border-orange-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-orange-400 mb-3">
            ⚠️ IMPORTANT: READ CAREFULLY BEFORE USING THIS SERVICE
          </h3>
          <p className="text-white leading-relaxed">
            Arbitrage trading involves substantial financial risk. You should carefully consider whether such trading is suitable for you in light of your financial condition and risk tolerance.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Financial Risk Warning</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            <strong>All forms of trading and investing involve risk.</strong> While arbitrage trading is often described as "risk-free," this characterization is theoretical and does not account for practical execution risks. You should be aware of and accept the following risks:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li><strong>Execution Risk:</strong> Market odds can change between identification and placement of bets</li>
            <li><strong>Bookmaker Risk:</strong> Bookmakers may limit or ban accounts engaging in arbitrage</li>
            <li><strong>Settlement Risk:</strong> Different bookmakers may settle bets differently</li>
            <li><strong>Technical Risk:</strong> Platform outages or delays may prevent timely execution</li>
            <li><strong>Capital Risk:</strong> You may lose some or all of your invested capital</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Not Financial Advice</h2>
          <p className="text-neutral-300 leading-relaxed">
            The information provided through ArbElite is for informational and educational purposes only. It does not constitute financial advice, investment advice, trading advice, or any other type of professional advice. You should not interpret any information or materials provided as such. We strongly recommend that you seek advice from qualified financial professionals before making any financial decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Past Performance Disclaimer</h2>
          <p className="text-neutral-300 leading-relaxed">
            <strong>PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.</strong> Any historical returns, expected returns, or probability projections are hypothetical in nature and may not reflect actual future performance. All investments and trading strategies involve risk of loss, and there is no guarantee that any strategy will be profitable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Data Accuracy</h2>
          <p className="text-neutral-300 leading-relaxed">
            While we strive to provide accurate and up-to-date information, we make no representations or warranties regarding the accuracy, completeness, or timeliness of any data or opportunities displayed on our platform. Market conditions change rapidly, and displayed opportunities may no longer be available by the time you attempt to execute them. Always verify odds and terms directly with bookmakers before placing bets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Legal and Regulatory Compliance</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            It is your responsibility to ensure that your use of ArbElite and any trading activities comply with all applicable laws and regulations in your jurisdiction. This includes but is not limited to:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>Gambling and betting regulations</li>
            <li>Tax reporting requirements for gambling income</li>
            <li>Anti-money laundering regulations</li>
            <li>Terms of service of individual bookmakers</li>
          </ul>
          <p className="text-neutral-300 leading-relaxed mt-4">
            Some jurisdictions prohibit or restrict online gambling. You are solely responsible for determining whether your use of this service is legal in your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">6. No Guarantees</h2>
          <p className="text-neutral-300 leading-relaxed">
            We make no guarantees or promises regarding:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>The availability of arbitrage opportunities</li>
            <li>The profitability of any displayed opportunities</li>
            <li>The continued operation of our service</li>
            <li>The accuracy of our calculations or recommendations</li>
            <li>Your ability to successfully execute identified opportunities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Relationships</h2>
          <p className="text-neutral-300 leading-relaxed">
            ArbElite is not affiliated with, endorsed by, or sponsored by any bookmakers or betting operators. We are an independent analytical platform. Any disputes with bookmakers must be resolved directly with those entities. We are not responsible for the actions, policies, or practices of any third-party bookmakers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
          <p className="text-neutral-300 leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ARBELITE SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO FINANCIAL LOSSES, LOST PROFITS, OR MISSED OPPORTUNITIES.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">9. Responsible Trading</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            We encourage responsible trading practices:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>Only risk capital you can afford to lose</li>
            <li>Set and adhere to strict loss limits</li>
            <li>Diversify your strategies and don't over-concentrate positions</li>
            <li>Maintain detailed records for tax and analytical purposes</li>
            <li>Seek help if you believe you may have a gambling problem</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">10. Acknowledgment</h2>
          <p className="text-neutral-300 leading-relaxed">
            By using ArbElite, you acknowledge that you have read, understood, and agree to this disclaimer. You accept full responsibility for your trading decisions and any resulting gains or losses. You understand that arbitrage trading requires skill, knowledge, and careful risk management, and that success is not guaranteed.
          </p>
        </section>

        <section className="border-t border-neutral-800 pt-8">
          <p className="text-neutral-400 text-sm">
            For questions about this disclaimer, please contact: legal@arbelite.com
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
