import React from 'react';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: { label: string; count: number }[];
}

const PieChart: React.FC<Props> = ({ data }) => {
  const localData = {
    labels: data.map((i) => i.label),
    datasets: [
      {
        label: '# of Votes',
        data: data.map((i) => i.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={localData} />;
};

export default PieChart;
