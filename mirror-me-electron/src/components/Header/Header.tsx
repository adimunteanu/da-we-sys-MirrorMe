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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../Menu/Menu';
import { selectTitle, updateCurrentPage } from '../../store/globalSlice';
import { RootState } from '../../store';
import DataUploadModal from '../../pages/OverviewPage/DataUploadModal/DataUploadModal';
import { PAGES } from '../../globals';

const Header = () => {
  const location = useLocation();
  const title = useSelector((state: RootState) => selectTitle(state.global));
  const dispatch = useDispatch();
  const [present, dismiss] = useIonModal(
    <DataUploadModal onDismiss={() => dismiss()} />
  );

  useEffect(() => {
    dispatch(updateCurrentPage(location.pathname));
  }, [updateCurrentPage, location]);

  return (
    <div>
      <Menu />
      <IonHeader id="main-content">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          {title === PAGES.OVERVIEW.title && (
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
