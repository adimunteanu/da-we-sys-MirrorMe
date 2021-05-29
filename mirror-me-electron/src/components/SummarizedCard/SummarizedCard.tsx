import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import React from 'react';
import './SummarizedCard.scss';

interface Props {
  title: string;
  children: React.ReactNode;
  logo: any;
}

const SummarizedCard = ({ title, children, logo }: Props) => {
  return (
    <IonCard className="SummarizedCard">
      <img src={logo} alt={title} />
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{children}</IonCardContent>
    </IonCard>
  );
};

export default SummarizedCard;
