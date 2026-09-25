import { useLocation } from 'react-router';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js';

interface LineChartData {
  date: string;
  balance: number;
  income: number;
  expenditures: number;
}
interface LineChartProps {
  chartData: LineChartData[];
}

// 1. Register the structural components needed for a Line chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({ chartData }: LineChartProps) {
  const { pathname: currentPath } = useLocation();

  const displayOn = currentPath === '/activities/ytd' ? true : false;
  const displayTitle = currentPath === '/activities/ytd' ? 'YTD Summary' : 'YTD';

  // 2. Define the configuration options with strong typing
  const options: ChartOptions<'line'> = {
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
    },
    scales: {
      x: {
        display: displayOn,
      },
      y: {
        display: displayOn,
        beginAtZero: true,
      },
    },
  };

  // 3. Define your data structure with strong typing
  const data: ChartData<'line'> = {
    labels: [...chartData.map((d) => d.date)],
    datasets: [
      {
        label: 'Balance',
        data: [...chartData.map((d) => d.balance)],
        borderColor: 'rgb(195, 177, 225)',
        backgroundColor: 'rgba(195, 177, 225, 0.5)',
        tension: 0.3, // Smoothes out the line edges
      },
      {
        label: 'Income',
        data: [...chartData.map((d) => d.income)],
        borderColor: 'rgb(144, 253, 169)',
        backgroundColor: 'rgba(144, 253, 169, 0.5)',
        borderDash: [5, 5], // Renders a dashed line
      },
      {
        label: 'Expenditures',
        data: [...chartData.map((d) => d.expenditures)],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderDash: [5, 5], // Renders a dashed line
      },
    ],
  };

  return <Line options={options} data={data} />;
}
