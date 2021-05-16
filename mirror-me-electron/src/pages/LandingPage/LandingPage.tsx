import React from 'react';
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
import MirrorImg from '../../images/Mirror.jpg';
import AppsImg from '../../images/Apps.png';
import ScoreImg from '../../images/Score.jpg';

const LandingPage: React.FC = () => {
  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol className="home">
            <h1>MirrorMe</h1>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard className="card">
              <img className="HomeImg" src={AppsImg} alt="AppsImage" />
              <IonCardHeader>
                <IonCardTitle>Request your Data!</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="content">
                Request your personal Data from many different Companies easily!
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard className="card">
              <img className="HomeImg" src={MirrorImg} alt="MirrorImage" />
              <IonCardHeader>
                <IonCardTitle>Mirror your Profile!</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="content">
                Visualize your Data on one Page and see what they know about
                you!
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard className="card">
              <img className="HomeImg" src={ScoreImg} alt="ScoreImage" />
              <IonCardHeader>
                <IonCardTitle>Compute Score!</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="content">
                Compute a Score based on your Data and compare it with friends!
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="home">
            <IonButton id="signup" size="large">
              Sign up
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <p>
              Already a member? Log in
              <span>
                <u>here</u>
              </span>
            </p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default LandingPage;
