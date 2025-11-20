import InfoPageLayout from '../../layouts/InfoPageLayout';

export default function Terms() {
  return (
    <InfoPageLayout
      title="Terms of Service"
      description="Last updated: January 2025"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
          <p className="text-neutral-300 leading-relaxed">
            By accessing and using ArbElite ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            ArbElite provides arbitrage betting analysis and calculation tools. The Service includes:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>Real-time arbitrage opportunity identification</li>
            <li>Stake calculation tools</li>
            <li>Historical performance tracking</li>
            <li>Market analysis and insights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. User Obligations</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Users of the Service agree to:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of their account credentials</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Use the Service responsibly and ethically</li>
            <li>Not engage in any activity that could harm the Service or other users</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Disclaimer of Warranties</h2>
          <p className="text-neutral-300 leading-relaxed">
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DO NOT GUARANTEE THE ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY INFORMATION PROVIDED. PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
          <p className="text-neutral-300 leading-relaxed">
            IN NO EVENT SHALL ARBELITE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">6. Subscription and Payment</h2>
          <p className="text-neutral-300 leading-relaxed">
            Certain features of the Service require a paid subscription. Subscription fees are billed in advance on a recurring basis. You may cancel your subscription at any time through your account settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
          <p className="text-neutral-300 leading-relaxed">
            All content, features, and functionality of the Service are owned by ArbElite and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
          <p className="text-neutral-300 leading-relaxed">
            We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">9. Governing Law</h2>
          <p className="text-neutral-300 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
          <p className="text-neutral-300 leading-relaxed">
            We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
          <p className="text-neutral-300 leading-relaxed">
            For questions about these Terms, please contact us at: legal@arbelite.com
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
