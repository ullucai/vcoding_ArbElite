import type { OddsEvent, ArbitrageOpportunity } from '../shared/schema';

interface OutcomeOption {
  name: string;
  bookmaker: string;
  bookmakerKey: string;
  odds: number;
  impliedProb: number;
}

export function calculateArbitrage(event: OddsEvent): ArbitrageOpportunity | null {
  const marketOpportunities: ArbitrageOpportunity[] = [];

  // Only process h2h (head-to-head) markets for now
  const h2hBookmakers = event.bookmakers.filter(bm => 
    bm.markets.some(m => m.key === 'h2h')
  );

  if (h2hBookmakers.length < 2) {
    // Need at least 2 bookmakers to have a cross-book arbitrage
    return null;
  }

  // Collect all outcomes with their bookmakers
  const outcomeOptions: OutcomeOption[] = [];
  
  for (const bookmaker of h2hBookmakers) {
    const h2hMarket = bookmaker.markets.find(m => m.key === 'h2h');
    if (!h2hMarket) continue;

    for (const outcome of h2hMarket.outcomes) {
      outcomeOptions.push({
        name: outcome.name,
        bookmaker: bookmaker.title,
        bookmakerKey: bookmaker.key,
        odds: outcome.price,
        impliedProb: 1 / outcome.price
      });
    }
  }

  if (outcomeOptions.length === 0) return null;

  // Get unique outcome names
  const uniqueOutcomes = Array.from(new Set(outcomeOptions.map(o => o.name)));
  
  if (uniqueOutcomes.length < 2) {
    // Need at least 2 different outcomes (e.g., home vs away)
    return null;
  }

  // For 2-outcome markets (most common: home/away, over/under)
  if (uniqueOutcomes.length === 2) {
    const [outcome1Name, outcome2Name] = uniqueOutcomes;
    
    // Get all options for each outcome
    const outcome1Options = outcomeOptions.filter(o => o.name === outcome1Name);
    const outcome2Options = outcomeOptions.filter(o => o.name === outcome2Name);

    let bestArbitrage: ArbitrageOpportunity | null = null;
    let bestProfitPercentage = 0;

    // Test every combination of bookmakers (cross-book arbitrage)
    for (const opt1 of outcome1Options) {
      for (const opt2 of outcome2Options) {
        // CRITICAL: Ensure different bookmakers
        if (opt1.bookmakerKey === opt2.bookmakerKey) {
          continue; // Skip same-book combinations
        }

        const totalImpliedProb = opt1.impliedProb + opt2.impliedProb;

        // Check for arbitrage opportunity (total implied probability < 1)
        if (totalImpliedProb < 0.98) { // 2% margin - allows marginal opportunities
          const profitPercentage = ((1 / totalImpliedProb) - 1) * 100;
          const totalStake = 1000; // Base calculation on $1000

          // Calculate stake for each bet
          const stake1 = (totalStake * opt1.impliedProb) / totalImpliedProb;
          const stake2 = (totalStake * opt2.impliedProb) / totalImpliedProb;

          const bets = [
            {
              outcome: opt1.name,
              bookmaker: opt1.bookmaker,
              odds: opt1.odds,
              stake: Math.round(stake1 * 100) / 100,
              potential_return: Math.round(stake1 * opt1.odds * 100) / 100
            },
            {
              outcome: opt2.name,
              bookmaker: opt2.bookmaker,
              odds: opt2.odds,
              stake: Math.round(stake2 * 100) / 100,
              potential_return: Math.round(stake2 * opt2.odds * 100) / 100
            }
          ];

          // Risk score: lower is better
          const timeUntilEvent = new Date(event.commence_time).getTime() - Date.now();
          const hoursUntilEvent = timeUntilEvent / (1000 * 60 * 60);
          const riskScore = Math.min(10, Math.max(1, 
            (profitPercentage < 2 ? 3 : 0) + // Low profit = higher risk
            (hoursUntilEvent > 24 ? 2 : 0) + // Far future = higher risk
            (hoursUntilEvent < 1 ? 3 : 0) // Very soon = higher risk (odds might change)
          ));

          if (profitPercentage > bestProfitPercentage) {
            bestProfitPercentage = profitPercentage;
            bestArbitrage = {
              id: `${event.id}_h2h_${opt1.bookmakerKey}_${opt2.bookmakerKey}`,
              sport_key: event.sport_key,
              sport_title: event.sport_title,
              league: event.sport_title,
              home_team: event.home_team,
              away_team: event.away_team,
              commence_time: event.commence_time,
              market_type: 'h2h',
              profit_percentage: Math.round(profitPercentage * 100) / 100,
              total_stake: totalStake,
              bets,
              risk_score: riskScore,
              expires_at: event.commence_time
            };
          }
        }
      }
    }

    if (bestArbitrage) {
      marketOpportunities.push(bestArbitrage);
    }
  }

  // For 3-outcome markets (e.g., soccer 1X2: home/draw/away)
  if (uniqueOutcomes.length === 3) {
    const [outcome1Name, outcome2Name, outcome3Name] = uniqueOutcomes;
    
    const outcome1Options = outcomeOptions.filter(o => o.name === outcome1Name);
    const outcome2Options = outcomeOptions.filter(o => o.name === outcome2Name);
    const outcome3Options = outcomeOptions.filter(o => o.name === outcome3Name);

    let bestArbitrage: ArbitrageOpportunity | null = null;
    let bestProfitPercentage = 0;

    // Test every combination of 3 different bookmakers
    for (const opt1 of outcome1Options) {
      for (const opt2 of outcome2Options) {
        for (const opt3 of outcome3Options) {
          // CRITICAL: Ensure all different bookmakers
          const bookmakers = new Set([opt1.bookmakerKey, opt2.bookmakerKey, opt3.bookmakerKey]);
          if (bookmakers.size < 3) {
            continue; // Skip if any bookmakers are the same
          }

          const totalImpliedProb = opt1.impliedProb + opt2.impliedProb + opt3.impliedProb;

          if (totalImpliedProb < 0.98) {
            const profitPercentage = ((1 / totalImpliedProb) - 1) * 100;
            const totalStake = 1000;

            const stake1 = (totalStake * opt1.impliedProb) / totalImpliedProb;
            const stake2 = (totalStake * opt2.impliedProb) / totalImpliedProb;
            const stake3 = (totalStake * opt3.impliedProb) / totalImpliedProb;

            const bets = [
              {
                outcome: opt1.name,
                bookmaker: opt1.bookmaker,
                odds: opt1.odds,
                stake: Math.round(stake1 * 100) / 100,
                potential_return: Math.round(stake1 * opt1.odds * 100) / 100
              },
              {
                outcome: opt2.name,
                bookmaker: opt2.bookmaker,
                odds: opt2.odds,
                stake: Math.round(stake2 * 100) / 100,
                potential_return: Math.round(stake2 * opt2.odds * 100) / 100
              },
              {
                outcome: opt3.name,
                bookmaker: opt3.bookmaker,
                odds: opt3.odds,
                stake: Math.round(stake3 * 100) / 100,
                potential_return: Math.round(stake3 * opt3.odds * 100) / 100
              }
            ];

            const timeUntilEvent = new Date(event.commence_time).getTime() - Date.now();
            const hoursUntilEvent = timeUntilEvent / (1000 * 60 * 60);
            const riskScore = Math.min(10, Math.max(1, 
              (profitPercentage < 2 ? 3 : 0) +
              (hoursUntilEvent > 24 ? 2 : 0) +
              (hoursUntilEvent < 1 ? 3 : 0) +
              1 // 3-way bets are inherently riskier
            ));

            if (profitPercentage > bestProfitPercentage) {
              bestProfitPercentage = profitPercentage;
              bestArbitrage = {
                id: `${event.id}_h2h_3way_${opt1.bookmakerKey}_${opt2.bookmakerKey}_${opt3.bookmakerKey}`,
                sport_key: event.sport_key,
                sport_title: event.sport_title,
                league: event.sport_title,
                home_team: event.home_team,
                away_team: event.away_team,
                commence_time: event.commence_time,
                market_type: 'h2h_3way',
                profit_percentage: Math.round(profitPercentage * 100) / 100,
                total_stake: totalStake,
                bets,
                risk_score: riskScore,
                expires_at: event.commence_time
              };
            }
          }
        }
      }
    }

    if (bestArbitrage) {
      marketOpportunities.push(bestArbitrage);
    }
  }

  // Return the best opportunity for this event (highest profit)
  if (marketOpportunities.length === 0) return null;
  return marketOpportunities.sort((a, b) => b.profit_percentage - a.profit_percentage)[0];
}

export function findAllArbitrageOpportunities(events: OddsEvent[]): ArbitrageOpportunity[] {
  const opportunities: ArbitrageOpportunity[] = [];

  for (const event of events) {
    const opportunity = calculateArbitrage(event);
    if (opportunity) {
      opportunities.push(opportunity);
    }
  }

  // Sort by profit percentage (highest first)
  return opportunities.sort((a, b) => b.profit_percentage - a.profit_percentage);
}
