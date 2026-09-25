import { useLocation } from 'react-router';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js';

interface DailyData {
  label: string;
  value: number;
}

interface PieChartProp {
  chartData: DailyData[];
}

// 1. Register the essential elements for a doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ chartData }: PieChartProp) {
  const { pathname: currentPath } = useLocation();

  const displayOn = currentPath === '/activities/daily' ? true : false;
  const displayTitle = currentPath === '/activities/daily' ? 'Daily Summary' : 'Daily';

  // 2. Define the configuration options with proper typescript typing
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: displayOn,
        position: 'top' as const,
      },

      title: {
        display: true,
        text: displayTitle,
      },

      tooltip: {
        enabled: true,
      },
    },
    cutout: '50%',
  };

  // 3. Define our typescript structure for our doughnut chart
  const data: ChartData<'doughnut'> = {
    labels: [...chartData.map((d) => d.label)],
    datasets: [
      {
        label: 'Daily Summary',
        data: [...chartData.map((d) => d.value)],
        backgroundColor: [
          'rgba(195, 177, 225, 0.5)',
          'rgba(144, 253, 169, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: ['rgba(195, 177, 225, 1)', 'rgba(144, 253, 169, 1', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut options={options} data={data} />;
}
