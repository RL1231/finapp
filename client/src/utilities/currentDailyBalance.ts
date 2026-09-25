import type { User, CurrentBalanceType, FilteredReports } from '../types/types';

export function currentDailyBalance(
  userData: User,
  reports: FilteredReports | undefined,
): CurrentBalanceType {
  const currentReport = reports?.daily;
  const currentReportDate = currentReport ? new Date(currentReport.dateTime) : null;

  const previousReport = userData?.account.reports.find(
    (report) =>
      report.dateTime
        .split('-')
        .map((strNum) => Number(strNum).toString())
        .join('-')
        .toString() ===
      `${currentReportDate?.getFullYear()}-${currentReportDate ? currentReportDate?.getMonth() + 1 : null}-${currentReportDate ? currentReportDate.getDate() : null}`,
  );

  let currentBalance = 0;
  let previousBalance = 0;
  let dailyPercentage = 0;
  let percentage = '0.00';

  if (currentReport?.dailyBalance) currentBalance = currentReport?.dailyBalance;
  if (previousReport) previousBalance = previousReport.dailyBalance;
  if (currentBalance !== 0 && previousBalance !== 0) {
    dailyPercentage =
      currentBalance > previousBalance
        ? (currentBalance / previousBalance - 1) * 100
        : -(previousBalance / currentBalance - 1) * 100;
    percentage = Math.abs(dailyPercentage).toPrecision(2);
  }

  return { currentBalance, dailyPercentage, percentage };
}
