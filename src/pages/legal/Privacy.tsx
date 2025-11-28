import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PrivacyProps {
  onNavigate: (page: string) => void;
}

export default function Privacy({ onNavigate }: PrivacyProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/10 h-20 flex items-center px-8">
        <h1 className="text-2xl font-black">Privacy Policy</h1>
      </div>

      <div className="pt-32 pb-32 px-8 max-w-4xl mx-auto space-y-8">
        <p className="text-lg text-neutral-300 leading-relaxed">
          At Arbelite.co, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
          <p className="text-neutral-300 leading-relaxed mb-4"><strong>Log Data:</strong> Like most websites, we collect information that your browser sends whenever you visit our site (e.g., IP address, browser type, pages visited).</p>
          <p className="text-neutral-300 leading-relaxed"><strong>Cookies:</strong> We use cookies to improve user experience and analyze site traffic. You can instruct your browser to refuse all cookies, but some portions of our service may not function properly without them.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
          <p className="text-neutral-300 leading-relaxed">We use the collected data solely to maintain and improve our services, monitor the usage of our website, and detect/prevent technical issues. We do not sell, trade, or rent your personal identification information to others.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Third-Party Links</h2>
          <p className="text-neutral-300 leading-relaxed">Our service may contain links to third-party websites (e.g., sportsbooks or data providers). We have no control over and assume no responsibility for the content or privacy policies of any third-party sites.</p>
        </section>

        <section className="bg-gradient-to-br from-orange-600/10 to-orange-800/10 border border-orange-600/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-neutral-300 leading-relaxed">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@arbelite.co" className="text-orange-500 hover:text-orange-400 font-semibold">info@arbelite.co</a></p>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f]/80 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-4xl mx-auto px-8 py-6 flex items-center justify-between">
          <button onClick={() => onNavigate('terms')} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-lg transition-all text-white font-semibold">
            <ChevronLeft size={20} /> Back
          </button>
          <div className="flex gap-2">
            <button onClick={() => onNavigate('help')} className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-lg transition-all text-white font-semibold">Help</button>
            <button onClick={() => onNavigate('disclaimer')} className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-lg transition-all text-white font-semibold">Disclaimer <ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
