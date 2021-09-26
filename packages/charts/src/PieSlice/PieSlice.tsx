import React from 'react';
import * as d3 from 'd3';

interface SliceData {
  data: { value: number; label?: string; fill: string; stroke?: string };
  endAngle: number;
  index: number;
  padAngle: number;
  startAngle: number;
  value: number;
}

export interface PieSliceProps {
  /**
   * The data to use for the slice.
   */
  data: SliceData;
  /**
   * If true, the slice will expand when hovered
   * @default false
   */
  expandOnHover: boolean;
  /**
   * The radius at which to start the inside of the slice.
   */
  innerRadius?: number;
  /**
   * The radius of the pie chart.
   */
  radius?: number;
}

function PieSlice(props: PieSliceProps) {
  const { data, innerRadius = 0, radius = 100 } = props;
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius);

  return <path style={{ fill: data.data.fill, stroke: data.data.stroke }} d={arc(data)} />;
}

export default PieSlice;
