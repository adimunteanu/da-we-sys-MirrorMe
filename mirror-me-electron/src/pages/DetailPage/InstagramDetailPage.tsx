import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  createChartDataset,
  getFieldsPerMonth,
} from '../../components/ChartCard/chartUtils';
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
        '# of messages',
        '# of posts',
        '# of likes',
        '# of stories',
        '# of comments',
      ]
    );
  };

  const getRelationships = () => {
    const { followers, followings } = data.relationships;
    const mutuals: string[] = [];
    followers.forEach((follower) => {
      if (followings.includes(follower)) {
        mutuals.push(follower);
      }
    });

    return createChartDataset(
      ['Followers', 'Followings', 'Mutuals'],
      'Relationships',
      [followers.length, followings.length, mutuals.length]
    );
  };

  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <ChartCard
              title="Relationships"
              chartType={ChartType.BAR}
              data={getRelationships}
            />
          </IonCol>
        </IonRow>
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
