import React from 'react';
import * as d3 from 'd3';
import PieChart from '@mui/charts/PieChart';

function generateData() {
  const numSegments = d3.randomUniform(3, 7)();
  return d3.range(numSegments).map((i) => ({
    value: Math.abs(d3.randomNormal()()),
    fill: d3.schemePaired[i],
    label: i,
  }));
}

export default function ExpaindingPieChart() {
  const data = generateData();

  return (
    <div style={{ width: '100%', height: 300 }}>
      <PieChart data={data} margin={{ top: 20, bottom: 20 }} expandOnHover />
    </div>
  );
}
