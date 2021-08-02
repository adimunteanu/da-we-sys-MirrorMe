import React from 'react';
import { useHistory } from 'react-router';
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
import { Link } from 'react-router-dom';
import MirrorImg from '../../images/Mirror.jpg';
import AppsImg from '../../images/Apps.png';
import ScoreImg from '../../images/Score.jpg';
import { PAGES } from '../../store/globalSlice';

const LandingPage: React.FC = () => {
  const history = useHistory();
  const redirectToSignUp = () => {
    history.push(PAGES.SIGNUP.route);
  };

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
            <IonButton id="signup" size="large" onClick={redirectToSignUp}>
              Sign up
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <p>
              Already a member? Log in <Link to={PAGES.LOGIN.route}>here</Link>
            </p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default LandingPage;
