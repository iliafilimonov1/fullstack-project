import React from 'react';
import PieChart from '@/components/ui/Charts/PieChart';

const ChartPage: React.FC = () => (
  <div>
    <PieChart data={[
      { label: 'огурцы', size: 20 },
      { label: 'помидоры', size: 40 },
      { label: 'лук', size: 90 },
    ]}
    />
  </div>
);

export default React.memo(ChartPage);
