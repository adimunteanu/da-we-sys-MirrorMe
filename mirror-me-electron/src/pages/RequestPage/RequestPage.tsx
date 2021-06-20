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
import { shell } from 'electron';
import FacebookImg from '../../images/Facebook.png';
import RedditImg from '../../images/Reddit.jpg';
import GitHubImg from '../../images/GitHub.png';
import InstagramImg from '../../images/Instagram.png';
import SpotifyImg from '../../images/Spotify.jpg';
import NetflixImg from '../../images/Netflix.png';

const RequestPage: React.FC = () => {
  const openExternalBrowser = (route: string) => {
    shell.openExternal(route);
  };

  const facebookBrowser = () => {
    openExternalBrowser('https://www.facebook.com/dyi');
  };

  const githubBrowser = () => {
    openExternalBrowser('https://github.com/settings/admin');
  };

  const instagramBrowser = () => {
    openExternalBrowser('https://www.instagram.com/download/request/');
  };

  const netflixBrowser = () => {
    openExternalBrowser('https://www.netflix.com/account/getmyinfo');
  };

  const spotifyBrowser = () => {
    openExternalBrowser('https://www.spotify.com/de/account/privacy/');
  };

  const redditBrowser = () => {
    openExternalBrowser('https://www.reddit.com/settings/data-request');
  };

  return (
    <IonContent className="RequestPage">
      <p>Request your Data from one of the following Companies!</p>
      <IonGrid className="CardGrid">
        <IonRow>
          {/** <IonCol>
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
                        onClick={youtube}
                      >
                        Request
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonCol> */}
          <IonCol>
            <IonCard className="RequestPage_Card">
              <img className="reddit-img" src={RedditImg} alt="Reddit" />
              <IonCardHeader>
                <IonCardTitle>Reddit</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Reddit is a network of communities based on people&apos;s
                interests. Find communities you&apos;re interested in, and
                become part of an online community!
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton
                        id="redditBrowser"
                        size="small"
                        onClick={redditBrowser}
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
                        id="instagramBrowser"
                        size="small"
                        onClick={instagramBrowser}
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
                        id="facebookBrowser"
                        size="small"
                        onClick={facebookBrowser}
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
                      <IonButton size="small" onClick={spotifyBrowser}>
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
                      <IonButton size="small" onClick={githubBrowser}>
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
                      <IonButton size="small" onClick={netflixBrowser}>
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
