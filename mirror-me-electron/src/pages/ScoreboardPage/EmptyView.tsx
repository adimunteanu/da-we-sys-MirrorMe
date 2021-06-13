import {
  IonButton,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PAGES } from '../../globals';

const EmptyView = () => {
  const history = useHistory();
  const routeToOverview = () => {
    history.push(PAGES.OVERVIEW.route);
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <p>
            <IonText>
              Do you want to see what your friends scores are?
              <br /> Then submit some of your own data by going to the overview
              page.
            </IonText>
          </p>
          <IonButton
            fill="clear"
            onClick={routeToOverview}
            className="Overview-Button"
          >
            <IonLabel>Take me to the Overview page!</IonLabel>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default EmptyView;
