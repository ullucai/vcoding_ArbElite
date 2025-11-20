export type Sport = 'football' | 'basketball' | 'tennis';

export interface Outcome {
  label: string;
  bookmaker: string;
  odds: number;
}

export interface ArbitrageOpportunity {
  id: string;
  sport: Sport;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: Date;
  isLive: boolean;
  profit: number;
  outcomes: Outcome[];
  market: string;
}

export interface FilterState {
  sports: Sport[];
  bookmakers: string[];
  profitRange: [number, number];
}
