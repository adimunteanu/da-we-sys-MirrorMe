import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import React, { FunctionComponent, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Menu from '../Menu/Menu';
import { selectTitle, updateCurrentPage } from '../../store/globalSlice';
import { RootState } from '../../store';

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
        </IonToolbar>
      </IonHeader>
    </div>
  );
};

export default connector(Header);
