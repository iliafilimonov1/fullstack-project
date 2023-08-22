import React from 'react';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: { label: string; count: number }[];
  colors?: string[];
}

const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const PieChart: React.FC<Props> = ({ data, colors }) => {
  const localData = {
    labels: data.map((i) => i.label),
    datasets: [
      {
        data: data.map((i) => i.count),
        backgroundColor: colors ?? data.map(() => `#${randomColor()}`),
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={localData} />;
};

export default PieChart;
