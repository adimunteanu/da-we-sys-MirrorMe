import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Menu from '../Menu/Menu';
import { GlobalState } from '../../reducers/rootReducer';
import { useAction } from '../../hooks';
import { Actions } from '../../actions';

const Header: FunctionComponent = () => {
  const location = useLocation();
  const dispatch = useAction();
  const title = useSelector((state: GlobalState) => state.titleReducer.title);

  useEffect(() => {
    dispatch(Actions.changeTitle(location.pathname));
  }, [dispatch, location]);

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
