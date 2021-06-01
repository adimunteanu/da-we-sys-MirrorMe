import { IonButton, IonIcon, IonText } from '@ionic/react';
import React from 'react';

interface Props {
  onClick: () => void;
  slot?: string | undefined;
  className?: string;
  size?: string | undefined;
  icon: string;
  label?: string;
}

const IconButton = ({ onClick, slot, className, size, icon, label }: Props) => {
  return (
    <IonButton
      className={className}
      fill="clear"
      slot={slot}
      onClick={() => onClick()}
    >
      {label && <IonText>{label}</IonText>}
      <IonIcon size={size} icon={icon} />
    </IonButton>
  );
};

export default IconButton;
