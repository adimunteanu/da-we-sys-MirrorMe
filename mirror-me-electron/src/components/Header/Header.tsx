import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../Menu/Menu';
import { changeTitle } from './HeaderSlice';
import { GlobalState } from '../../types';

const Header: FunctionComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const title = useSelector((state: GlobalState) => state.header.title);

  useEffect(() => {
    dispatch(changeTitle(location.pathname));
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
