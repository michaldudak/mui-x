import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { useForkRef } from '@mui/material/utils';
import useChartDimensions from '../hooks/useChartDimensions';
import PieSegment from '../PieSegment';

interface ChartData {
  value: number;
  label: string;
  fill: string;
}

interface Margin {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
}

export interface PieChartProps {
  /**
   * The data to use for the chart.
   */
  data: ChartData[];
  /**
   * If true, the segment will expand when hovered
   * @default false
   */
  expandOnHover?: boolean;
  /**
   * The radius at which to start the inside of the segment.
   */
  innerRadius?: number;
  /**
   * The margin to use around the chart.
   */
  margin?: Margin;
  /**
   * The radius of the pie chart.
   */
  radius?: number;
  /**
   * The color of the segment labels.
   * @default 'currentColor'
   */
  segmentLabelColor?: string;
  /**
   * The font size of the segment labels.
   * @default '12px'
   */
  segmentLabelFontSize?: string;
  /**
   * The radius at which to place the segment label.
   */
  segmentLabelRadius?: number;
  /**
   * The angle in degrees from which to start rendering the first segment.
   */
  startAngle?: number;
}

const PieChart = React.forwardRef<SVGSVGElement, PieChartProps>(function PieChart(props, ref) {
  const {
    data,
    expandOnHover = false,
    innerRadius = 0,
    margin: marginProp,
    radius: radiusProp,
    segmentLabelColor = 'currentColor',
    segmentLabelFontSize = '12px',
    segmentLabelRadius,
    startAngle = 0,
    ...other
  } = props;

  const margin = { top: 10, bottom: 10, left: 10, right: 10, ...marginProp };
  const chartSettings = {
    marginTop: margin.top,
    marginBottom: margin.bottom,
    marginLeft: margin.left,
    marginRight: margin.right,
  };

  const [chartRef, dimensions] = useChartDimensions(chartSettings);
  const { boundedHeight, boundedWidth, width, height } = dimensions;
  const handleRef = useForkRef(chartRef, ref);
  const [percentVisible, setPercentVisible] = useState(0);

  const pie = d3
    .pie()
    .startAngle((startAngle * Math.PI) / 180) // Degrees to radians
    .endAngle(startAngle + ((((360 - startAngle) * Math.PI) / 180) * percentVisible) / 100)
    .value((d) => d.value);

  // From: https://codesandbox.io/s/drilldown-piechart-in-react-and-d3-d62y5
  useEffect(() => {
    d3.selection()
      .transition('pie-reveal')
      .duration(500)
      .ease(d3.easeSinInOut)
      .tween('percentVisible', () => {
        const percentInterpolate = d3.interpolate(0, 100);
        return (t) => setPercentVisible(percentInterpolate(t));
      });
  }, [data]);

  const radius = radiusProp || Math.min(boundedWidth, boundedHeight) / 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} ref={handleRef} {...other}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {pie(data).map((d, i) => (
          <PieSegment
            data={d}
            label={d.data.label}
            labelColor={segmentLabelColor}
            labelFontSize={segmentLabelFontSize}
            labelRadius={segmentLabelRadius}
            key={i}
            radius={radius}
            innerRadius={innerRadius}
            expandOnHover={expandOnHover}
          />
        ))}
      </g>
    </svg>
  );
});

export default PieChart;
