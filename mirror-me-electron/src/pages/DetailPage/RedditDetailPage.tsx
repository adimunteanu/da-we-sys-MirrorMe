import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import ChartCard from '../../components/ChartCard/ChartCard';
import { CHART_COLORS } from '../../globals';
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

    return {
      labels: ['Upvotes', 'Downvotes'],
      datasets: [
        {
          label: '# of votes',
          data: newData,
          backgroundColor: CHART_COLORS,
          hoverOffset: 4,
        },
      ],
    };
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

    return {
      labels: Array.from(subredditMap.keys()),
      datasets: [
        {
          label: 'Subreddits',
          data: Array.from(subredditMap.values()),
          backgroundColor: CHART_COLORS,
          hoverOffset: 4,
        },
      ],
    };
  };

  const getCommentsPerMonth = () => {
    const { comments } = data.contributions;
    const sortedComments = [...comments];

    sortedComments.sort(
      (comment1, comment2) =>
        new Date(comment1.date).getTime() - new Date(comment2.date).getTime()
    );

    const monthsMap = new Map();

    sortedComments.forEach((comment) => {
      const time = `${new Date(comment.date).getMonth().toString()}-${new Date(
        comment.date
      )
        .getFullYear()
        .toString()}`;

      if (!time.toLowerCase().includes('nan')) {
        const hasTime = monthsMap.has(time);

        monthsMap.set(time, !hasTime ? 1 : monthsMap.get(time) + 1);
      }
    });

    return {
      labels: Array.from(monthsMap.keys()),
      datasets: [
        {
          label: '# of comments',
          data: Array.from(monthsMap.values()),
          backgroundColor: CHART_COLORS,
          hoverOffset: 4,
        },
      ],
    };
  };

  const getMessagesPerMonth = () => {
    const { messages } = data.contributions;
    const sortedMessages = [...messages];

    sortedMessages.sort(
      (message1, message2) =>
        new Date(message1.date).getTime() - new Date(message2.date).getTime()
    );

    const monthsMap = new Map();

    sortedMessages.forEach((message) => {
      const time = `${new Date(message.date).getMonth().toString()}-${new Date(
        message.date
      )
        .getFullYear()
        .toString()}`;

      if (!time.toLowerCase().includes('nan')) {
        const hasTime = monthsMap.has(time);

        monthsMap.set(time, !hasTime ? 1 : monthsMap.get(time) + 1);
      }
    });

    return {
      labels: Array.from(monthsMap.keys()),
      datasets: [
        {
          label: '# of messages',
          data: Array.from(monthsMap.values()),
          backgroundColor: CHART_COLORS,
          hoverOffset: 4,
        },
      ],
    };
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

    return {
      labels: Array.from(citiesMap.keys()),
      datasets: [
        {
          label: 'Cities',
          data: Array.from(citiesMap.values()),
          backgroundColor: CHART_COLORS,
          hoverOffset: 4,
        },
      ],
    };
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
      </IonGrid>
    </IonContent>
  );
};

export default RedditDetailPage;