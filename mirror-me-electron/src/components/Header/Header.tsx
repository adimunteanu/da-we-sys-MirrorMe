import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonModal,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../Menu/Menu';
import { changeTitle } from './HeaderSlice';
import { GlobalState } from '../../types';
import DataUploadModal from '../../pages/OverviewPage/DataUploadModal/DataUploadModal';

const Header: FunctionComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const title = useSelector((state: GlobalState) => state.header.title);
  const [present, dismiss] = useIonModal(
    <DataUploadModal onDismiss={() => dismiss()} />
  );
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
          {title === 'Data Overview' && (
            <IonButtons slot="end">
              <IonButton
                fill="clear"
                onClick={() => present({ cssClass: 'DataUploadModal' })}
                className="Header-Button"
              >
                <IonIcon size="large" icon={add} slot="icon-only" />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
    </div>
  );
};

export default Header;
