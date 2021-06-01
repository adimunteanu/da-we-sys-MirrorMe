import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close } from 'ionicons/icons';
import { FunctionComponent } from 'react-router/node_modules/@types/react';
import IconButton from '../../../components/Buttons/IconButton/IconButton';
import { saveTextToFile } from '../../../components/DataDropzone';
import DataDropzone from '../../../components/DataDropzone/DataDropzone';
import { COMPANIES } from '../../../globals';
import {
  loadFiles,
  selectCanUpload,
  selectStringifiedData,
} from '../dataSlice';
import './DataUploadModal.scss';

interface Props {
  onDismiss: () => void;
}

const DataUploadModal: FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [selectedCompany, setSelectedCompany] = useState<string>('Reddit');
  const canUpload = useSelector(selectCanUpload);
  const stringifiedData = useSelector(selectStringifiedData);
  const { onDismiss } = props;

  const handleUpload = () => {
    const fileName = Object.values(COMPANIES).find(
      (company) => company.name === selectedCompany
    )?.save_file;
    if (fileName) {
      saveTextToFile(fileName, stringifiedData);
    }
    dispatch(loadFiles());
    onDismiss();
  };

  return (
    <div>
      <IonCard className="DataUploadModal__Card">
        <IonCardHeader className="DataUploadModal__Header">
          <IonHeader>
            <IonToolbar>
              <IonCardTitle>Data Upload</IonCardTitle>
              <IconButton
                className="DataUploadModal__Header-Button"
                onClick={() => onDismiss()}
                size="large"
                slot="end"
                icon={close}
              />
            </IonToolbar>
          </IonHeader>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <IonItem lines="none" className="DataUploadModal__Ion-Item">
              <IonLabel>Selected company:</IonLabel>
              <IonSelect
                onIonChange={(element) =>
                  setSelectedCompany(element.detail.value)
                }
                value={selectedCompany}
              >
                {Object.values(COMPANIES).map((company) => {
                  return (
                    <IonSelectOption value={company.name} key={company.name}>
                      {company.name}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
            <IonText>Please drag and drop your data below:</IonText>
          </IonList>
          <DataDropzone selectedCompany={selectedCompany} />
          <IonList className="DataUploadModal__Item">
            <IonButton onClick={() => handleUpload()} disabled={!canUpload}>
              Upload
            </IonButton>
          </IonList>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default DataUploadModal;
