import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import React from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { ChartType } from '../../types';

interface Props {
  data: unknown;
  title: string;
  chartType: ChartType;
}

const ChartCard = ({ data, title, chartType }: Props) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {chartType === ChartType.BAR && <Bar type="bar" data={data} />}
        {chartType === ChartType.PIE && <Pie type="pie" data={data} />}
        {chartType === ChartType.LINE && <Line type="line" data={data} />}
        {chartType === ChartType.DONUT && (
          <Doughnut type="doughnut" data={data} />
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default ChartCard;
