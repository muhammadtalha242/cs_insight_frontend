import React, { useContext, useEffect, useState } from 'react';

import type { TabsProps } from 'antd';

import { PAPERS } from '../../../constants/dataset.types';
import { ApplicationContext } from '../../../context/Application.context';

import { AnalyticsContainer, AnalyticsTabs } from './Analytics.styles';
import DistributionOverTime from './visualizations/distributionOverTime/DistributionOverTime';

const visualizationsAll: TabsProps['items'] = [
  {
    key: 'line-chart',
    label: 'Distribution of Papers',
    forceRender: true,
    destroyInactiveTabPane: true,
    children: <DistributionOverTime />
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3'
  }
];
// const visualizationsSelected: TabsProps["items"] = [];

export const Analytics: React.FC = () => {
  const { state: applicationState } = useContext(ApplicationContext);

  const [visualizationsDisplayed, setVisualizationsDisplayed] = useState<
    TabsProps['items']
  >([]);

  useEffect(() => {
    switch (applicationState.dataSet) {
      case PAPERS:
        return setVisualizationsDisplayed(visualizationsAll);
      default:
        return setVisualizationsDisplayed([]);
    }
  }, [applicationState.dataSet]);

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <AnalyticsContainer>
      <AnalyticsTabs items={visualizationsDisplayed} onChange={onChange} />
    </AnalyticsContainer>
  );
};
