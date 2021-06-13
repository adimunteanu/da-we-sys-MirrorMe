import { IonContent } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectHasData } from '../OverviewPage/dataSlice';
import EmptyView from './EmptyView';

const ScoreboardPage = () => {
  const hasData = useSelector(selectHasData);

  return <IonContent>{!hasData ? <EmptyView /> : <div> </div>}</IonContent>;
};

export default ScoreboardPage;
