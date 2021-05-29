import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SummarizedCard from '../../components/SummarizedCard/SummarizedCard';
import { loadFiles, selectData, selectHasData } from './dataSlice';
import EmptyView from './EmptyView';

const OverviewPage = () => {
  const dispatch = useDispatch();
  const hasData = useSelector(selectHasData);
  const relevantData = useSelector(selectData);

  useEffect(() => {
    dispatch(loadFiles());
  }, []);

  return (
    <IonContent className="OverviewPage">
      {!hasData ? (
        <EmptyView />
      ) : (
        <IonGrid>
          <IonRow>
            <IonCol>
              {relevantData.map((companyObject) => {
                return (
                  <SummarizedCard
                    key={companyObject.company}
                    title={companyObject.company}
                  >
                    {companyObject.company}
                  </SummarizedCard>
                );
              })}
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
    </IonContent>
  );
};

export default OverviewPage;
