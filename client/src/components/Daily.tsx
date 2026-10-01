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
    <div>
      <div className="min-h-50 sm:min-h-75 md:min-h-100 lg:min-h-70">
        <PieChart chartData={dailyData} />
      </div>
      <Summary dailyData={dailyData} />
    </div>
  );
}
