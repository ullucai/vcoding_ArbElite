import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BetRecord {
  id: string;
  date: Date;
  event: string;
  profitPercentage: number;
  investment: number;
  netProfit: number;
  status: 'pending' | 'settled' | 'cancelled';
}

interface UserSettings {
  enabledBookmakers: string[];
  sidebarCollapsed: boolean;
  roundStakes: boolean;
}

interface UserContextType {
  settings: UserSettings;
  updateEnabledBookmakers: (bookmakers: string[]) => void;
  toggleSidebar: () => void;
  toggleRoundStakes: () => void;
  betHistory: BetRecord[];
  addBet: (bet: Omit<BetRecord, 'id'>) => void;
  updateBetStatus: (id: string, status: BetRecord['status']) => void;
  totalProfit: number;
  totalInvestment: number;
  roi: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'arbelite_settings',
  BET_HISTORY: 'arbelite_bet_history'
};

const DEFAULT_BOOKMAKERS = [
  'Pinnacle',
  'Bet365',
  'WilliamHill',
  'SoftBet',
  '1xBet',
  'Unibet',
  'Betfair',
  'Bwin',
  '888sport',
  'Betway'
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      enabledBookmakers: DEFAULT_BOOKMAKERS,
      sidebarCollapsed: false,
      roundStakes: false
    };
  });

  const [betHistory, setBetHistory] = useState<BetRecord[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.BET_HISTORY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((bet: any) => ({
        ...bet,
        date: new Date(bet.date)
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BET_HISTORY, JSON.stringify(betHistory));
  }, [betHistory]);

  const updateEnabledBookmakers = (bookmakers: string[]) => {
    setSettings(prev => ({ ...prev, enabledBookmakers: bookmakers }));
  };

  const toggleSidebar = () => {
    setSettings(prev => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  };

  const toggleRoundStakes = () => {
    setSettings(prev => ({ ...prev, roundStakes: !prev.roundStakes }));
  };

  const addBet = (bet: Omit<BetRecord, 'id'>) => {
    const newBet: BetRecord = {
      ...bet,
      id: Date.now().toString()
    };
    setBetHistory(prev => [newBet, ...prev]);
  };

  const updateBetStatus = (id: string, status: BetRecord['status']) => {
    setBetHistory(prev =>
      prev.map(bet => (bet.id === id ? { ...bet, status } : bet))
    );
  };

  const totalProfit = betHistory
    .filter(bet => bet.status === 'settled')
    .reduce((sum, bet) => sum + bet.netProfit, 0);

  const totalInvestment = betHistory
    .filter(bet => bet.status === 'settled')
    .reduce((sum, bet) => sum + bet.investment, 0);

  const roi = totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;

  return (
    <UserContext.Provider
      value={{
        settings,
        updateEnabledBookmakers,
        toggleSidebar,
        toggleRoundStakes,
        betHistory,
        addBet,
        updateBetStatus,
        totalProfit,
        totalInvestment,
        roi
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
