import {
  IonButtons,
  IonHeader,
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
import IconButton from '../Buttons/IconButton/IconButton';

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
  }, [location, dispatch]);

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
              <IconButton
                onClick={() => present({ cssClass: 'DataUploadModal' })}
                size="large"
                icon={add}
              />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
    </div>
  );
};

export default Header;
