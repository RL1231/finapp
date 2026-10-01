import { useAuth } from '../hooks/useAuth';
import MixChart from './charts/MixChart';
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
    <div>
      <div className="min-h-50 sm:min-h-75 md:min-h-100 lg:min-h-70">
        <MixChart chartData={chartData} />
      </div>
      <Summary monthData={monthData} />
    </div>
  );
}
