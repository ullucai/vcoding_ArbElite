import { useState } from 'react';
import { Check, Search, Building2 } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { allBookmakers } from '../data/bookmakers';

export default function Settings() {
  const { settings, updateEnabledBookmakers } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookmakers = allBookmakers.filter(bookie =>
    bookie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularBookmakers = filteredBookmakers.filter(b => b.popular);
  const otherBookmakers = filteredBookmakers.filter(b => !b.popular);

  const toggleBookmaker = (bookmakerName: string) => {
    if (settings.enabledBookmakers.includes(bookmakerName)) {
      updateEnabledBookmakers(
        settings.enabledBookmakers.filter(b => b !== bookmakerName)
      );
    } else {
      updateEnabledBookmakers([...settings.enabledBookmakers, bookmakerName]);
    }
  };

  const selectAll = () => {
    updateEnabledBookmakers(allBookmakers.map(b => b.name));
  };

  const deselectAll = () => {
    updateEnabledBookmakers([]);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Bookmaker Configuration</h1>
        <p className="text-neutral-400">
          Select the bookmakers you have accounts with. Only arbitrage opportunities matching your bookmakers will be shown.
        </p>
      </div>

      <div className="bg-[#171717] border border-white/10 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-300">
              <span className="font-bold text-orange-400">{settings.enabledBookmakers.length}</span>
              {' '}of {allBookmakers.length} bookmakers selected
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={selectAll}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white transition-colors"
            >
              Select All
            </button>
            <button
              onClick={deselectAll}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white transition-colors"
            >
              Deselect All
            </button>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search bookmakers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 transition-colors"
          />
        </div>

        {popularBookmakers.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Popular Bookmakers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {popularBookmakers.map((bookmaker) => {
                const isEnabled = settings.enabledBookmakers.includes(bookmaker.name);
                return (
                  <button
                    key={bookmaker.id}
                    onClick={() => toggleBookmaker(bookmaker.name)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                      isEnabled
                        ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                        : 'bg-[#0a0a0a] border-white/10 text-neutral-400 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                      isEnabled ? 'bg-orange-500 border-orange-500' : 'border-white/20'
                    }`}>
                      {isEnabled && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <Building2 className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{bookmaker.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {otherBookmakers.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Other Bookmakers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {otherBookmakers.map((bookmaker) => {
                const isEnabled = settings.enabledBookmakers.includes(bookmaker.name);
                return (
                  <button
                    key={bookmaker.id}
                    onClick={() => toggleBookmaker(bookmaker.name)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                      isEnabled
                        ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                        : 'bg-[#0a0a0a] border-white/10 text-neutral-400 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                      isEnabled ? 'bg-orange-500 border-orange-500' : 'border-white/20'
                    }`}>
                      {isEnabled && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <Building2 className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{bookmaker.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Why configure bookmakers?</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Arbitrage opportunities require placing bets across multiple bookmakers. By selecting only the bookmakers where you have active accounts, we ensure you only see profitable opportunities you can actually execute. This saves time and prevents frustration from seeing opportunities you can't use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
