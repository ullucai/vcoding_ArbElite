export interface Sport {
  key: string;
  title: string;
  category: 'traditional' | 'esports';
  active: boolean;
}

export interface Bookmaker {
  key: string;
  title: string;
  region: string;
}

export interface Outcome {
  name: string;
  price: number; // decimal odds
}

export interface Market {
  key: string;
  outcomes: Outcome[];
}

export interface OddsEvent {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: {
    key: string;
    title: string;
    markets: Market[];
  }[];
}

export interface ArbitrageOpportunity {
  id: string;
  sport_key: string;
  sport_title: string;
  league: string;
  home_team: string;
  away_team: string;
  commence_time: string;
  market_type: string;
  profit_percentage: number;
  total_stake: number;
  bets: {
    outcome: string;
    bookmaker: string;
    odds: number;
    stake: number;
    potential_return: number;
  }[];
  risk_score: number; // 1-10, lower is better
  expires_at: string;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export interface ApiUsageStats {
  requests_used: number;
  requests_remaining: number;
  reset_date: string;
  last_request: string;
}
