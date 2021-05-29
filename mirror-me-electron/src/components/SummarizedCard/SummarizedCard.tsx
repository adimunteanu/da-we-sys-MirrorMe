import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonText,
  IonToolbar,
} from '@ionic/react';
import { statsChartOutline } from 'ionicons/icons';
import React from 'react';
import './SummarizedCard.scss';

interface Props {
  title: string;
  children: React.ReactNode;
  logo: any;
}

const SummarizedCard = ({ title, children, logo }: Props) => {
  const goToDetailedView = () => {
    // TODO route to detailed view
  };

  return (
    <IonCard className="SummarizedCard">
      <img src={logo} alt={title} />
      <IonCardHeader>
        <IonToolbar>
          <IonCardTitle>{title}</IonCardTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={goToDetailedView}>
              <IonText>See more</IonText>
              <IonIcon icon={statsChartOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonCardHeader>
      <IonCardContent>{children}</IonCardContent>
    </IonCard>
  );
};

export default SummarizedCard;
