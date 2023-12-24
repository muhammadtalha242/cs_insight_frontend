import React, { useContext, useEffect, useState } from 'react';

import type { TabsProps } from 'antd';

import {
  AUTHORS,
  Dataset,
  PAPERS,
  VENUES
} from '../../../constants/dataset.types';
import {
  Tab,
  VISUALIZATION_TITLE,
  visualization
} from '../../../constants/visualizations/visualizations.types';
import { ApplicationContext } from '../../../context/Application.context';

import { AnalyticsContainer, AnalyticsTabs } from './Analytics.styles';
import DistributionOverTime from './visualizations/distributionOverTime/DistributionOverTime';
import TopResearch from './visualizations/topResearch/TopResearch';

export const VISUALIZATION_TAB: Record<visualization, Tab> = {
  [visualization.DISTRIBUTIONS_OVERTIME]: {
    key: visualization.DISTRIBUTIONS_OVERTIME,
    label: VISUALIZATION_TITLE.distribution_overtime,
    forceRender: true,
    destroyInactiveTabPane: true,
    children: <DistributionOverTime />
  },
  [visualization.TOP_RESEARCH]: {
    key: visualization.TOP_RESEARCH,
    label: VISUALIZATION_TITLE.top_research,
    forceRender: true,
    destroyInactiveTabPane: true,
    children: <TopResearch />
  }
};

export const VISUALIZATION_BY_DATASET: Record<Dataset, Tab[]> = {
  [PAPERS]: [
    VISUALIZATION_TAB[visualization.DISTRIBUTIONS_OVERTIME],
    VISUALIZATION_TAB[visualization.TOP_RESEARCH]
  ],
  [VENUES]: [VISUALIZATION_TAB[visualization.DISTRIBUTIONS_OVERTIME]],
  [AUTHORS]: [VISUALIZATION_TAB[visualization.DISTRIBUTIONS_OVERTIME]]
};

export const Analytics: React.FC = () => {
  const { state: applicationState } = useContext(ApplicationContext);

  const [visualizationsDisplayed, setVisualizationsDisplayed] = useState<
    TabsProps['items']
  >([]);

  useEffect(() => {
    setVisualizationsDisplayed(
      VISUALIZATION_BY_DATASET[applicationState.dataSet]
    );
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
