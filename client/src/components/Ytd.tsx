import { useAuth } from '../hooks/useAuth';
import { getLastDayOfEachMonth } from '../utilities/getLastDayOfEachMonth';
import LineChart from './charts/LineChart';
import QuickActions from './QuickActions';
import Summary from './Summary';

export default function Ytd() {
  const { reports } = useAuth();

  const yearData = reports?.ytd ? getLastDayOfEachMonth(reports.ytd) : [];
  const chartData = yearData.map((d) => ({
    date: new Date(d.dateTime).toLocaleString('en-US', { month: 'short' }),
    balance: d.dailyBalance,
    income: d.accMonthIncome,
    expenditures: d.accMonthExp,
  }));

  return (
    <>
      <div className="min-h-50 sm:min-h-75 md:min-h-100 lg:min-h-70">
        <LineChart chartData={chartData} />
      </div>
      <QuickActions />
      <Summary yearData={chartData} />
    </>
  );
}
