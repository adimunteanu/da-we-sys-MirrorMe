import { IonSegment, IonSegmentButton } from '@ionic/react';
import React, { useState } from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { ChartProps, ChartType } from '../../types';

export interface SegmentedChartProps {
  dataOverview: unknown;
  chartTypeOverview: ChartType;
}

type Props = ChartProps & SegmentedChartProps;

const SegmentChart = ({
  data,
  chartType,
  dataOverview,
  chartTypeOverview,
}: Props) => {
  const [isOverview, setIsOverview] = useState(true);

  const createChart = (data: unknown, type: ChartType) => {
    switch (type) {
      case ChartType.BAR: {
        return <Bar type="bar" data={data} />;
      }
      case ChartType.PIE: {
        return <Pie type="pie" data={data} />;
      }
      case ChartType.LINE: {
        return <Line type="line" data={data} />;
      }
      case ChartType.DONUT: {
        return <Doughnut type="doughnut" data={data} />;
      }
      default: {
        return <Bar type="bar" data={data} />;
      }
    }
  };

  return (
    <div>
      <IonSegment
        value={isOverview ? 'overview' : 'detail'}
        mode="ios"
        onIonChange={(event) =>
          setIsOverview(event.detail.value === 'overview')
        }
      >
        <IonSegmentButton value="overview">Overview</IonSegmentButton>
        <IonSegmentButton value="detail">Detail</IonSegmentButton>
      </IonSegment>
      {isOverview
        ? createChart(dataOverview, chartTypeOverview)
        : createChart(data, chartType)}
    </div>
  );
};

export default SegmentChart;
