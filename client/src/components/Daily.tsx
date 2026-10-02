import { useAuth } from '../hooks/useAuth';
import PieChart from './charts/PieChart';
import Summary from './Summary';

export default function Daily() {
  const { reports } = useAuth();

  const dailyData = reports?.daily
    ? [
        { label: 'balance', value: reports.daily.dailyBalance },
        { label: 'income', value: reports.daily.income },
        { label: 'expenditure', value: reports.daily.expenditure },
      ]
    : [];

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-x-4">
      <div className="mb-4 sm:mb-8 h-50 sm:h-100 lg:h-70">
        <PieChart chartData={dailyData} />
      </div>
      <Summary dailyData={dailyData} />
    </div>
  );
}
