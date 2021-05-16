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
import FacebookImg from '../../images/Facebook.png';
import YouTubeImg from '../../images/YouTube.jpg';
import GitHubImg from '../../images/GitHub.png';
import InstagramImg from '../../images/Instagram.png';
import SpotifyImg from '../../images/Spotify.jpg';
import NetflixImg from '../../images/Netflix.png';

const RequestPage: React.FC = () => {
  return (
    <IonContent className="RequestPage">
      <p>Request your Data from one of the following Companies!</p>
      <IonGrid className="CardGrid">
        <IonRow>
          <IonCol>
            <IonCard className="RequestPage_Card">
              <img className="youtube-img" src={YouTubeImg} alt="YouTube" />
              <IonCardHeader>
                <IonCardTitle>YouTube</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                YouTube is an online video platform owned by Google. In total,
                users watch more than one billion hours of videos each day.
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton
                        id="youtube"
                        size="small"
                        href="https://takeout.google.com/"
                      >
                        Request
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard className="RequestPage_Card">
              <img src={InstagramImg} alt="Instagram" />
              <IonCardHeader>
                <IonCardTitle>Instagram</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Instagram is an American photo and video sharing social
                networking service created by Kevin Systrom and Mike Krieger.
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton
                        id="instagram"
                        size="small"
                        href="https://www.instagram.com/download/request/ "
                      >
                        Request
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard className="RequestPage_Card">
              <img src={FacebookImg} alt="Facebook" />
              <IonCardHeader>
                <IonCardTitle>Facebook</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Facebook, Inc., is an American technology conglomerate based in
                Menlo Park, California. It was founded by Mark Zuckerberg, along
                with his friends.
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton
                        id="facebook"
                        size="small"
                        href="https://www.facebook.com/dyi"
                      >
                        Request
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard className="RequestPage_Card">
              <img src={SpotifyImg} alt="Spotify" />
              <IonCardHeader>
                <IonCardTitle>Spotify</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Spotify is a Swedish audio streaming and media services
                provider, founded in 2006 by Daniel Ek. Spotify is incorporated
                in Luxembourg and is headquartered in Stockholm, Sweden.
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton
                        size="small"
                        href="https://www.spotify.com/de/account/privacy/"
                      >
                        Request
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard className="RequestPage_Card">
              <img src={GitHubImg} alt="GitHub" />
              <IonCardHeader>
                <IonCardTitle>GitHub</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                GitHub, Inc. is a provider of Internet hosting for software
                development and version control using Git. It offers the
                distributed version control and source code management
                functionality of Git.
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton
                        size="small"
                        href="https://github.com/settings/admin"
                      >
                        Request
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard className="RequestPage_Card">
              <img src={NetflixImg} alt="Netflix" />
              <IonCardHeader>
                <IonCardTitle>Netflix</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Netflix, Inc. is an American over-the-top content platform and
                production company headquartered in Los Gatos, California.
                Netflix was founded in 1997 by Reed Hastings and Marc Randolph
                in California.
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton
                        size="small"
                        href="https://www.netflix.com/account/getmyinfo"
                      >
                        Request
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

export default RequestPage;
