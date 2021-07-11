import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMPANIES } from '../../globals';
import { selectHasData } from '../OverviewPage/dataSlice';
import {
  selectAuthToken,
  selectNickname,
} from '../UserController/userControllerSlice';
import ConsentForm from './ConsentForm/ConsentForm';
import EmptyView from './EmptyView';
import {
  getAllScoreThunk,
  getMeScoreThunk,
  selectAllScores,
  selectUploadedScore,
} from './scoreControllerSlice';

const ScoreboardPage = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>('Total');
  const hasData = useSelector(selectHasData);
  const hasScore = useSelector(selectUploadedScore);
  const allScores = useSelector(selectAllScores);
  const authToken = useSelector(selectAuthToken);
  const nickname = useSelector(selectNickname);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (hasScore) {
      dispatch(getAllScoreThunk(authToken));
      dispatch(getMeScoreThunk({ nickname, authToken }));
    }
  }, [hasScore]);

  const getScoreboardList = () => {
    const items: any[] = [];

    const sortedScores: any[] = [];
    switch (selectedCompany) {
      case COMPANIES.REDDIT.name:
        allScores.forEach((score) => {
          if (score.score.scoreReddit > 0) {
            sortedScores.push({
              nickname: score.nickname,
              score: score.score.scoreReddit,
            });
          }
        });
        sortedScores.sort((a, b) => a.score - b.score);
        break;
      case COMPANIES.INSTAGRAM.name:
        allScores.forEach((score) => {
          if (score.score.scoreInsta > 0) {
            sortedScores.push({
              nickname: score.nickname,
              score: score.score.scoreInsta,
            });
          }
        });
        sortedScores.sort((a, b) => a.score - b.score);
        break;
      case COMPANIES.FACEBOOK.name:
        allScores.forEach((score) => {
          if (score.score.scoreFacebook > 0) {
            sortedScores.push({
              nickname: score.nickname,
              score: score.score.scoreFacebook,
            });
          }
        });
        sortedScores.sort((a, b) => a.score - b.score);
        break;
      default: {
        allScores.forEach((score) => {
          if (score.score.scoreTotal > 0) {
            sortedScores.push({
              nickname: score.nickname,
              score: score.score.scoreTotal,
            });
          }
        });
        sortedScores.sort((a, b) => a.score - b.score);
        break;
      }
    }

    sortedScores.forEach((score, i) => {
      if (score.nickname.toLowerCase().includes(searchText.toLowerCase())) {
        if (score.nickname === nickname) {
          items.push(
            <IonItem
              className="ScoreItem"
              color="primary"
              title="The score is computed based on the number of contributions (likes, comments, posts) and user-specific information that is disclosed. For more information checkout the README file."
            >
              <span>
                {`#${i + 1}`}&emsp;{score.nickname}
              </span>
              <span slot="end">{score.score}</span>
            </IonItem>
          );
        } else {
          items.push(
            <IonItem className="ScoreItem">
              <span>
                {`#${i + 1}`}&emsp;{score.nickname}
              </span>
              <span slot="end">{score.score}</span>
            </IonItem>
          );
        }
      }
    });

    return <IonList>{items}</IonList>;
  };

  return (
    <IonContent>
      {!hasData ? (
        <EmptyView />
      ) : !hasScore ? (
        <ConsentForm />
      ) : (
        <IonGrid>
          <IonRow>
            <IonCol size="8" offset="2">
              <IonSearchbar
                id="searchbar"
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                showCancelButton="never"
                showClearButton="always"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="8" offset="2">
              <IonCard>
                <IonCardHeader>
                  <IonList>
                    <IonItem lines="none" className="Scoreboard__Ion-Item">
                      <IonLabel>Selected company:</IonLabel>
                      <IonSelect
                        onIonChange={(element) =>
                          setSelectedCompany(element.detail.value)
                        }
                        value={selectedCompany}
                      >
                        <IonSelectOption value="Total">
                          Total score
                        </IonSelectOption>
                        {Object.values(COMPANIES).map((company) => {
                          return (
                            <IonSelectOption
                              value={company.name}
                              key={company.name}
                            >
                              {company.name}
                            </IonSelectOption>
                          );
                        })}
                      </IonSelect>
                    </IonItem>
                  </IonList>
                </IonCardHeader>
                <IonCardContent className="CardContent">
                  {getScoreboardList()}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
    </IonContent>
  );
};

export default ScoreboardPage;
