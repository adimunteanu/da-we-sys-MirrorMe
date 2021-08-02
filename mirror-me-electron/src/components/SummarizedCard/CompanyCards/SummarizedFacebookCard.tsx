import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { createChartDataset } from '../../ChartCard/chartUtils';
import { selectData } from '../../../pages/OverviewPage/dataSlice';
import { FacebookRelevantData } from '../../../types';
import { COMPANIES } from '../../../globals';
import { selectIsDarkmode } from '../../../store/globalSlice';

const SummarizedInstagramCard = () => {
  const data = useSelector(selectData).find(
    (object) => object.company === COMPANIES.FACEBOOK.name
  )!.data as FacebookRelevantData;
  const isDarkmode = useSelector(selectIsDarkmode);

  const getPieChartData = () => {
    const { posts, messages, comments, reactions } = data.contributions;
    return createChartDataset(
      ['Posts', 'Messages', 'Comments', 'Reactions'],
      'Contributions',
      [posts.length, messages.length, comments.length, reactions.length],
      isDarkmode
    );
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <Pie
            className="PieChart"
            type="pie"
            data={getPieChartData}
            options={{
              maintainAspectRatio: true,
              title: {
                display: true,
                text: 'Overall Contributions',
                fontSize: 20,
              },
            }}
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default SummarizedInstagramCard;
