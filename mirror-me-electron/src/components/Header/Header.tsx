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
import { Provider, useDispatch, useSelector } from 'react-redux';
import Menu from '../Menu/Menu';
import { selectTitle, updateCurrentPage } from '../../store/globalSlice';
import store from '../../store';
import DataUploadModal from '../../pages/OverviewPage/DataUploadModal/DataUploadModal';
import { PAGES } from '../../globals';
import {
  updateCanUpload,
  updateStringifiedData,
} from '../../pages/OverviewPage/dataSlice';

const Header = () => {
  const location = useLocation();
  const title = useSelector(selectTitle);
  const dispatch = useDispatch();

  const dismissDataUploadModal = () => {
    dispatch(updateStringifiedData(''));
    dispatch(updateCanUpload(false));
  };

  const [present, dismiss] = useIonModal(
    <Provider store={store}>
      <DataUploadModal
        onDismiss={() => {
          dismissDataUploadModal();
          dismiss();
        }}
      />
    </Provider>
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
