import { useAuth } from '../hooks/useAuth';
import BarChart from './charts/BarChart';
import QuickActions from './QuickActions';
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
    <>
      <div className="h-50">
        <BarChart chartData={weekData} />
      </div>
      <QuickActions />
      <Summary weekData={weekData} />
    </>
  );
}
