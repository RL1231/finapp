import type { Report } from '../types/types';

export function getLastDayOfEachMonth(reports: Report[]): Report[] {
  const lastDaysMap = reports.reduce<Record<string, Report>>((acc, report) => {
    // Safely extract "YYYY-MM" without timezone shifting
    const yearMonth = report.dateTime.slice(0, 7);

    // Because it is sorted, a simple string comparison (>) works perfectly
    if (!acc[yearMonth] || report.dateTime > acc[yearMonth].dateTime) {
      acc[yearMonth] = report;
    }

    return acc;
  }, {});

  return Object.values(lastDaysMap);
}
