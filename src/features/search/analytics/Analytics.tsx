import React from 'react';

import type { TabsProps } from 'antd';

import { AnalyticsContainer, AnalyticsTabs } from './Analytics.styles';
import DistributionOverTime from './visualizations/distributionOverTime/DistributionOverTime';

export type ColorMap = Record<string, string>;

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
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <AnalyticsContainer>
      <AnalyticsTabs
        defaultActiveKey="line-chart"
        items={visualizationsAll}
        onChange={onChange}
      />
    </AnalyticsContainer>
  );
};
