import type { Report } from '../types/types';

export function getSundayOfEachWeek(reports: Report[]) {
  const sundayMap = reports.reduce<Record<string, Report>>((acc, report) => {
    // Safely extract "MM-DD" without timezone shifting
    const monthWeek = report.dateTime.slice(5, 11);

    // Because it is sorted, a simple string comparison (>) works perfectly
    if (new Date(report.dateTime).getDay() === 6 && !acc[monthWeek]) {
      acc[monthWeek] = report;
    }
    return acc;
  }, {});

  return Object.values(sundayMap);
}
