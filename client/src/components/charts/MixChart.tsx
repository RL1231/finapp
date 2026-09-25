import { useLocation } from 'react-router';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

type MixChartData = {
  label: string;
  values: number[];
};

type MixChart = {
  dates: string[];
  data: MixChartData[];
};

interface MixChartProps {
  chartData: MixChart;
}

// 1. Register the structural elements required for both line and bar charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
);

export default function MixChart({ chartData }: MixChartProps) {
  const { pathname: currentPath } = useLocation();

  const labels = chartData.dates.map((d) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
  );
  const balanceData = chartData.data.find((d) => d.label === 'balance')?.values ?? [];
  const incomeData = chartData.data.find((d) => d.label === 'income')?.values ?? [];
  const expData = chartData.data.find((d) => d.label === 'expenditures')?.values ?? [];

  // 2. Define types for options and data
  const displayOn = currentPath === '/activities/monthly' ? true : false;
  const displayTitle = currentPath === '/activities/monthly' ? 'Monthly Summary' : 'Monthly';

  const options: ChartOptions<'bar' | 'line'> = {
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
      },
    },
  };

  // 3. Configure the datasets (Setting 'type' overrides the base chart type)
  const data: ChartData<'bar' | 'line'> = {
    labels,
    datasets: [
      {
        type: 'line' as const, // Forces this dataset to render as a line
        label: 'Balance (Line)',
        borderColor: 'rgb(195, 177, 225)',
        borderWidth: 2,
        fill: false,
        data: balanceData,
      },
      {
        type: 'bar' as const, // Forces this dataset to render as a bar
        label: 'Income (Bar)',
        backgroundColor: 'rgb(144, 253, 169)',
        data: incomeData,
      },
      {
        type: 'bar' as const,
        label: 'Expenditures (Bar)',
        backgroundColor: 'rgb(255, 99, 132)',
        data: expData,
      },
    ],
  };

  // Use the generic 'Chart' component and set the default type fallback to 'bar'
  return <Chart type="bar" data={data} options={options} />;
}
