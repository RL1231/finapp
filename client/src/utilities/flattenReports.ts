import type { Report } from '../types/types';

export function flattenReports(reports: Report[]) {
  const data = [];
  for (const report of reports) {
    if (report.dailyBalance) {
      data.push({ group: 'balance', value: report.dailyBalance });
    }
    if (report.income >= 0) {
      data.push({ group: 'income', value: report.income });
    }
    if (report.expenditure) {
      data.push({ group: 'expenditure', value: report.expenditure });
    }
  }
  return data;
}
