import type { Report } from '../types/types';

export function reportsAverage(reports: Report[]) {
  let totalBalance = 0;
  let totalIncome = 0;
  let totalExpenditures = 0;
  let count = 0;

  for (const report of reports) {
    totalBalance += report.dailyBalance;
    totalIncome += report.income;
    totalExpenditures += report.expenditure;

    count += 1;
  }

  const balanceAvg = totalBalance / count;
  const incomeAvg = totalIncome / count;
  const expenditureAvg = totalExpenditures / count;

  return {
    balanceAvg: balanceAvg.toFixed(2),
    incomeAvg: incomeAvg.toFixed(2),
    expenditureAvg: expenditureAvg.toFixed(2),
  };
}
