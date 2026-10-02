import { useAuth } from '../hooks/useAuth';
import { getLastDayOfEachMonth } from '../utilities/getLastDayOfEachMonth';
import LineChart from './charts/LineChart';
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
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-x-4">
      <div className="mb-4 sm:mb-8 h-50 sm:h-100 lg:h-70">
        <LineChart chartData={chartData} />
      </div>
      <Summary yearData={chartData} />
    </div>
  );
}
