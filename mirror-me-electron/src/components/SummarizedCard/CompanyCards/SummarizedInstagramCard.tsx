import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { createChartDataset } from '../../ChartCard/chartUtils';
import { selectData } from '../../../pages/OverviewPage/dataSlice';
import { InstagramRelevantData } from '../../../types';
import { COMPANIES } from '../../../globals';

const SummarizedInstagramCard = () => {
  const data = useSelector(selectData).find(
    (object) => object.company === COMPANIES.INSTAGRAM.name
  )!.data as InstagramRelevantData;

  const getPieChartData = () => {
    const { posts, messages, stories, comments, likes } = data.contributions;
    return createChartDataset(
      ['Posts', 'Messages', 'Stories', 'Comments', 'Likes'],
      'Contributions',
      [
        posts.length,
        messages.length,
        stories.length,
        comments.length,
        likes.length,
      ]
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
