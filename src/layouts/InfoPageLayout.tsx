import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import Logo from '../components/Logo';
import { ArrowLeft } from 'lucide-react';

interface InfoPageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function InfoPageLayout({ children, title, description }: InfoPageLayoutProps) {
  const [location, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="prose prose-invert prose-orange max-w-none">
          {children}
        </div>
      </div>

      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-neutral-500">
            © 2025 ArbElite. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
