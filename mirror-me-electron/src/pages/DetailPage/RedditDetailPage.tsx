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
      if (vote) {
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

  const getLocationCounts = () => {
    const { ipLogs } = data;

    const locationWrapper: { name: string; index: number }[] = [];
    const locations: string[] = [];
    const counts: number[] = [];
    let maxIndex = 0;

    ipLogs.forEach((log) => {
      if (log.ip) {
        const { city } = geoip.allData(log.ip);
        if (city) {
          const foundCity = locationWrapper.find(
            (location) => location.name === city
          );

          if (foundCity) {
            counts[foundCity.index] += 1;
          } else {
            locationWrapper.push({ name: city, index: maxIndex });
            locations.push(city);
            counts.push(1);
            maxIndex += 1;
          }
        }
      }
    });

    return {
      labels: locations,
      datasets: [
        {
          label: 'Cities',
          data: counts,
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
              title="Votes Distribution"
              chartType={ChartType.BAR}
              data={getUpDownVotes}
            />
          </IonCol>
          <IonCol size="4">
            <ChartCard
              title="Access Locations"
              chartType={ChartType.PIE}
              data={getLocationCounts}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default RedditDetailPage;
