import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import SummarizedCard from '../../components/SummarizedCard/SummarizedCard';
import { COMPANIES } from '../../globals';
import { selectData, selectHasData } from './dataSlice';
import EmptyView from './EmptyView';

const OverviewPage = () => {
  const hasData = useSelector(selectHasData);
  const relevantData = useSelector(selectData);
  const isEven = relevantData.length % 2 === 0;

  return (
    <IonContent className="OverviewPage">
      {!hasData ? (
        <EmptyView />
      ) : (
        <IonGrid>
          <IonRow>
            {relevantData.map((companyObject, index) => {
              return (
                <IonCol
                  offset={
                    !isEven && index === relevantData.length - 1 ? '3' : '0'
                  }
                  size="6"
                  key={companyObject.company}
                >
                  <SummarizedCard
                    title={companyObject.company}
                    logo={companyObject.logo}
                  >
                    {
                      Object.values(COMPANIES).find(
                        (company) => company.name === companyObject.company
                      )?.summarized_component
                    }
                  </SummarizedCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      )}
    </IonContent>
  );
};

export default OverviewPage;
