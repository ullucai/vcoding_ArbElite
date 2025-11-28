interface SportLogoProps {
  sportKey: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SPORT_LOGOS = {
  'americanfootball_nfl': { name: 'NFL', abbr: 'NFL', color: 'from-blue-600 to-blue-800' },
  'basketball_nba': { name: 'NBA', abbr: 'NBA', color: 'from-orange-600 to-orange-800' },
  'icehockey_nhl': { name: 'NHL', abbr: 'NHL', color: 'from-blue-600 to-red-800' },
  'baseball_mlb': { name: 'MLB', abbr: 'MLB', color: 'from-red-600 to-blue-800' },
  'soccer_epl': { name: 'Premier League', abbr: 'EPL', color: 'from-green-600 to-green-800' },
  'soccer_premierleague': { name: 'Premier League', abbr: 'PL', color: 'from-purple-600 to-purple-800' },
  'soccer_uefa_champs_league': { name: 'Champions League', abbr: 'UCL', color: 'from-blue-700 to-blue-900' },
  'soccer_fifa_world_cup': { name: 'World Cup', abbr: 'WC', color: 'from-yellow-600 to-red-600' },
  'tennis_atp': { name: 'ATP Tennis', abbr: 'ATP', color: 'from-green-600 to-green-800' },
  'tennis_wta': { name: 'WTA Tennis', abbr: 'WTA', color: 'from-pink-600 to-pink-800' },
  'mma_mixed_martial_arts': { name: 'Mixed Martial Arts', abbr: 'MMA', color: 'from-red-700 to-red-900' },
  'cricket_test': { name: 'Test Cricket', abbr: 'TC', color: 'from-green-700 to-green-900' },
  'rugby_union': { name: 'Rugby Union', abbr: 'RU', color: 'from-amber-700 to-amber-900' },
  'golf_pga': { name: 'PGA Golf', abbr: 'PGA', color: 'from-green-700 to-green-900' }
};

export function SportLogo({ sportKey, size = 'md', className = '' }: SportLogoProps) {
  const sport = SPORT_LOGOS[sportKey as keyof typeof SPORT_LOGOS] || { 
    name: sportKey.toUpperCase(), 
    abbr: sportKey.substring(0, 3).toUpperCase(),
    color: 'from-gray-600 to-gray-800'
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs font-bold',
    md: 'w-12 h-12 text-sm font-bold',
    lg: 'w-16 h-16 text-base font-bold'
  };

  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-gradient-to-br ${sport.color} shadow-lg ${sizeClasses[size]} ${className}`}
      title={sport.name}
      data-testid={`sport-logo-${sportKey}`}
    >
      <span className="select-none text-white">{sport.abbr}</span>
    </div>
  );
}
