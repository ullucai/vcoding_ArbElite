import React, { useState } from 'react';
import { Settings, Wallet, Bell, Shield, Zap, Target, DollarSign, Percent, ToggleLeft, ToggleRight, Save } from 'lucide-react';

interface SettingsPageProps {
  userTier: 'free' | 'pro' | 'admin';
}

export default function SettingsPage({ userTier }: SettingsPageProps) {
  const [bankroll, setBankroll] = useState(5000);
  const [minYield, setMinYield] = useState(2.5);
  const [maxStake, setMaxStake] = useState(1000);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [stealthMode, setStealthMode] = useState(true);

  const [bookmakers, setBookmakers] = useState([
    { name: 'Pinnacle', enabled: true },
    { name: 'Bet365', enabled: true },
    { name: '1xBet', enabled: true },
    { name: 'Unibet', enabled: true },
    { name: 'Betfair', enabled: true },
    { name: 'WilliamHill', enabled: false },
    { name: '888sport', enabled: false },
    { name: 'Betway', enabled: false },
  ]);

  const toggleBookmaker = (index: number) => {
    const updated = [...bookmakers];
    updated[index].enabled = !updated[index].enabled;
    setBookmakers(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your arbitrage trading preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bankroll Management */}
          <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg flex items-center justify-center border border-orange-500/30">
                <Wallet size={20} className="text-orange-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Bankroll Management</h2>
                <p className="text-xs text-gray-500">Configure your capital allocation</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">Total Bankroll</label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="number"
                      value={bankroll}
                      onChange={(e) => setBankroll(Number(e.target.value))}
                      className="w-full bg-[#0a0a0a] border border-white/10 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-orange-500 transition font-bold text-lg"
                    />
                  </div>
                  <button className="px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 text-orange-400 font-bold rounded-lg transition">
                    Update
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Maximum Stake Per Bet: ${maxStake}
                </label>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={maxStake}
                  onChange={(e) => setMaxStake(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>$100</span>
                  <span>$5,000</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Minimum Yield Filter: {minYield}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={minYield}
                  onChange={(e) => setMinYield(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>0%</span>
                  <span>10%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bookmaker Preferences */}
          <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg flex items-center justify-center border border-blue-500/30">
                <Target size={20} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Active Bookmakers</h2>
                <p className="text-xs text-gray-500">Select your available betting accounts</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {bookmakers.map((bookie, index) => (
                <button
                  key={index}
                  onClick={() => toggleBookmaker(index)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                    bookie.enabled
                      ? 'bg-orange-500/20 border-orange-500/50 text-white'
                      : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
                  }`}
                >
                  <span className="font-semibold text-sm">{bookie.name}</span>
                  {bookie.enabled ? (
                    <ToggleRight size={20} className="text-orange-500" />
                  ) : (
                    <ToggleLeft size={20} className="text-gray-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Automation & Alerts */}
          <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg flex items-center justify-center border border-green-500/30">
                <Bell size={20} className="text-green-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Notifications & Automation</h2>
                <p className="text-xs text-gray-500">Configure alerts and auto-refresh</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Auto-Refresh Feed</div>
                  <div className="text-xs text-gray-500">Update opportunities every 5 seconds</div>
                </div>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`p-1 rounded-lg transition ${autoRefresh ? 'text-orange-500' : 'text-gray-600'}`}
                >
                  {autoRefresh ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Sound Alerts</div>
                  <div className="text-xs text-gray-500">Play sound for high-yield opportunities</div>
                </div>
                <button
                  onClick={() => setSoundAlerts(!soundAlerts)}
                  className={`p-1 rounded-lg transition ${soundAlerts ? 'text-orange-500' : 'text-gray-600'}`}
                >
                  {soundAlerts ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Email Notifications</div>
                  <div className="text-xs text-gray-500">Receive daily performance reports</div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`p-1 rounded-lg transition ${emailNotifications ? 'text-orange-500' : 'text-gray-600'}`}
                >
                  {emailNotifications ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Account Status */}
          <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Account Status</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Current Plan</div>
                <div className={`text-xl font-black ${
                  userTier === 'admin' ? 'text-purple-400' :
                  userTier === 'pro' ? 'text-orange-400' :
                  'text-gray-400'
                }`}>
                  {userTier === 'admin' ? 'Admin Access' : userTier === 'pro' ? 'Pro Member' : 'Free Trial'}
                </div>
              </div>

              {userTier === 'free' && (
                <>
                  <div className="h-px bg-white/10" />
                  <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-3 rounded-lg transition-all hover:scale-105 shadow-lg shadow-orange-600/30">
                    Upgrade to Pro
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stealth Mode */}
          <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-green-500" />
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Stealth Protection</h3>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold text-white">Enabled</div>
                <div className="text-xs text-gray-500">Account masking active</div>
              </div>
              <button
                onClick={() => setStealthMode(!stealthMode)}
                className={`p-1 rounded-lg transition ${stealthMode ? 'text-green-500' : 'text-gray-600'}`}
              >
                {stealthMode ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
              </button>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-2">Current Stealth Score</div>
              <div className="text-3xl font-black text-green-400">98%</div>
              <div className="text-xs text-green-500 mt-1">Elite Protection</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-[#171717] to-[#0f0f0f] border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Active Bookmakers</span>
                <span className="text-sm font-bold text-white">{bookmakers.filter(b => b.enabled).length}/8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Min Yield</span>
                <span className="text-sm font-bold text-orange-400">{minYield}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Max Stake</span>
                <span className="text-sm font-bold text-white">${maxStake}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Auto-Refresh</span>
                <span className={`text-sm font-bold ${autoRefresh ? 'text-green-400' : 'text-gray-600'}`}>
                  {autoRefresh ? 'On' : 'Off'}
                </span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
            <Save size={18} />
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
