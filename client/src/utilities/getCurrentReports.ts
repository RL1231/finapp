import type { Report, User } from '../types/types';

export function getCurrentReports(userData: User | undefined, currentDate: Date): Report[] {
  const currentReportIndex = userData?.account.reports.findIndex((report) => {
    const reportDateStr = new Date(report.dateTime).toISOString().split('T')[0];
    const currentDateStr = new Date(currentDate).toISOString().split('T')[0];

    return reportDateStr == currentDateStr;
  });

  const currentReports: Report[] = [];

  if (currentReportIndex && currentReportIndex !== -1) {
    userData?.account.reports.forEach((report, i) =>
      i <= currentReportIndex ? currentReports.push(report as Report) : null,
    );
  }

  return currentReports;
}
