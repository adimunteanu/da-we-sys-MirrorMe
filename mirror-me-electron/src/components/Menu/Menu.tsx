import {
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import Routes from '../../routes';

const Menu = () => {
  const history = useHistory();

  const redirectTo = (route: string) => {
    switch (route) {
      case Routes.OVERVIEW: {
        history.push(Routes.OVERVIEW);
        break;
      }
      case Routes.REQUEST: {
        history.push(Routes.REQUEST);
        break;
      }
      case Routes.SCOREBOARD: {
        history.push(Routes.SCOREBOARD);
        break;
      }
      case Routes.SETTINGS: {
        history.push(Routes.SETTINGS);
        break;
      }
      case Routes.LANDING: {
        history.push(Routes.LANDING);
        break;
      }
      default:
        break;
    }
  };

  return (
    <IonMenu side="start" content-id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mirror Me</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem button onClick={() => redirectTo(Routes.OVERVIEW)}>
            Overview
          </IonItem>
          <IonItem button onClick={() => redirectTo(Routes.REQUEST)}>
            Request Data
          </IonItem>
          <IonItem button onClick={() => redirectTo(Routes.SCOREBOARD)}>
            Scoreboard
          </IonItem>
          <IonItem button onClick={() => redirectTo(Routes.SETTINGS)}>
            Settings
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonItem button onClick={() => redirectTo(Routes.LANDING)}>
          Logout
        </IonItem>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
