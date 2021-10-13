import React from 'react';
import { teal } from '@mui/material/colors';
import PieChart from '@mui/charts/PieChart';

const data = [
  {
    value: 2,
    fill: teal[100],
  },
  {
    value: 1,
    fill: 'transparent',
  },
];

export default function PartialDonutChart() {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <PieChart
        data={data}
        innerRadius={110}
        startAngle={-90}
        endAngle={90}
        fill="rgba(128, 128, 128, 0.2)"
      />
    </div>
  );
}
