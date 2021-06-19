import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  createChartDataset,
  createChartDatasetFromMap,
  getFieldPerHour,
  getFieldPerMonth,
} from '../../components/ChartCard/chartUtils';
import ChartCard from '../../components/ChartCard/ChartCard';
import { ChartType, RedditRelevantData } from '../../types';
import { selectData } from '../OverviewPage/dataSlice';

const geoip = require('offline-geo-from-ip');

const RedditDetailPage = () => {
  const data = useSelector(selectData).find(
    (object) => object.company === 'Reddit'
  )!.data as RedditRelevantData;

  const getUpDownVotes = () => {
    const { votes } = data.contributions;
    const newData = [0, 0];

    votes.forEach((vote) => {
      if (vote.direction) {
        newData[0] += 1;
      } else {
        newData[1] += 1;
      }
    });

    return createChartDataset(['Upvotes', 'Downvotes'], '# of votes', newData);
  };

  const getVotesDistribution = () => {
    const { votes } = data.contributions;
    const subredditMap = new Map();

    votes.forEach((vote) => {
      const hasSub = subredditMap.has(vote.subreddit);

      subredditMap.set(
        vote.subreddit,
        !hasSub ? 1 : subredditMap.get(vote.subreddit) + 1
      );
    });

    return createChartDatasetFromMap('Subreddits', subredditMap);
  };

  const getCommentsPerMonth = () => {
    const { comments } = data.contributions;

    return getFieldPerMonth(comments, '# of comments');
  };

  const getMessagesPerMonth = () => {
    const { messages } = data.contributions;

    return getFieldPerMonth(messages, '# of messages');
  };

  const getLocationCounts = () => {
    const { ipLogs } = data;

    const citiesMap = new Map();

    ipLogs.forEach((log) => {
      if (log.ip) {
        const { city } = geoip.allData(log.ip);
        if (city) {
          const hasCity = citiesMap.has(city);

          citiesMap.set(city, !hasCity ? 1 : citiesMap.get(city) + 1);
        }
      }
    });

    return createChartDatasetFromMap('Cities', citiesMap);
  };

  const getCommentsActivity = () => {
    const { comments } = data.contributions;

    return getFieldPerHour(comments, 'Comment activity');
  };

  const getMessagesActivity = () => {
    const { messages } = data.contributions;

    return getFieldPerHour(messages, 'Messages activity');
  };

  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <ChartCard
              title="Access Locations"
              chartType={ChartType.PIE}
              data={getLocationCounts}
            />
          </IonCol>
          <IonCol size="4">
            <ChartCard
              title="Votes Positivity"
              chartType={ChartType.BAR}
              data={getUpDownVotes}
            />
          </IonCol>
          <IonCol size="4">
            <ChartCard
              title="Votes Distribution"
              chartType={ChartType.DONUT}
              data={getVotesDistribution}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <ChartCard
              title="Comments per month"
              chartType={ChartType.LINE}
              data={getCommentsPerMonth}
            />
          </IonCol>
          <IonCol size="6">
            <ChartCard
              title="Messages per month"
              chartType={ChartType.LINE}
              data={getMessagesPerMonth}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <ChartCard
              title="Comments distribution per day"
              chartType={ChartType.BAR}
              data={getCommentsActivity}
            />
          </IonCol>
          <IonCol size="6">
            <ChartCard
              title="Messages distribution per day"
              chartType={ChartType.BAR}
              data={getMessagesActivity}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default RedditDetailPage;
