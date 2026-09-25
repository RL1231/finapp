import type { Report, FilteredReports } from '../types/types';

export function getAggregatedData(reports: Report[], currentDate: Date): FilteredReports {
  // Calculate boundaries
  const now = new Date(currentDate);
  // Current year start (January 1st)
  const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1, 0, 0, 0));
  // Current month start (1st day of this month)
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0));

  // Current week start
  //const currentDayOfWeek = now.getUTCDay();
  //const distanceToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

  const startOfWeek = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 6, 0, 0, 0, 0),
  );

  let dailyData: Report | undefined;
  let weeklyData: Report[] = [];
  let monthlyData: Report[] = [];
  let yearlyData: Report[] = [];

  if (reports) {
    dailyData = reports.find((r) => {
      const reportDateTime = new Date(r.dateTime);
      return reportDateTime.toDateString() === now.toDateString();
    });
    weeklyData = reports.filter((r) => {
      const reportDateTime = new Date(r.dateTime);

      return reportDateTime >= startOfWeek && reportDateTime <= now;
    });
    monthlyData = reports.filter((r) => {
      const reportDateTime = new Date(r.dateTime);

      return reportDateTime >= startOfMonth && reportDateTime <= now;
    });
    yearlyData = reports.filter((r) => {
      const reportDateTime = new Date(r.dateTime);

      return reportDateTime >= startOfYear && reportDateTime <= now;
    });
  }

  weeklyData.shift();
  // Filter data
  return {
    daily: dailyData,
    weekly: dailyData && weeklyData ? [...weeklyData, dailyData] : [],
    monthly: dailyData && monthlyData ? [...monthlyData, dailyData] : [],
    ytd: dailyData && yearlyData ? [...yearlyData, dailyData] : [],
  };
}
