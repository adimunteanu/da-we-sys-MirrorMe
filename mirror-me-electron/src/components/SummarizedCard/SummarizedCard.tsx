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
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { PAGES } from '../../globals';
import { updateCurrentCompanyView } from '../../store/globalSlice';
import './SummarizedCard.scss';

interface Props {
  title: string;
  children: React.ReactNode;
  logo: any;
}

const SummarizedCard = ({ title, children, logo }: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const goToDetailedView = () => {
    dispatch(updateCurrentCompanyView(title));
    history.push(PAGES.DETAIL.route + title.toLowerCase());
  };

  return (
    <IonCard className="SummarizedCard">
      <img src={logo} alt={title} />
      <IonCardHeader>
        <IonToolbar>
          <IonCardTitle>{title}</IonCardTitle>
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              onClick={() => {
                goToDetailedView();
              }}
            >
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
