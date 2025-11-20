import { useState } from 'react';
import { Bell } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [showAlertModal, setShowAlertModal] = useState(false);
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Logo />

            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors">
                Live
              </a>
              <a href="#" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                History
              </a>
              <a href="#" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                Guide
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAlertModal(true)}
              className="relative p-2 hover:bg-white/5 rounded-lg transition-colors group"
            >
              <Bell className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            </button>

            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95">
              Go Pro
            </button>
          </div>

          {showAlertModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowAlertModal(false)}>
              <div className="bg-[#171717] border border-white/10 rounded-2xl p-8 max-w-md" onClick={(e) => e.stopPropagation()}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Smart Alerts</h3>
                  <p className="text-neutral-400 mb-6">
                    Upgrade to Professional to receive instant notifications for high-profit arbitrage opportunities matching your criteria.
                  </p>
                  <button
                    onClick={() => setShowAlertModal(false)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all"
                  >
                    Upgrade Now
                  </button>
                  <button
                    onClick={() => setShowAlertModal(false)}
                    className="w-full mt-2 px-6 py-3 text-neutral-400 hover:text-white transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
