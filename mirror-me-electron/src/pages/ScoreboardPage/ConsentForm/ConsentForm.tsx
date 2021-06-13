import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonCol,
  IonFooter,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
} from '@ionic/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMPANIES } from '../../../globals';
import { ScoresObject } from '../../../types';
import { selectData } from '../../OverviewPage/dataSlice';
import {
  selectAuthToken,
  selectNickname,
} from '../../UserController/userControllerSlice';
import { addScoreThunk } from '../scoreControllerSlice';
import './ConsentForm.scss';

const ConsentForm = () => {
  const dispatch = useDispatch();
  const [consented, setConsented] = useState(false);
  const data = useSelector(selectData);
  const nickname = useSelector(selectNickname);
  const authToken = useSelector(selectAuthToken);

  const onChange = (checked: boolean) => {
    setConsented(checked);
  };

  const uploadScore = () => {
    const score: ScoresObject = {
      scoreTotal: 0,
      scoreInsta: 0,
      scoreReddit: 0,
    };

    data.forEach((company) => {
      switch (company.company) {
        case COMPANIES.REDDIT.name: {
          score.scoreReddit = Object.values(company.data.contributions).reduce(
            (total: number, contribution: Array<any>) =>
              total + contribution.length,
            0
          );
          score.scoreTotal += score.scoreReddit;
          break;
        }
        case COMPANIES.INSTAGRAM.name: {
          score.scoreInsta = Object.values(company.data.contributions).reduce(
            (total: number, contribution: Array<any>) =>
              total + contribution.length,
            0
          );
          score.scoreTotal += score.scoreInsta;
          break;
        }
        default: {
          break;
        }
      }
    });
    dispatch(addScoreThunk({ nickname, score, authToken }));
  };

  return (
    <div className="ConsentForm">
      <IonGrid>
        <IonRow>
          <IonCol offset="3" size="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Terms and Conditions</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="ConsentForm-Card">
                <IonText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas sapien turpis, scelerisque id tincidunt sed,
                  ullamcorper at diam. Aliquam euismod placerat suscipit. In
                  vitae interdum mi. Vivamus tincidunt commodo enim, et viverra
                  massa condimentum ut. Fusce id quam convallis nisi tincidunt
                  ullamcorper. Nunc vulputate mattis tristique. Etiam
                  sollicitudin elementum iaculis. Curabitur eget justo augue.
                  Morbi libero sapien, tincidunt ut dictum ut, venenatis vel
                  arcu. In ut urna lectus. Ut quam mi, eleifend at ante id,
                  congue blandit lectus. Nulla laoreet, nisi sollicitudin
                  maximus eleifend, ex ligula pharetra massa, et ornare metus
                  odio a felis. Curabitur dignissim convallis gravida.
                  <br />
                  <br />
                  Pellentesque egestas ac diam non feugiat. Duis cursus ultrices
                  nunc, at convallis nisl lacinia non. Etiam a dui dolor. Nulla
                  facilisi. Pellentesque semper non diam vitae finibus.
                  Vestibulum sagittis facilisis congue. Sed sit amet vehicula
                  dolor. Duis sed sollicitudin ante, quis efficitur sem.
                  <br />
                  <br />
                  Nullam mi lectus, blandit ut ipsum id, tempor congue quam.
                  Maecenas porttitor luctus ligula, eu suscipit urna efficitur
                  quis. Pellentesque habitant morbi tristique senectus et netus
                  et malesuada fames ac turpis egestas. Nulla facilisi. Nunc
                  fringilla nec dolor non vulputate. Nulla auctor risus sed
                  vulputate dictum. Pellentesque pretium diam eu ex mollis, sit
                  amet elementum metus malesuada. Nam bibendum vitae magna a
                  luctus. Vestibulum sit amet imperdiet urna, in egestas mi. Nam
                  quis mauris dui.
                  <br />
                  <br />
                  Sed non tellus sagittis leo venenatis ornare. In hac habitasse
                  platea dictumst. Fusce purus est, fermentum nec justo a,
                  placerat sagittis ante. Mauris nibh lectus, consequat et nibh
                  sit amet, semper semper arcu. Vivamus tempor, neque et
                  tincidunt tincidunt, ante turpis imperdiet ex, sit amet
                  aliquet elit ligula ut justo. Morbi fermentum libero eget
                  nulla euismod, a venenatis dui tincidunt. Curabitur gravida
                  nisl tellus, eget scelerisque leo convallis ac. Cras accumsan
                  cursus massa, vitae scelerisque metus aliquet vitae. Nullam
                  vitae ante id dolor ultricies varius. Sed tempus enim turpis,
                  non scelerisque quam pretium pellentesque. Fusce massa lacus,
                  feugiat id metus sed, interdum semper orci. Nam nibh nunc,
                  tincidunt eu ante sodales, mattis fringilla velit. Donec nec
                  velit laoreet, rutrum odio eget, fermentum velit. Donec
                  iaculis est sit amet tempor finibus. Etiam vehicula elit vitae
                  lorem ornare porta.
                  <br />
                  <br />
                  Praesent luctus dolor a ultrices vestibulum. Pellentesque
                  vestibulum aliquam risus, nec blandit libero dignissim eu.
                  Mauris vitae justo at sem cursus porttitor eu vestibulum dui.
                  Quisque vestibulum efficitur dignissim. Fusce cursus commodo
                  molestie. Aenean nec nulla ultricies, commodo neque a, tempor
                  urna. Donec tempus orci in dui ullamcorper, et ultrices ex
                  faucibus. Integer facilisis varius ex eu sollicitudin. Ut
                  viverra justo sit amet consectetur scelerisque.
                  <br />
                  <br />
                  Sed dignissim arcu nulla, a laoreet dolor tempor et.
                  Pellentesque et libero ullamcorper, cursus sapien sed,
                  pellentesque diam. Nunc vel turpis rutrum sapien pretium
                  feugiat ullamcorper at lectus. Aenean dignissim dignissim
                  malesuada. Sed fermentum libero id massa ultricies, ac
                  tristique diam molestie. Suspendisse at laoreet ante, id
                  lacinia enim. Etiam ultrices lectus tellus, ac viverra metus
                  commodo at. Ut tortor diam, varius vel lorem quis, rutrum
                  fermentum tellus. Pellentesque nunc ante, commodo eu justo
                  eget, bibendum consectetur nulla. Fusce nibh nisi, accumsan
                  eget massa at, pellentesque congue nibh.
                  <br />
                  <br />
                  Quisque sit amet nunc quis risus auctor vulputate nec sed
                  dolor. Vestibulum efficitur, neque eu tincidunt pulvinar,
                  turpis ipsum finibus velit, vel iaculis est nisi non augue.
                  Suspendisse justo arcu, luctus id nibh aliquam, pulvinar
                  dapibus magna. Ut non ultrices lectus. Suspendisse at suscipit
                  massa. Maecenas euismod malesuada elit in sagittis. Nunc
                  pretium fringilla dolor id convallis. Vivamus ac dictum metus.
                  Ut luctus, turpis ut dictum consectetur, purus purus ornare
                  felis, vitae aliquam sem nibh eget velit. Etiam egestas
                  placerat sem sit amet placerat.
                  <br />
                  <br />
                  Fusce ac ex pulvinar, maximus purus sit amet, laoreet tellus.
                  Fusce placerat, erat vel scelerisque ornare, magna nulla
                  blandit felis, vitae viverra risus nisi quis turpis. Donec
                  quis rhoncus nisl. Sed sodales sit amet augue at gravida.
                  Fusce ex dui, consequat sed metus eget, facilisis sagittis
                  ipsum. Sed scelerisque bibendum est, vel egestas erat finibus
                  ac. Praesent ac augue sit amet enim vehicula lacinia. Aenean
                  in augue quis orci convallis bibendum mollis vitae magna.
                  Maecenas egestas ultricies consectetur. Etiam nec nunc
                  elementum, convallis ante hendrerit, maximus elit.
                  <br />
                  <br />
                  Nullam ornare semper imperdiet. Aliquam volutpat tellus id
                  libero imperdiet mattis. Sed quis posuere lectus, eget mollis
                  nisi. Sed laoreet tellus ac nisi ultricies sodales. Fusce
                  nulla risus, feugiat in tortor id, sollicitudin aliquam neque.
                  Nam viverra placerat justo, ac ultricies quam euismod non.
                  Integer accumsan augue magna.
                  <br />
                  <br />
                  Mauris vestibulum eleifend efficitur. Donec in placerat leo.
                  Ut feugiat arcu facilisis arcu imperdiet, et interdum lorem
                  tristique. Curabitur bibendum mattis leo et egestas. Nam
                  eleifend nulla eu est malesuada, quis dignissim lacus cursus.
                  Maecenas accumsan metus et neque lobortis, in condimentum
                  justo volutpat. Fusce tincidunt nibh ac euismod eleifend. Duis
                  sed nibh ac sem dignissim gravida. Aenean pretium congue
                  lobortis. Fusce convallis laoreet turpis id tincidunt. Mauris
                  interdum, tortor sit amet lacinia gravida, nisl nibh fermentum
                  velit, ut fermentum felis dui id lorem. Fusce sagittis libero
                  ut ipsum blandit porttitor. Vestibulum cursus dignissim quam,
                  non facilisis leo dapibus commodo.
                </IonText>
              </IonCardContent>
              <IonFooter>
                <IonList>
                  <IonItem lines="none">
                    <IonLabel>I agree to the terms and conditions</IonLabel>
                    <IonCheckbox
                      slot="end"
                      onIonChange={(event) => onChange(event.detail.checked)}
                    />
                  </IonItem>
                  <IonButton
                    expand="full"
                    disabled={!consented}
                    onClick={uploadScore}
                  >
                    Submit
                  </IonButton>
                </IonList>
              </IonFooter>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ConsentForm;
