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
import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router';
import { PAGES } from '../../globals';
import { logout } from '../../pages/UserController/userControllerSlice';

const mapDispatchToProps = {
  logout,
};

const connector = connect(() => ({}), mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Menu: FunctionComponent<Props> = (props: Props) => {
  const history = useHistory();
  const { logout } = props;

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
        logout();
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

export default connector(Menu);
