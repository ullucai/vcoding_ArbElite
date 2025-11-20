import React from 'react';
import { User, Mail, Calendar, TrendingUp, Award, Crown } from 'lucide-react';

interface ProfilePageProps {
  userTier: 'free' | 'pro' | 'admin';
}

export default function ProfilePage({ userTier }: ProfilePageProps) {
  const tierInfo = {
    free: { name: 'Free Account', color: 'gray', icon: User },
    pro: { name: 'Pro Member', color: 'orange', icon: Award },
    admin: { name: 'Admin Access', color: 'purple', icon: Crown }
  };

  const current = tierInfo[userTier];
  const TierIcon = current.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Profile</h1>
        <p className="text-gray-400">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-8">
          <div className="flex items-start gap-6 mb-8">
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${
              current.color === 'orange' ? 'from-orange-500/30 to-orange-600/10 border-orange-500/40' :
              current.color === 'purple' ? 'from-purple-500/30 to-purple-600/10 border-purple-500/40' :
              'from-gray-500/30 to-gray-600/10 border-gray-500/40'
            } border-2 flex items-center justify-center`}>
              <TierIcon size={40} className={
                current.color === 'orange' ? 'text-orange-500' :
                current.color === 'purple' ? 'text-purple-500' :
                'text-gray-500'
              } />
            </div>
            <div className="flex-1">
              <div className={`inline-block px-3 py-1 rounded-lg border text-xs font-bold mb-3 ${
                current.color === 'orange' ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' :
                current.color === 'purple' ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' :
                'bg-gray-500/20 border-gray-500/50 text-gray-400'
              }`}>
                {current.name}
              </div>
              <h2 className="text-2xl font-black text-white mb-2">
                {userTier === 'admin' ? 'Admin User' : userTier === 'pro' ? 'Pro Trader' : 'Demo Account'}
              </h2>
              <p className="text-gray-400">
                {userTier === 'admin'
                  ? 'Full system access with all features unlocked'
                  : userTier === 'pro'
                  ? 'Unlimited arbitrage opportunities and premium features'
                  : 'Limited access - Upgrade to unlock all features'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <Mail size={20} className="text-gray-500" />
              <div>
                <div className="text-xs text-gray-500 mb-1">Email</div>
                <div className="text-sm font-semibold text-white">
                  {userTier === 'admin' ? 'admin@arbelite.com' : 'demo@arbelite.com'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <Calendar size={20} className="text-gray-500" />
              <div>
                <div className="text-xs text-gray-500 mb-1">Member Since</div>
                <div className="text-sm font-semibold text-white">January 2025</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <TrendingUp size={20} className="text-gray-500" />
              <div>
                <div className="text-xs text-gray-500 mb-1">Account Status</div>
                <div className="text-sm font-semibold text-green-400">Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Performance Stats</h3>
            <div className="space-y-5">
              <div>
                <div className="text-xs text-gray-500 mb-2">Total Trades</div>
                <div className="text-3xl font-black text-white">127</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-2">Avg ROI</div>
                <div className="text-3xl font-black text-green-400">+14.2%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-2">Success Rate</div>
                <div className="text-3xl font-black text-orange-400">98.4%</div>
              </div>
            </div>
          </div>

          {userTier === 'free' && (
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/40 rounded-xl p-6">
              <h3 className="text-lg font-black text-white mb-3">Upgrade to Pro</h3>
              <ul className="space-y-2 mb-6 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  Unlimited opportunities
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  Priority support
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-3 rounded-lg transition-all hover:scale-105">
                Upgrade Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
