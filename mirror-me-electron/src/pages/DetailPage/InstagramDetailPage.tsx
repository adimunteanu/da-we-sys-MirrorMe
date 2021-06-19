import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
} from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import ReactWordcloud, { Word } from 'react-wordcloud';
import {
  createChartDataset,
  createChartDatasetFromMap,
  getFieldPerHour,
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
      [messages, posts, likes, stories, comments],
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

  const getAddWordCloud = (): Array<Word> => {
    const { ads } = data.interests;
    const words: Array<Word> = [];
    const shuffledAds = [...ads].sort(() => 0.5 - Math.random());
    shuffledAds.forEach((ad) => {
      words.push({
        text: ad,
        value: 10,
      });
    });
    return words.slice(0, 30);
  };

  const getTopicWordCloud = (): Array<Word> => {
    const { topics } = data.interests;
    const words: Array<Word> = [];
    const shuffledTopics = [...topics].sort(() => 0.5 - Math.random());
    shuffledTopics.forEach((topic) => {
      words.push({
        text: topic,
        value: 15,
      });
    });
    return words.slice(0, 30);
  };

  const getMessageDistribution = () => {
    const { messages } = data.contributions;
    const participantMap = new Map();

    messages.forEach((message) => {
      const hasSub = participantMap.has(message.participant);

      participantMap.set(
        message.participant,
        !hasSub ? 1 : participantMap.get(message.participant) + 1
      );
    });

    return createChartDatasetFromMap('Participants', participantMap);
  };

  const getLikesActivity = () => {
    const { likes } = data.contributions;

    return getFieldPerHour(likes, 'Likes activity');
  };

  const getMessagesActivity = () => {
    const { messages } = data.contributions;

    return getFieldPerHour(messages, 'Messages activity');
  };

  const getStoriesActivity = () => {
    const { stories } = data.contributions;

    return getFieldPerHour(stories, 'Stories activity');
  };

  const getCommentsActivity = () => {
    const { comments } = data.contributions;

    return getFieldPerHour(comments, 'Comments activity');
  };

  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Your ad interests</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <ReactWordcloud
                  words={getAddWordCloud()}
                  options={{ enableTooltip: false, enableOptimizations: true }}
                />
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Your topics</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <ReactWordcloud
                  words={getTopicWordCloud()}
                  options={{ enableTooltip: false, enableOptimizations: true }}
                />
              </IonCardContent>
            </IonCard>
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
        <IonRow>
          <IonCol size="6">
            <ChartCard
              title="Relationships"
              chartType={ChartType.BAR}
              data={getRelationships}
            />
          </IonCol>
          <IonCol size="6">
            <ChartCard
              title="Message distribution"
              chartType={ChartType.PIE}
              data={getMessageDistribution}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <ChartCard
              title="Likes per hour"
              chartType={ChartType.BAR}
              data={getLikesActivity}
            />
          </IonCol>
          <IonCol size="6">
            <ChartCard
              title="Messages per hour"
              chartType={ChartType.BAR}
              data={getMessagesActivity}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <ChartCard
              title="Stories per hour"
              chartType={ChartType.BAR}
              data={getStoriesActivity}
            />
          </IonCol>
          <IonCol size="6">
            <ChartCard
              title="Comments per hour"
              chartType={ChartType.BAR}
              data={getCommentsActivity}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default InstagramDetailPage;
