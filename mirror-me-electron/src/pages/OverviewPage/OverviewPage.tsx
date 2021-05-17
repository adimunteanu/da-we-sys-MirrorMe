import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PAGES } from '../../globals';

const OverviewPage = () => {
  const history = useHistory();

  const routeToLogin = () => {
    history.push(PAGES.REQUEST.route);
  };

  return (
    <IonContent className="OverviewPage">
      <IonGrid>
        <IonRow>
          <IonCol>
            <p>
              <IonText>
                It seems kinda empty around here, would you like to request your
                data?
              </IonText>
            </p>
            <IonButton
              fill="clear"
              onClick={routeToLogin}
              className="Request-Button"
            >
              <IonLabel>Take me to the Request Data Page!</IonLabel>
            </IonButton>
            <p>
              <IonText>
                Already have your data? Upload it by pressing on the + icon to
                the top right!
              </IonText>
            </p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default OverviewPage;
