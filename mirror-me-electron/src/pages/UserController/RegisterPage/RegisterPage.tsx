import React, { useEffect, useState } from 'react';
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
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import SlidingError from '../../../components/SlidingError/SlidingError';
import './RegisterPage.scss';
import { PAGES } from '../../../globals';
import { selectIsAuthenticated, signupThunk } from '../userControllerSlice';
import { isEmail, isPassword } from '..';

const RegisterPage = () => {
  const history = useHistory();
  const [errorOccured, setErrorOccured] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const trySignUpAndLogin = () => {
    dispatch(
      signupThunk({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) history.push(PAGES.OVERVIEW.route);
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

  const register = () => {
    if (!isEmail(email) || !isPassword(password)) {
      // email gets checked on the server if it's an email that's why you're still able to produce bad requests
      setErrorOccured(true);
    } else if (password !== confirmPassword) {
      setErrorOccured(true);
    } else {
      setErrorOccured(false);
      trySignUpAndLogin();
    }
  };

  const routeToLogin = () => {
    history.push(PAGES.LOGIN.route);
  };

  return (
    <div className="RegisterPage">
      <IonCard className="RegisterPage__Card">
        <IonCardHeader>
          <IonCardTitle>Sign Up</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <IonItem className="RegisterPage__Item">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                onIonChange={(event: any) => {
                  setEmail(event.detail.value);
                }}
              />
            </IonItem>
            <IonItem className="RegisterPage__Item">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                value={password}
                type="password"
                onIonChange={(event: any) => {
                  setPassword(event.detail.value);
                }}
              />
            </IonItem>
            <IonItem className="RegisterPage__Item">
              <IonLabel position="floating">Confirm Password</IonLabel>
              <IonInput
                value={confirmPassword}
                type="password"
                onIonChange={(event: any) => {
                  setConfirmPassword(event.detail.value);
                }}
              />
            </IonItem>
            <IonList className="RegisterPage__Item--centered" lines="none">
              <IonItem className="RegisterPage__Item" lines="none">
                <IonButton color="primary" size="default" onClick={register}>
                  Submit
                </IonButton>
              </IonItem>
              <IonItem className="RegisterPage__Item" lines="none">
                <IonButton
                  className="RegisterPage__Link"
                  fill="clear"
                  onClick={routeToLogin}
                >
                  Already a member?
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

export default RegisterPage;
