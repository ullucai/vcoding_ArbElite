import { Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';

interface ContactProps {
  onNavigate?: (page: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/10 h-20 flex items-center px-8">
        <h1 className="text-2xl font-black">Contact Us</h1>
      </div>

      <div className="pt-32 pb-32 px-8 max-w-4xl mx-auto space-y-8">
        <p className="text-lg text-neutral-300 leading-relaxed">
          We are here to help! Whether you have a question about our data, a suggestion for a new feature, or a business inquiry, we'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-orange-600/10 to-orange-800/10 border border-orange-600/20 rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
              data-testid="input-contact-name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
              data-testid="input-contact-email"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us what's on your mind..."
              rows={5}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
              data-testid="textarea-contact-message"
            />
          </div>

          {status === 'success' && (
            <div className="p-4 bg-green-600/20 border border-green-600/50 rounded-lg text-green-300 text-sm">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-300 text-sm">
              Failed to send message. Please try again or email us directly at info@arbelite.co
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 rounded-lg transition-all text-white font-semibold"
            data-testid="button-submit-contact"
          >
            <Send size={18} />
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="bg-gradient-to-br from-orange-600/10 to-orange-800/10 border border-orange-600/20 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Direct Email Support</h3>
          <div className="flex items-start gap-4">
            <Mail className="text-orange-500 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="text-neutral-300 leading-relaxed">
                Or reach out to our team directly at <a href="mailto:info@arbelite.co" className="text-orange-500 hover:text-orange-400 font-semibold transition-colors">info@arbelite.co</a>
              </p>
              <p className="text-neutral-400 text-sm mt-2">Response time: Under 2 hours (business days)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f]/80 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-4xl mx-auto px-8 py-6 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-lg transition-all text-white font-semibold" data-testid="button-back-home">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
