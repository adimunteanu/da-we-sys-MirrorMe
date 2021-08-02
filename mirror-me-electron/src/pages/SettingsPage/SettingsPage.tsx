import React, { useEffect, useState } from 'react';
import './SettingsPage.scss';
import * as fs from 'fs';
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
  IonToggle,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthToken,
  selectNickname,
} from '../UserController/userControllerSlice';
import {
  deleteScoreThunk,
  selectUploadedScore,
  updateScoreThunk,
} from '../ScoreboardPage/scoreControllerSlice';
import {
  selectData,
  deleteCompanyRelevantData,
} from '../OverviewPage/dataSlice';
import { COMPANIES } from '../../globals';
import { computeScore } from '../ScoreboardPage';
import { selectIsDarkmode, updateIsDarkmode } from '../../store/globalSlice';

const dataPathFacebook = './data/facebook_data.json';
const dataPathInstagram = './data/instagram_data.json';
const dataPathReddit = './data/reddit_data.json';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();

  const nickname = useSelector(selectNickname);
  const authToken = useSelector(selectAuthToken);
  const hasScore = useSelector(selectUploadedScore);
  const data = useSelector(selectData);

  const [hasDeletedData, setHasDeletedData] = useState(false);
  const isDarkmode = useSelector(selectIsDarkmode);

  useEffect(() => {
    if (hasDeletedData) {
      dispatch(
        updateScoreThunk({ nickname, score: computeScore(data), authToken })
      );
      setHasDeletedData(false);
    }
  }, [data]);

  const deleteLocalData = (company: string) => {
    let path = '';
    switch (company) {
      case 'Facebook':
        path = dataPathFacebook;
        break;
      case 'Instagram':
        path = dataPathInstagram;
        break;
      case 'Reddit':
        path = dataPathReddit;
        break;
      default:
        path = '';
    }
    if (fs.existsSync(path)) {
      fs.unlink(path, (err) => {
        if (err) {
          alert(err.message);
          console.log(err);
          return;
        }
        console.log('File succesfully deleted');
      });
      setHasDeletedData(true);
      dispatch(deleteCompanyRelevantData(company));
    } else {
      alert("This file doesn't exist, cannot delete");
    }
  };

  const deleteLocalFacebookData = () => {
    deleteLocalData(COMPANIES.FACEBOOK.name);
  };
  const deleteLocalInstagramData = () => {
    deleteLocalData(COMPANIES.INSTAGRAM.name);
  };
  const deleteLocalRedditData = () => {
    deleteLocalData(COMPANIES.REDDIT.name);
  };

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
      <IonGrid className="CardGrid">
        <IonRow>
          <IonCol size="4">
            <IonCard className="SettingsPage_Card">
              <IonCardHeader>
                <IonCardTitle>Toggle theme</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonLabel>{isDarkmode ? 'Darkmode' : 'Lightmode'}</IonLabel>
                    <IonToggle
                      slot="start"
                      checked={isDarkmode}
                      onIonChange={(e) => {
                        document.body.classList.toggle(
                          'dark',
                          e.detail.checked
                        );
                        dispatch(updateIsDarkmode(e.detail.checked));
                      }}
                    />
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonCol>
          {hasScore && (
            <IonCol size="4">
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
          )}
        </IonRow>
        <IonRow>
          {fs.existsSync(dataPathFacebook) && (
            <IonCol size="4">
              <IonCard className="SettingsPage_Card">
                <IonCardHeader>
                  <IonCardTitle>Delete Facebook Data</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonButton
                          id="change-nickname"
                          size="large"
                          onClick={deleteLocalFacebookData}
                        >
                          Delete
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          )}
          {fs.existsSync(dataPathInstagram) && (
            <IonCol size="4">
              <IonCard className="SettingsPage_Card">
                <IonCardHeader>
                  <IonCardTitle>Delete Instagram Data</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonButton
                          id="change-nickname"
                          size="large"
                          onClick={deleteLocalInstagramData}
                        >
                          Delete
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          )}
          {fs.existsSync(dataPathReddit) && (
            <IonCol size="4">
              <IonCard className="SettingsPage_Card">
                <IonCardHeader>
                  <IonCardTitle>Delete Reddit Data</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonButton
                          id="change-nickname"
                          size="large"
                          onClick={deleteLocalRedditData}
                        >
                          Delete
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default SettingsPage;
