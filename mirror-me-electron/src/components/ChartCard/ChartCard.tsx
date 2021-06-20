import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonToolbar,
  useIonModal,
} from '@ionic/react';
import React from 'react';
import { close, resizeOutline } from 'ionicons/icons';
import { ChartCardProps } from '../../types';
import IconButton from '../Buttons/IconButton/IconButton';

const ChartCard = ({
  title,
  chart,
  isFullscreen = false,
  onDismiss = () => {},
}: ChartCardProps) => {
  const [present, dismiss] = useIonModal(
    <ChartCard
      title={title}
      chart={chart}
      isFullscreen
      onDismiss={() => dismiss()}
    />
  );

  return (
    <div>
      <IonCard>
        <IonCardHeader>
          <IonToolbar>
            <IonCardTitle>{title}</IonCardTitle>
            {isFullscreen ? (
              <IconButton
                onClick={() => onDismiss()}
                size="large"
                slot="end"
                icon={close}
              />
            ) : (
              <IconButton
                onClick={() => present({ cssClass: 'ChartCardModal' })}
                size="large"
                slot="end"
                icon={resizeOutline}
              />
            )}
          </IonToolbar>
        </IonCardHeader>
        <IonCardContent className={`${isFullscreen ? 'ContentScroll' : ''}`}>
          {chart}
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default ChartCard;
