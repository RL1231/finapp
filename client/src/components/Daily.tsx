import { useAuth } from '../hooks/useAuth';
import PieChart from './charts/PieChart';
import QuickActions from './QuickActions';
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
    <>
      <div className="h-50">
        <PieChart chartData={dailyData} />
      </div>
      <QuickActions />
      <Summary dailyData={dailyData} />
    </>
  );
}
