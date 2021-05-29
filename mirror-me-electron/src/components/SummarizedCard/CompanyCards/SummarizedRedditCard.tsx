import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import './SummarizedRedditCard.scss';

const SummarizedRedditCard = () => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <Pie
            className="PieChart"
            type="pie"
            data={{
              labels: ['Red', 'Blue', 'Yellow'],
              datasets: [
                {
                  label: 'My First Dataset',
                  data: [300, 50, 100],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
            options={{
              maintainAspectRatio: true,
            }}
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default SummarizedRedditCard;
