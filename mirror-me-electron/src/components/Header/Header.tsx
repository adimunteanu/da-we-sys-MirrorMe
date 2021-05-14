import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { FunctionComponent } from 'react';
import Menu from '../Menu/Menu';

interface Props {
  title: string;
}

const Header: FunctionComponent<Props> = (props: Props) => {
  const { title } = props;

  return (
    <div>
      <Menu />
      <IonHeader id="main-content">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </div>
  );
};

export default Header;
