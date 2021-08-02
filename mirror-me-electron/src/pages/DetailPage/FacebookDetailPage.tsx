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
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {
  createChartDatasetFromMap,
  getFieldPerHour,
  getFieldsPerMonth,
} from '../../components/ChartCard/chartUtils';
import ChartCard from '../../components/ChartCard/ChartCard';
import { ChartType, FacebookRelevantData } from '../../types';
import { selectData } from '../OverviewPage/dataSlice';
import SegmentChart from '../../components/ChartCard/SegmentChart';
import DefaultChart from '../../components/ChartCard/DefaultChart';
import { COMPANIES, REACTION_COLORS, REACTION_EMOJIS } from '../../globals';
import { selectIsDarkmode } from '../../store/globalSlice';

const FacebookDetailPage = () => {
  const data = useSelector(selectData).find(
    (object) => object.company === COMPANIES.FACEBOOK.name
  )!.data as FacebookRelevantData;
  const isDarkmode = useSelector(selectIsDarkmode);

  const getContributionsPerMonth = () => {
    const { messages, posts, reactions, comments } = data.contributions;
    return getFieldsPerMonth(
      [messages, posts, reactions, comments],
      ['# of messages', '# of posts', '# of reactions', '# of comments']
    );
  };

  const getAdvertisorsWordCloud = (): Array<Word> => {
    const { advertisors } = data.interests;
    const words: Array<Word> = [];
    const shuffledAds = [...advertisors].sort(() => 0.5 - Math.random());
    shuffledAds.forEach((advertisor) => {
      words.push({
        text: advertisor,
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
      const hasSub = participantMap.has(message.title);

      participantMap.set(
        message.title,
        !hasSub ? 1 : participantMap.get(message.title) + 1
      );
    });

    return createChartDatasetFromMap(
      'Participants',
      participantMap,
      isDarkmode
    );
  };

  const getReactionsActivity = () => {
    const { reactions } = data.contributions;

    return getFieldPerHour(reactions, 'Reactions activity', isDarkmode);
  };

  const getMessagesActivity = () => {
    const { messages } = data.contributions;

    return getFieldPerHour(messages, 'Messages activity', isDarkmode);
  };

  const getCommentsActivity = () => {
    const { comments } = data.contributions;

    return getFieldPerHour(comments, 'Comments activity', isDarkmode);
  };

  const getReactionDistribution = () => {
    const { reactions } = data.contributions;

    const reactionMap = new Map();
    Object.values(REACTION_EMOJIS).forEach((reaction) => {
      reactionMap.set(reaction, 0);
    });

    reactions.forEach((reaction) => {
      reactionMap.set(reaction.type, reactionMap.get(reaction.type) + 1);
    });

    return createChartDatasetFromMap(
      'Reaction distribution',
      reactionMap,
      isDarkmode,
      REACTION_COLORS
    );
  };

  const getMostUsedInMessageWordCloud = (wordCount: number): Array<Word> => {
    const { messages } = data.contributions;

    const mostUsedWordsMap = new Map();

    messages.forEach((message) => {
      if (message.content) {
        message.content.split(' ').forEach((word) => {
          const hasWord = mostUsedWordsMap.has(word);
          if (word.length <= 30) {
            mostUsedWordsMap.set(
              word,
              !hasWord ? 1 : mostUsedWordsMap.get(word) + 1
            );
          }
        });
      }
    });

    const topWords = Array.from(mostUsedWordsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, wordCount);

    const words: Array<Word> = topWords.map((word) => {
      return { text: word[0], value: 10 };
    });

    return words;
  };

  const getPostsWithLocation = () => {
    const { posts } = data.contributions;
    const locationsMap: Map<string, Date[]> = new Map();
    posts
      .filter((post) => post.location !== undefined)
      .forEach((post) => {
        const { longitude, latitude } = post.location!;
        const key = `${latitude},${longitude}`;
        const hasLocation = locationsMap.has(key);
        if (!hasLocation) {
          locationsMap.set(key, [post.date]);
        } else {
          locationsMap.get(key)?.push(post.date);
        }
      });
    return locationsMap;
  };

  const formatDate = (date: Date) => {
    const day = new Date(date).getDay() + 1;
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  Advertisors that have you in their contact list
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <ReactWordcloud
                  words={getAdvertisorsWordCloud()}
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
              chart={
                <DefaultChart
                  data={getContributionsPerMonth}
                  chartType={ChartType.LINE}
                />
              }
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <ChartCard
              title="Message distribution"
              chart={
                <DefaultChart
                  data={getMessageDistribution}
                  chartType={ChartType.PIE}
                />
              }
            />
          </IonCol>
          <IonCol size="6">
            <ChartCard
              title="Reaction distribution"
              chart={
                <DefaultChart
                  data={getReactionDistribution}
                  chartType={ChartType.PIE}
                />
              }
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <ChartCard
              title="Likes per hour"
              chart={
                <SegmentChart
                  chartType={ChartType.BAR}
                  data={getReactionsActivity()[0]}
                  chartTypeOverview={ChartType.DONUT}
                  dataOverview={getReactionsActivity()[1]}
                />
              }
            />
          </IonCol>
          <IonCol size="6">
            <ChartCard
              title="Messages per hour"
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
            <ChartCard
              title="Comments per hour"
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
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Top 20 words used in messages</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <ReactWordcloud
                  words={getMostUsedInMessageWordCloud(25)}
                  options={{ enableTooltip: false, enableOptimizations: true }}
                />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
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
                  {Array.from(getPostsWithLocation().entries()).map(
                    ([coordinates, posts]) => {
                      return (
                        <Marker
                          key={coordinates}
                          position={[
                            +coordinates.split(',')[0],
                            +coordinates.split(',')[1],
                          ]}
                        >
                          <Popup>
                            <div className="MarkerPopup">
                              <h4>
                                <strong>{`You posted ${posts.length} times here on the following dates:`}</strong>
                              </h4>
                              <br />
                              {posts.map((post: Date) => {
                                return (
                                  <p key={+post}>{`${formatDate(post)}`}</p>
                                );
                              })}
                            </div>
                          </Popup>
                        </Marker>
                      );
                    }
                  )}
                  {/* <Marker position={[51.505, -0.09]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker> */}
                </MapContainer>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default FacebookDetailPage;
