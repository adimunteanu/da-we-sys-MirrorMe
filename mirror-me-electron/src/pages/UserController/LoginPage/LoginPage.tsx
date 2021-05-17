import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import SlidingError from '../../../components/SlidingError/SlidingError';
import { PAGES } from '../../../globals';
import './LoginPage.scss';

const LoginPage = () => {
  const history = useHistory();
  const [errorOccured, setErrorOccured] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if (email !== '' || password !== '') {
      setErrorOccured(true);
    } else {
      setErrorOccured(false);
      history.push(PAGES.OVERVIEW.route);
    }
  };

  const routeToSignup = () => {
    history.push(PAGES.SIGNUP.route);
  };

  return (
    <div className="LoginPage">
      <IonCard className="LoginPage__Card">
        <IonCardHeader>
          <IonCardTitle>Login</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <IonItem className="LoginPage__Item">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                onIonChange={(event: any) => {
                  setEmail(event.detail.value);
                }}
              />
            </IonItem>
            <IonItem className="LoginPage__Item">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                value={password}
                type="password"
                onIonChange={(event: any) => {
                  setPassword(event.detail.value);
                }}
              />
            </IonItem>
            <IonList className="LoginPage__Item--centered" lines="none">
              <IonItem className="LoginPage__Item" lines="none">
                <IonButton color="primary" size="default" onClick={login}>
                  Submit
                </IonButton>
              </IonItem>
              <IonItem className="LoginPage__Item" lines="none">
                <IonButton
                  className="LoginPage__Link"
                  fill="clear"
                  onClick={routeToSignup}
                >
                  Still not a member?
                </IonButton>
              </IonItem>
            </IonList>
            <SlidingError
              hidden={!errorOccured}
              text="Invalid email or password!"
            />
          </IonList>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default LoginPage;
