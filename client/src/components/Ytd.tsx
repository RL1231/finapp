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
      <div className="h-50">
        <LineChart chartData={chartData} />
      </div>
      <QuickActions />
      <Summary yearData={chartData} />
    </>
  );
}
