import { useState } from 'react';
import InfoPageLayout from '../layouts/InfoPageLayout';
import { Mail, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message. We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <InfoPageLayout
      title="Contact Us"
      description="Get in touch with our team"
    >
      <div className="grid md:grid-cols-2 gap-12 mt-12">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-orange-600 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-orange-600 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-orange-600 transition-colors"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-orange-600 transition-colors resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Other ways to reach us</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <div className="w-10 h-10 bg-orange-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Email</h3>
                  <p className="text-neutral-400 text-sm mb-2">For general inquiries</p>
                  <a href="mailto:support@arbelite.com" className="text-orange-600 hover:text-orange-500">
                    support@arbelite.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <div className="w-10 h-10 bg-orange-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Sales</h3>
                  <p className="text-neutral-400 text-sm mb-2">For enterprise solutions</p>
                  <a href="mailto:sales@arbelite.com" className="text-orange-600 hover:text-orange-500">
                    sales@arbelite.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-600/10 to-orange-800/10 border border-orange-600/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-3">
              Looking for support?
            </h3>
            <p className="text-neutral-300 mb-4">
              Check our Help Center for instant answers to common questions.
            </p>
            <a
              href="/help"
              className="inline-block px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
