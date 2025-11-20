import { ArbitrageOpportunity } from '../types/arbitrage';

export const mockArbitrageData: ArbitrageOpportunity[] = [
  {
    id: '1',
    sport: 'football',
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    isLive: false,
    profit: 4.25,
    market: '1X2',
    outcomes: [
      { label: 'Home Win', bookmaker: 'Pinnacle', odds: 2.15 },
      { label: 'Draw', bookmaker: 'Bet365', odds: 3.80 },
      { label: 'Away Win', bookmaker: 'WilliamHill', odds: 3.45 }
    ]
  },
  {
    id: '2',
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'Los Angeles Lakers',
    awayTeam: 'Boston Celtics',
    startTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    isLive: true,
    profit: 2.85,
    market: 'Moneyline',
    outcomes: [
      { label: 'Lakers Win', bookmaker: '1xBet', odds: 1.95 },
      { label: 'Celtics Win', bookmaker: 'Pinnacle', odds: 2.05 }
    ]
  },
  {
    id: '3',
    sport: 'tennis',
    league: 'ATP Masters',
    homeTeam: 'Novak Djokovic',
    awayTeam: 'Carlos Alcaraz',
    startTime: new Date(Date.now() + 1 * 60 * 60 * 1000),
    isLive: false,
    profit: 5.67,
    market: 'Match Winner',
    outcomes: [
      { label: 'Djokovic', bookmaker: 'Bet365', odds: 1.85 },
      { label: 'Alcaraz', bookmaker: 'SoftBet', odds: 2.20 }
    ]
  },
  {
    id: '4',
    sport: 'football',
    league: 'La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    isLive: false,
    profit: 3.42,
    market: '1X2',
    outcomes: [
      { label: 'Home Win', bookmaker: 'WilliamHill', odds: 2.30 },
      { label: 'Draw', bookmaker: '1xBet', odds: 3.60 },
      { label: 'Away Win', bookmaker: 'Pinnacle', odds: 3.10 }
    ]
  },
  {
    id: '5',
    sport: 'basketball',
    league: 'EuroLeague',
    homeTeam: 'Real Madrid',
    awayTeam: 'Panathinaikos',
    startTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
    isLive: true,
    profit: 1.95,
    market: 'Moneyline',
    outcomes: [
      { label: 'Real Madrid', bookmaker: 'Bet365', odds: 1.72 },
      { label: 'Panathinaikos', bookmaker: 'SoftBet', odds: 2.35 }
    ]
  },
  {
    id: '6',
    sport: 'football',
    league: 'Bundesliga',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    startTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    isLive: false,
    profit: 2.15,
    market: '1X2',
    outcomes: [
      { label: 'Home Win', bookmaker: 'Pinnacle', odds: 1.65 },
      { label: 'Draw', bookmaker: 'WilliamHill', odds: 4.20 },
      { label: 'Away Win', bookmaker: '1xBet', odds: 5.50 }
    ]
  },
  {
    id: '7',
    sport: 'tennis',
    league: 'WTA Finals',
    homeTeam: 'Iga Swiatek',
    awayTeam: 'Aryna Sabalenka',
    startTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    isLive: false,
    profit: 6.82,
    market: 'Match Winner',
    outcomes: [
      { label: 'Swiatek', bookmaker: '1xBet', odds: 1.95 },
      { label: 'Sabalenka', bookmaker: 'Bet365', odds: 2.10 }
    ]
  },
  {
    id: '8',
    sport: 'football',
    league: 'Serie A',
    homeTeam: 'Inter Milan',
    awayTeam: 'AC Milan',
    startTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
    isLive: false,
    profit: 4.68,
    market: '1X2',
    outcomes: [
      { label: 'Home Win', bookmaker: 'SoftBet', odds: 2.05 },
      { label: 'Draw', bookmaker: 'Pinnacle', odds: 3.50 },
      { label: 'Away Win', bookmaker: 'Bet365', odds: 3.75 }
    ]
  },
  {
    id: '9',
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'Golden State Warriors',
    awayTeam: 'Phoenix Suns',
    startTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    isLive: false,
    profit: 3.25,
    market: 'Moneyline',
    outcomes: [
      { label: 'Warriors Win', bookmaker: 'WilliamHill', odds: 2.10 },
      { label: 'Suns Win', bookmaker: 'Pinnacle', odds: 1.88 }
    ]
  },
  {
    id: '10',
    sport: 'football',
    league: 'Ligue 1',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    startTime: new Date(Date.now() + 18 * 60 * 60 * 1000),
    isLive: false,
    profit: 1.85,
    market: '1X2',
    outcomes: [
      { label: 'Home Win', bookmaker: 'Bet365', odds: 1.45 },
      { label: 'Draw', bookmaker: '1xBet', odds: 4.80 },
      { label: 'Away Win', bookmaker: 'SoftBet', odds: 7.20 }
    ]
  },
  {
    id: '11',
    sport: 'tennis',
    league: 'US Open',
    homeTeam: 'Daniil Medvedev',
    awayTeam: 'Stefanos Tsitsipas',
    startTime: new Date(Date.now() + 7 * 60 * 60 * 1000),
    isLive: true,
    profit: 4.92,
    market: 'Match Winner',
    outcomes: [
      { label: 'Medvedev', bookmaker: 'Pinnacle', odds: 1.78 },
      { label: 'Tsitsipas', bookmaker: 'WilliamHill', odds: 2.25 }
    ]
  },
  {
    id: '12',
    sport: 'football',
    league: 'Championship',
    homeTeam: 'Leeds United',
    awayTeam: 'Sheffield United',
    startTime: new Date(Date.now() + 15 * 60 * 60 * 1000),
    isLive: false,
    profit: 7.15,
    market: '1X2',
    outcomes: [
      { label: 'Home Win', bookmaker: '1xBet', odds: 2.45 },
      { label: 'Draw', bookmaker: 'SoftBet', odds: 3.30 },
      { label: 'Away Win', bookmaker: 'Pinnacle', odds: 2.95 }
    ]
  },
  {
    id: '13',
    sport: 'basketball',
    league: 'NCAA',
    homeTeam: 'Duke Blue Devils',
    awayTeam: 'UNC Tar Heels',
    startTime: new Date(Date.now() + 10 * 60 * 60 * 1000),
    isLive: false,
    profit: 2.48,
    market: 'Moneyline',
    outcomes: [
      { label: 'Duke', bookmaker: 'Bet365', odds: 1.92 },
      { label: 'UNC', bookmaker: '1xBet', odds: 2.08 }
    ]
  },
  {
    id: '14',
    sport: 'tennis',
    league: 'French Open',
    homeTeam: 'Rafael Nadal',
    awayTeam: 'Alexander Zverev',
    startTime: new Date(Date.now() + 20 * 60 * 60 * 1000),
    isLive: false,
    profit: 8.35,
    market: 'Match Winner',
    outcomes: [
      { label: 'Nadal', bookmaker: 'WilliamHill', odds: 1.65 },
      { label: 'Zverev', bookmaker: 'SoftBet', odds: 2.55 }
    ]
  },
  {
    id: '15',
    sport: 'football',
    league: 'Europa League',
    homeTeam: 'Arsenal',
    awayTeam: 'Sevilla',
    startTime: new Date(Date.now() + 22 * 60 * 60 * 1000),
    isLive: false,
    profit: 3.78,
    market: '1X2',
    outcomes: [
      { label: 'Home Win', bookmaker: 'Pinnacle', odds: 1.95 },
      { label: 'Draw', bookmaker: 'Bet365', odds: 3.65 },
      { label: 'Away Win', bookmaker: '1xBet', odds: 4.10 }
    ]
  }
];

export const bookmakers = ['Pinnacle', 'Bet365', 'WilliamHill', 'SoftBet', '1xBet'];
