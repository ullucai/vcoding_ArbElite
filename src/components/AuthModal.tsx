import { useState } from 'react';
import { X, Mail, Lock, User, Sparkles } from 'lucide-react';
import Logo from './Logo';

interface AuthModalProps {
  onClose: () => void;
  onGuestAccess: () => void;
}

export default function AuthModal({ onClose, onGuestAccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuestAccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-gradient-to-br from-[#171717] to-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden">
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join the Elite'}
            </h2>
            <p className="text-neutral-400">
              {mode === 'login'
                ? 'Sign in to access your arbitrage opportunities'
                : 'Start your journey to guaranteed profits'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-orange-500/25"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#171717] text-neutral-500">or</span>
            </div>
          </div>

          <button
            onClick={onGuestAccess}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-orange-400" />
            Continue as Guest / Explore Demo
          </button>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-sm text-neutral-400 hover:text-orange-400 transition-colors"
            >
              {mode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>

          {mode === 'register' && (
            <p className="mt-4 text-xs text-neutral-500 text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
