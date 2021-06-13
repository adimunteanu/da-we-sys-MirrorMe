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
import {
  loginThunk,
  selectAuthToken,
  selectIsAuthenticated,
  selectNickname,
} from '../userControllerSlice';
import { isEmail, isPassword } from '..';
import SlidingError from '../../../components/SlidingError/SlidingError';
import { getMeScoreThunk } from '../../ScoreboardPage/scoreControllerSlice';
import { loadFiles } from '../../OverviewPage/dataSlice';

const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorOccured, setErrorOccured] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authToken = useSelector(selectAuthToken);
  const nickname = useSelector(selectNickname);

  const tryLogin = () => {
    if (isEmail(email) && isPassword(password)) {
      setErrorOccured(false);
      dispatch(
        loginThunk({
          email,
          password,
        })
      );
    } else {
      setErrorOccured(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMeScoreThunk({ nickname, authToken }));
      dispatch(loadFiles());
      history.push(PAGES.OVERVIEW.route);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (errorOccured) {
      const interval = setInterval(() => {
        setErrorOccured(false);
      }, 2000);

      return () => clearInterval(interval);
    }

    return () => {};
  }, [errorOccured]);

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
            <SlidingError
              hidden={!errorOccured}
              text="Please check the correctness of the fields!"
            />
          </IonList>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default LoginPage;
