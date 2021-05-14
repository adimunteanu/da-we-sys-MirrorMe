import React, { useState } from 'react';
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
import SlidingError from '../../../components/SlidingError/SlidingError';
import './RegisterPage.scss';
import Routes from '../../../routes';

const RegisterPage = () => {
  const history = useHistory();
  const [errorOccured /* , setErrorOccured */] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = () => {
    history.push(Routes.LOGIN);
  };

  const routeToLogin = () => {
    history.push(Routes.LOGIN);
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
              text="Invalid email or password!"
            />
          </IonList>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default RegisterPage;
