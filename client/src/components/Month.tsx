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
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-x-4">
      <div className="mb-4 sm:mb-8 h-50 sm:h-100 lg:h-70">
        <MixChart chartData={chartData} />
      </div>
      <Summary monthData={monthData} />
    </div>
  );
}
