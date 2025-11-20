export interface Bookmaker {
  id: string;
  name: string;
  logo?: string;
  popular?: boolean;
}

export const allBookmakers: Bookmaker[] = [
  { id: 'pinnacle', name: 'Pinnacle', popular: true },
  { id: 'bet365', name: 'Bet365', popular: true },
  { id: 'williamhill', name: 'WilliamHill', popular: true },
  { id: 'softbet', name: 'SoftBet', popular: false },
  { id: '1xbet', name: '1xBet', popular: true },
  { id: 'unibet', name: 'Unibet', popular: true },
  { id: 'betfair', name: 'Betfair', popular: true },
  { id: 'bwin', name: 'Bwin', popular: false },
  { id: '888sport', name: '888sport', popular: false },
  { id: 'betway', name: 'Betway', popular: true },
  { id: 'draftkings', name: 'DraftKings', popular: true },
  { id: 'fanduel', name: 'FanDuel', popular: true },
  { id: 'caesars', name: 'Caesars', popular: false },
  { id: 'betmgm', name: 'BetMGM', popular: true },
  { id: 'pointsbet', name: 'PointsBet', popular: false },
  { id: 'barstool', name: 'Barstool', popular: false },
  { id: 'foxbet', name: 'FOXBet', popular: false },
  { id: 'sugarhouse', name: 'SugarHouse', popular: false },
  { id: 'betrivers', name: 'BetRivers', popular: false },
  { id: 'wynnbet', name: 'WynnBET', popular: false }
];
