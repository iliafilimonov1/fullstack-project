import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export type ChartItem = { label: string; size: number };

interface Props {
  data:ChartItem[];
  maxSize?: number;
}

const PieChart: React.FC<Props> = ({ data, maxSize }) => {
  const preparedData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map((_, i) => i + 1),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: data
          .map((i) => maxSize || Math.max(...data.map((i) => i.size)) - i.size),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (<Bar data={preparedData} />);
};

export default React.memo(PieChart);
