import { Twitter, Github, Linkedin, Mail, Shield } from 'lucide-react';
import Logo from '../Logo';

type Page = 'home' | 'dashboard' | 'features' | 'pricing' | 'about' | 'terms' | 'privacy' | 'help' | 'contact' | 'disclaimer';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const links = {
    product: [
      { label: 'Features', page: 'features' as Page },
      { label: 'Pricing', page: 'pricing' as Page }
    ],
    company: [
      { label: 'About Us', page: 'about' as Page }
    ],
    legal: [
      { label: 'Terms of Service', page: 'terms' as Page },
      { label: 'Privacy Policy', page: 'privacy' as Page },
      { label: 'Disclaimer', page: 'disclaimer' as Page }
    ],
    support: [
      { label: 'Help Center', page: 'help' as Page },
      { label: 'Contact', page: 'contact' as Page }
    ]
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, href: '#', label: 'Email' }
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-neutral-400 text-sm mb-6 max-w-xs">
              Mathematical arbitrage platform for strategic sports investors. Guaranteed yields through data-driven execution.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-xs font-semibold text-green-400">Responsible Gaming Certified</span>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/30 rounded-lg flex items-center justify-center text-neutral-400 hover:text-orange-400 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {links.product.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-neutral-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-neutral-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-neutral-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {links.support.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-neutral-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              © 2025 ArbElite. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-xs text-neutral-500">
              <span>Arbitrage is legal and risk-free</span>
              <span className="text-neutral-700">•</span>
              <span>18+ only</span>
              <span className="text-neutral-700">•</span>
              <span>Play responsibly</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
