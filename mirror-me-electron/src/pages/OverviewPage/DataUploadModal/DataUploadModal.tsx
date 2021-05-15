import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonHeader,
  IonIcon,
  IonList,
  IonText,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { FunctionComponent } from 'react-router/node_modules/@types/react';
import DataDropzone from '../../../components/DataDropzone/DataDropzone';
import './DataUploadModal.scss';

interface Props {
  onDismiss: () => void;
}

const DataUploadModal: FunctionComponent<Props> = (props: Props) => {
  const { onDismiss } = props;

  const handleUpload = () => {
    console.log('files uploaded');
  };

  return (
    <div>
      <IonCard className="DataUploadModal__Card">
        <IonCardHeader className="DataUploadModal__Header">
          <IonHeader>
            <IonToolbar>
              <IonCardTitle>Data Upload</IonCardTitle>
              <IonButton
                className="DataUploadModal__Header-Button"
                fill="clear"
                slot="end"
                onClick={() => onDismiss()}
              >
                <IonIcon size="large" name="close" />
              </IonButton>
            </IonToolbar>
          </IonHeader>
        </IonCardHeader>
        <IonCardContent>
          <IonText>Please drag and drop your data below:</IonText>
          <DataDropzone />
          <IonList className="DataUploadModal__Item">
            <IonButton onClick={() => handleUpload()}>Upload</IonButton>
          </IonList>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default DataUploadModal;
