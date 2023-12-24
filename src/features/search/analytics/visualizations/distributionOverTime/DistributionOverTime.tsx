import React, { useState } from 'react';

import { Select } from 'antd';

import VerticalBarChart from '../../../../../components/visulaizations/charts/BarChart';
import LineChart from '../../../../../components/visulaizations/charts/LineChart';
import {
  CHART_TITLE,
  chart
} from '../../../../../constants/visualizations/visualizations.types';
import VisualizationsContainer from '../VisualizationsContainer';

const VISUALIZATIONS_OPTIONS = [
  { label: CHART_TITLE.line, value: chart.LINE },
  { label: CHART_TITLE.bar, value: chart.BAR }
];

const DistributionOverTime: React.FC = () => {
  const [currentVisualization, setCurrentVisualization] = useState(
    chart.LINE as string
  );

  const onSelectHandle = (value: string) => {
    console.log('value', value);

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
      {currentVisualization === chart.LINE ? (
        <LineChart />
      ) : (
        <VerticalBarChart />
      )}
    </VisualizationsContainer>
  );
};

export default DistributionOverTime;
