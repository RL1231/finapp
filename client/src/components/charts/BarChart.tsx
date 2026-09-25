import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js';

interface BarChart {
  label: string;
  date: string;
  value: number;
}

interface BarChartProp {
  chartData: BarChart[];
}

// 1. Register the required chart modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ chartData }: BarChartProp) {
  const { pathname: currentPath } = useLocation();
  const [viewport, setViewport] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));

  useEffect(() => {
    const updateViewport = () => setViewport({ w: window.innerWidth, h: window.innerHeight });

    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, [viewport]);

  const displayOn = currentPath === '/activities/weekly' ? true : false;
  const displayTitle = currentPath === '/activities/weekly' ? 'Weekly Summary' : 'Weekly';

  // 2. Define types for options and data
  const options: ChartOptions<'bar'> = {
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

  // 3. Define types for data
  const data: ChartData<'bar'> = {
    labels: [
      ...new Set(
        chartData.map((d) =>
          new Date(d.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC',
          }),
        ),
      ),
    ],
    datasets: [
      {
        label: 'Balance',
        data: [...chartData.filter((d) => d.label === 'balance').map((d) => d.value)],
        backgroundColor: 'rgba(195, 177, 225, 0.6)',
        borderColor: 'rgba(195, 177, 225, 1)',
        borderWidth: 1,
      },
      {
        label: 'Income',
        data: [...chartData.filter((d) => d.label === 'income').map((d) => d.value)],
        backgroundColor: 'rgba(144, 253, 169, 0.6)',
        borderColor: 'rgba(144, 253, 169, 1.0)',
        borderWidth: 1,
      },
      {
        label: 'Expenditures',
        data: [...chartData.filter((d) => d.label === 'expenditures').map((d) => d.value)],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
