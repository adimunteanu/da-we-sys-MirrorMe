import React from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { ChartProps, ChartType } from '../../types';

const DefaultChart = ({ data, chartType }: ChartProps) => {
  return (
    <div>
      {chartType === ChartType.BAR && <Bar type="bar" data={data} />}
      {chartType === ChartType.PIE && <Pie type="pie" data={data} />}
      {chartType === ChartType.LINE && <Line type="line" data={data} />}
      {chartType === ChartType.DONUT && (
        <Doughnut type="doughnut" data={data} />
      )}
    </div>
  );
};

export default DefaultChart;
