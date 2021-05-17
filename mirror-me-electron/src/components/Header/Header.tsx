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
import { connect, ConnectedProps } from 'react-redux';
import Menu from '../Menu/Menu';
import { selectTitle, updateCurrentPage } from '../../store/globalSlice';
import { RootState } from '../../store';
import DataUploadModal from '../../pages/OverviewPage/DataUploadModal/DataUploadModal';

const mapStateToProps = (state: RootState) => ({
  title: selectTitle(state.global),
});

const mapDispatchToProps = {
  updateCurrentPage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Header: FunctionComponent<Props> = (props: Props) => {
  const location = useLocation();
  const { title, updateCurrentPage } = props;
  const [present, dismiss] = useIonModal(
    <DataUploadModal onDismiss={() => dismiss()} />
  );

  useEffect(() => {
    updateCurrentPage(location.pathname);
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

export default connector(Header);
