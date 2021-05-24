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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { PAGES } from '../../../globals';
import './LoginPage.scss';
import { loginThunk, selectIsAuthenticated } from '../userControllerSlice';

const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const tryLogin = () => {
    dispatch(
      loginThunk({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) history.push(PAGES.OVERVIEW.route);
  }, [isAuthenticated]);

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
                <IonButton color="primary" size="default" onClick={tryLogin}>
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
          </IonList>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default LoginPage;
