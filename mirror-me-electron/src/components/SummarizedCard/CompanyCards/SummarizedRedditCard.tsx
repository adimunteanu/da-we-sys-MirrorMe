import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { CHART_COLORS } from '../../../globals';
import { selectData } from '../../../pages/OverviewPage/dataSlice';
import { RedditRelevantData } from '../../../types';
import './SummarizedRedditCard.scss';

const SummarizedRedditCard = () => {
  const data = useSelector(selectData).find(
    (object) => object.company === 'Reddit'
  )!.data as RedditRelevantData;

  const getPieChartData = () => {
    const { posts, messages, votes, comments } = data.contributions;
    return {
      labels: ['Posts', 'Messages', 'Votes', 'Comments'],
      datasets: [
        {
          label: 'Contributions',
          data: [posts.length, messages.length, votes.length, comments.length],
          backgroundColor: CHART_COLORS,
          hoverOffset: 4,
        },
      ],
    };
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

export default SummarizedRedditCard;
