import React, { useState } from 'react';

import { Select } from 'antd';

import VerticalBarChart from '../../../../../components/visulaizations/charts/BarChart';
import LineChart from '../../../../../components/visulaizations/charts/LineChart';
import VisualizationsContainer from '../VisualizationsContainer';

const VISUALIZATIONS_OPTIONS = [
  { label: 'Line Chart', value: 'line-chart' },
  { label: 'Bar Chart', value: 'bar-chart' }
];

const DistributionOverTime: React.FC = () => {
  const [currentVisualization, setCurrentVisualization] =
    useState('line-chart');

  const onSelectHandle = (value: string) => {
    setCurrentVisualization(value);
  };

  return (
    <VisualizationsContainer>
      <div
        style={{
          textAlign: 'end',
          marginBottom: '16px',
          paddingRight: '20px'
        }}
      >
        <Select
          options={VISUALIZATIONS_OPTIONS}
          onChange={onSelectHandle}
          defaultActiveFirstOption
          defaultValue={VISUALIZATIONS_OPTIONS[0].value}
        />
      </div>
      {currentVisualization === 'line-chart' ? (
        <LineChart />
      ) : (
        <VerticalBarChart />
      )}
    </VisualizationsContainer>
  );
};

export default DistributionOverTime;
