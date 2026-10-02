import { useAuth } from '../hooks/useAuth';
import BarChart from './charts/BarChart';
import Summary from './Summary';

export default function Week() {
  const { reports } = useAuth();

  const weekBalance = reports?.weekly
    ? reports.weekly.map((d) => ({
        label: 'balance',
        date: d.dateTime,
        value: d.dailyBalance,
      }))
    : [];

  const weekIncome = reports?.weekly
    ? reports.weekly.map((d) => ({
        label: 'income',
        date: d.dateTime,
        value: d.income,
      }))
    : [];

  const weekExp = reports?.weekly
    ? reports.weekly.map((d) => ({
        label: 'expenditures',
        date: d.dateTime,
        value: d.expenditure,
      }))
    : [];

  const weekData = [...weekBalance, ...weekIncome, ...weekExp];

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-x-4">
      <div className="mb-4 sm:mb-8 h-50 sm:h-100 lg:h-70">
        <BarChart chartData={weekData} />
      </div>
      <Summary weekData={weekData} />
    </div>
  );
}
