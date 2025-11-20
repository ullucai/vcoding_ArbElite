import { Outcome } from '../types/arbitrage';

export interface StakeCalculation {
  outcome: Outcome;
  stake: number;
  potentialReturn: number;
}

export interface CalculationResult {
  stakes: StakeCalculation[];
  totalStake: number;
  guaranteedProfit: number;
  profitPercentage: number;
}

export function calculateArbitrageStakes(
  outcomes: Outcome[],
  totalStake: number,
  roundStakes: boolean = false
): CalculationResult {
  const inverseSum = outcomes.reduce((sum, outcome) => sum + (1 / outcome.odds), 0);

  const stakes: StakeCalculation[] = outcomes.map(outcome => {
    let stake = (totalStake * (1 / outcome.odds)) / inverseSum;

    if (roundStakes) {
      if (stake >= 100) {
        stake = Math.round(stake / 5) * 5;
      } else if (stake >= 10) {
        stake = Math.round(stake);
      } else {
        stake = Math.round(stake * 10) / 10;
      }
    }

    const potentialReturn = stake * outcome.odds;

    return {
      outcome,
      stake,
      potentialReturn
    };
  });

  const actualTotalStake = stakes.reduce((sum, s) => sum + s.stake, 0);
  const guaranteedProfit = stakes[0].potentialReturn - actualTotalStake;
  const profitPercentage = (guaranteedProfit / actualTotalStake) * 100;

  return {
    stakes,
    totalStake: actualTotalStake,
    guaranteedProfit,
    profitPercentage
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatTime(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours < 1) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h ${minutes}m`;
  } else {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }
}
