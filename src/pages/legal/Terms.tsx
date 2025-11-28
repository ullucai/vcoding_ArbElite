import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TermsProps {
  onNavigate: (page: string) => void;
}

export default function Terms({ onNavigate }: TermsProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/10 h-20 flex items-center px-8">
        <h1 className="text-2xl font-black">Terms of Service</h1>
      </div>

      <div className="pt-32 pb-32 px-8 max-w-4xl mx-auto space-y-8">
        {/* Intro Section */}
        <section className="border-l-4 border-orange-600 pl-8 py-4">
          <p className="text-neutral-300 leading-relaxed text-lg">
            Welcome to <span className="font-bold text-white">Arbelite.co</span>. By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue use of our site immediately.
          </p>
        </section>

        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
          <p className="text-neutral-300 leading-relaxed">
            Arbelite.co ("the Site" or "we") provides an arbitrage betting analysis and calculation platform. These Terms of Service govern your access to and use of the Site. By using the Site, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with these Terms, you must not use this Site.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Use of Service</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Arbelite.co grants you a limited, non-exclusive, non-transferable license to access and use the Site for your personal, non-commercial use. You agree not to use the Site for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. Specifically, you agree to:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>Not engage in fraud, deception, or misrepresentation</li>
            <li>Not violate any applicable laws or regulations</li>
            <li>Not interfere with the Site's operations or security</li>
            <li>Not impersonate any person or entity</li>
            <li>Not use the Site for any illegal gambling or betting activity</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            All content, data, designs, code, and materials on Arbelite.co are the intellectual property of Arbelite.co unless otherwise stated. This includes but is not limited to:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>Logos, trademarks, and brand names</li>
            <li>Arbitrage calculation algorithms and formulas</li>
            <li>Database structures and data compilations</li>
            <li>Software code and user interface designs</li>
          </ul>
          <p className="text-neutral-300 leading-relaxed mt-4">
            You may not copy, reproduce, distribute, modify, or create derivative works from our content without express written permission. Automated scraping, crawling, data mining, or any form of automated extraction of our website is strictly prohibited.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
          <p className="text-neutral-300 leading-relaxed">
            In no event shall Arbelite.co, its directors, employees, agents, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or any errors, omissions, or inaccuracies in the content. This includes but is not limited to financial losses, lost profits, missed opportunities, or data loss.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Changes to Terms</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site following any modifications constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically for updates.
          </p>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-br from-orange-600/10 to-orange-800/10 border border-orange-600/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Questions or Concerns?</h2>
          <p className="text-neutral-300 leading-relaxed">
            For any questions about these Terms of Service, please contact us at <a href="mailto:info@arbelite.co" className="text-orange-500 hover:text-orange-400 font-semibold transition-colors">info@arbelite.co</a>
          </p>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f]/80 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-4xl mx-auto px-8 py-6 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-lg transition-all text-white font-semibold">
            <ChevronLeft size={20} /> Back to Home
          </button>
          <div className="flex gap-2">
            <button onClick={() => onNavigate('privacy')} className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-lg transition-all text-white font-semibold">
              Privacy
            </button>
            <button onClick={() => onNavigate('disclaimer')} className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-lg transition-all text-white font-semibold">
              Disclaimer <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
