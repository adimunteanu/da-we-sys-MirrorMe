import {
  IonCard,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonModal,
  IonText,
  IonTitle,
} from '@ionic/react';
import React, { useState } from 'react';

const DataUploadModal = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <IonModal isOpen={showModal}>
      <IonHeader>
        <IonTitle>Data Upload</IonTitle>
      </IonHeader>
      <IonContent>
        <IonText>Please drag and drop your data below:</IonText>
      </IonContent>
    </IonModal>
  );
};

export default DataUploadModal;
