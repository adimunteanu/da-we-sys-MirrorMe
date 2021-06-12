import React from 'react';
import './SettingsPage.scss';
import {
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthToken,
  selectNickname,
} from '../UserController/userControllerSlice';
import { deleteScoreThunk } from '../ScoreboardPage/scoreControllerSlice';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();

  const nickname = useSelector(selectNickname);
  const authToken = useSelector(selectAuthToken);

  const tryDeleteScore = () => {
    dispatch(
      deleteScoreThunk({
        nickname,
        authToken,
      })
    );
  };

  return (
    <IonContent className="SettingsPage">
      <p>Settings page</p>
      <IonGrid className="CardGrid">
        <IonRow>
          <IonCol>
            <IonCard className="SettingsPage_Card">
              <IonCardHeader>
                <IonCardTitle>Change Nickname</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                In order to change your nickname, click here!
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton id="change-nickname" size="large">
                        Coming Soon
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard className="SettingsPage_Card">
              <IonCardHeader>
                <IonCardTitle>Delete Score</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                In order to delete your nickname, click here!
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton
                        id="delete-score"
                        size="large"
                        onClick={tryDeleteScore}
                      >
                        Delete Score
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default SettingsPage;
