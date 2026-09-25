import { useAuth } from '../hooks/useAuth';
import MixChart from './charts/MixChart';
import QuickActions from './QuickActions';
import Summary from './Summary';

export default function Month() {
  const { reports } = useAuth();

  const dates = reports?.monthly ? reports.monthly.map((d) => d.dateTime) : [];
  const balanceValues = reports?.monthly ? reports.monthly.map((d) => d.dailyBalance) : [];
  const incomeValues = reports?.monthly ? reports.monthly.map((d) => d.income) : [];
  const expValues = reports?.monthly ? reports.monthly.map((d) => d.expenditure) : [];

  const chartData = {
    dates: dates,
    data: [
      { label: 'balance', values: balanceValues },
      { label: 'income', values: incomeValues },
      { label: 'expenditures', values: expValues },
    ],
  };

  const monthData = [
    { label: 'balance', values: balanceValues },
    { label: 'income', values: incomeValues },
    { label: 'expenditures', values: expValues },
  ];

  return (
    <>
      <div className="h-50">
        <MixChart chartData={chartData} />
      </div>
      <QuickActions />
      <Summary monthData={monthData} />
    </>
  );
}
