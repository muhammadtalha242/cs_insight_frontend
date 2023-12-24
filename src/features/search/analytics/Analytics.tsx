import React, { useContext } from 'react';

import { ApplicationContext } from '../../../context/Application.context';

import { AnalyticsContainer, AnalyticsTabs } from './Analytics.styles';

export const Analytics: React.FC = () => {
  const {
    state: { currentVisualizations }
  } = useContext(ApplicationContext);

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <AnalyticsContainer>
      <AnalyticsTabs items={currentVisualizations} onChange={onChange} />
    </AnalyticsContainer>
  );
};
