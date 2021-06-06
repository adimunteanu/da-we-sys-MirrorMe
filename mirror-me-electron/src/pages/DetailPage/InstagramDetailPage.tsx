import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { getFieldsPerMonth } from '../../components/ChartCard/chartUtils';
import ChartCard from '../../components/ChartCard/ChartCard';
import { ChartType, InstagramRelevantData } from '../../types';
import { selectData } from '../OverviewPage/dataSlice';

const InstagramDetailPage = () => {
  const data = useSelector(selectData).find(
    (object) => object.company === 'Instagram'
  )!.data as InstagramRelevantData;

  const getContributionsPerMonth = () => {
    const { messages, posts, likes, stories, comments } = data.contributions;
    return getFieldsPerMonth(
      [
        messages.map((message) => message.date),
        posts,
        likes,
        stories,
        comments,
      ],
      [
        '# of likes',
        '# of messages',
        '# of posts',
        '# of stories',
        '# of comments',
      ]
    );
  };

  // const getMessagesPerMonth = () => {
  //   const { messages } = data.contributions;

  //   return getFieldPerMonth(messages, '# of messages');
  // };

  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <ChartCard
              title="Contributions"
              chartType={ChartType.LINE}
              data={getContributionsPerMonth}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default InstagramDetailPage;
