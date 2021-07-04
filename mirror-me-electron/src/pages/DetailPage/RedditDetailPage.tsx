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
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import {
  createChartDataset,
  createChartDatasetFromMap,
  getFieldPerHour,
  getFieldPerMonth,
} from '../../components/ChartCard/chartUtils';
import ChartCard from '../../components/ChartCard/ChartCard';
import { ChartType, RedditRelevantData, Location } from '../../types';
import { selectData } from '../OverviewPage/dataSlice';
import DefaultChart from '../../components/ChartCard/DefaultChart';
import SegmentChart from '../../components/ChartCard/SegmentChart';
import { COMPANIES } from '../../globals';

const geoip = require('offline-geo-from-ip');

const RedditDetailPage = () => {
  const data = useSelector(selectData).find(
    (object) => object.company === COMPANIES.REDDIT.name
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

  const getMostUsedInCommentWordCloud = (wordCount: number): Array<Word> => {
    const { comments } = data.contributions;

    const mostUsedWordsMap = new Map();

    comments.forEach((comment) => {
      if (comment.body) {
        comment.body.split(' ').forEach((word) => {
          const hasWord = mostUsedWordsMap.has(word);

          mostUsedWordsMap.set(
            word,
            !hasWord ? 1 : mostUsedWordsMap.get(word) + 1
          );
        });
      }
    });

    const topWords = Array.from(mostUsedWordsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, wordCount);

    const words: Array<Word> = topWords.map((word) => {
      return { text: word[0], value: word[1] };
    });

    return words;
  };

  const getMostUsedInMessageWordCloud = (wordCount: number): Array<Word> => {
    const { messages } = data.contributions;

    const mostUsedWordsMap = new Map();

    messages.forEach((message) => {
      if (message.body) {
        message.body.split(' ').forEach((word) => {
          const hasWord = mostUsedWordsMap.has(word);

          mostUsedWordsMap.set(
            word,
            !hasWord ? 1 : mostUsedWordsMap.get(word) + 1
          );
        });
      }
    });

    const topWords = Array.from(mostUsedWordsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, wordCount);

    const words: Array<Word> = topWords.map((word) => {
      return { text: word[0], value: word[1] };
    });

    return words;
  };

  const getLocationsSet = () => {
    const { ipLogs } = data;

    const locationsSet = new Set<Location>();

    ipLogs.forEach((log) => {
      if (log.ip) {
        const { longitude, latitude } = geoip.allData(log.ip).location;

        locationsSet.add({ longitude, latitude });
      }
    });

    return locationsSet;
  };

  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <ChartCard
              title="Access Locations"
              chart={
                <DefaultChart
                  data={getLocationCounts}
                  chartType={ChartType.PIE}
                />
              }
              fullscreenChart={
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Map of posts</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <MapContainer
                      style={{ height: '500px' }}
                      center={[51.505, -0.09]}
                      zoom={4}
                      scrollWheelZoom={false}
                      dragging
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      {Array.from(getLocationsSet().values()).map(
                        (location: Location) => {
                          return (
                            <Marker
                              key={`${location.latitude},${location.longitude}`}
                              position={[location.latitude, location.longitude]}
                            />
                          );
                        }
                      )}
                    </MapContainer>
                  </IonCardContent>
                </IonCard>
              }
            />
          </IonCol>
          <IonCol size="4">
            <ChartCard
              title="Votes Positivity"
              chart={
                <DefaultChart data={getUpDownVotes} chartType={ChartType.BAR} />
              }
            />
          </IonCol>
          <IonCol size="4">
            <ChartCard
              title="Votes Distribution"
              chart={
                <DefaultChart
                  data={getVotesDistribution}
                  chartType={ChartType.DONUT}
                />
              }
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <ChartCard
              title="Comments per month"
              chart={
                <DefaultChart
                  data={getCommentsPerMonth}
                  chartType={ChartType.LINE}
                />
              }
            />
          </IonCol>
          <IonCol size="6">
            <ChartCard
              title="Messages per month"
              chart={
                <DefaultChart
                  data={getMessagesPerMonth}
                  chartType={ChartType.LINE}
                />
              }
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <ChartCard
              title="Comments distribution per day"
              chart={
                <SegmentChart
                  chartType={ChartType.BAR}
                  data={getCommentsActivity()[0]}
                  chartTypeOverview={ChartType.DONUT}
                  dataOverview={getCommentsActivity()[1]}
                />
              }
            />
          </IonCol>
          <IonCol size="6">
            <ChartCard
              title="Messages distribution per day"
              chart={
                <SegmentChart
                  chartType={ChartType.BAR}
                  data={getMessagesActivity()[0]}
                  chartTypeOverview={ChartType.DONUT}
                  dataOverview={getMessagesActivity()[1]}
                />
              }
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Top 20 words used in comments</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <ReactWordcloud
                  words={getMostUsedInCommentWordCloud(20)}
                  options={{ enableTooltip: false, enableOptimizations: true }}
                />
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Top 20 words used in messages</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <ReactWordcloud
                  words={getMostUsedInMessageWordCloud(20)}
                  options={{ enableTooltip: false, enableOptimizations: true }}
                />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default RedditDetailPage;
