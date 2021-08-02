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
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../pages/UserController/userControllerSlice';
import { PAGES } from '../../store/globalSlice';

const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const redirectTo = (route: string) => {
    switch (route) {
      case PAGES.OVERVIEW.route: {
        history.push(PAGES.OVERVIEW.route);
        break;
      }
      case PAGES.REQUEST.route: {
        history.push(PAGES.REQUEST.route);
        break;
      }
      case PAGES.SCOREBOARD.route: {
        history.push(PAGES.SCOREBOARD.route);
        break;
      }
      case PAGES.SETTINGS.route: {
        history.push(PAGES.SETTINGS.route);
        break;
      }
      case PAGES.LANDING.route: {
        dispatch(logout());
        history.push(PAGES.LANDING.route);
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
          <IonItem button onClick={() => redirectTo(PAGES.OVERVIEW.route)}>
            Overview
          </IonItem>
          <IonItem button onClick={() => redirectTo(PAGES.REQUEST.route)}>
            Request Data
          </IonItem>
          <IonItem button onClick={() => redirectTo(PAGES.SCOREBOARD.route)}>
            Scoreboard
          </IonItem>
          <IonItem button onClick={() => redirectTo(PAGES.SETTINGS.route)}>
            Settings
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonItem button onClick={() => redirectTo(PAGES.LANDING.route)}>
          Logout
        </IonItem>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
