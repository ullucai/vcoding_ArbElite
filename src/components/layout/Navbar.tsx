import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import Logo from '../Logo';

type Page = 'home' | 'dashboard' | 'features' | 'pricing' | 'about' | 'terms' | 'privacy' | 'help' | 'contact' | 'disclaimer';

interface NavbarProps {
  onOpenAuth: () => void;
  onNavigate: (page: Page) => void;
}

export default function Navbar({ onOpenAuth, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => onNavigate('home')} className="flex items-center">
            <Logo />
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate('features')} className="text-gray-400 hover:text-white transition">Features</button>
            <button onClick={() => onNavigate('pricing')} className="text-gray-400 hover:text-white transition">Pricing</button>
            <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-white transition">About</button>
            <button onClick={() => onNavigate('dashboard')} className="text-gray-400 hover:text-white transition">Dashboard</button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <button className="text-gray-400 hover:text-white transition" data-testid="button-navbar-login">
                Login
              </button>
            </Link>
            <Link href="/login">
              <button
                className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:scale-105"
                data-testid="button-navbar-start-trial"
              >
                Start Free Trial
              </button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-4">
              <button onClick={() => { onNavigate('features'); setIsOpen(false); }} className="text-gray-400 hover:text-white transition text-left">Features</button>
              <button onClick={() => { onNavigate('pricing'); setIsOpen(false); }} className="text-gray-400 hover:text-white transition text-left">Pricing</button>
              <button onClick={() => { onNavigate('about'); setIsOpen(false); }} className="text-gray-400 hover:text-white transition text-left">About</button>
              <button onClick={() => { onNavigate('dashboard'); setIsOpen(false); }} className="text-gray-400 hover:text-white transition text-left">Dashboard</button>
              <Link href="/login">
                <button onClick={() => setIsOpen(false)} className="bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold text-left w-full" data-testid="button-mobile-start-trial">
                  Start Free Trial
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
