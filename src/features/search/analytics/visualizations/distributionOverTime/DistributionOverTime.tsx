import React, { useContext, useState } from 'react';

import { Select } from 'antd';
import { useQuery } from 'react-query';

import VerticalBarChart from '../../../../../components/visulaizations/charts/BarChart';
import LineChart from '../../../../../components/visulaizations/charts/LineChart';
import {
  CHART_TITLE,
  chart
} from '../../../../../constants/visualizations/visualizations.types';
import { QueryContext } from '../../../../../context/Query.context';
import visualizationsService from '../../../../../services/visualizations';
import VisualizationsContainer from '../VisualizationsContainer';

const VISUALIZATIONS_OPTIONS = [
  { label: 'Publication Year', value: chart.LINE },
  { label: 'Total Citations', value: chart.BAR }
];

const DistributionOverTime: React.FC = () => {
  const { state } = useContext(QueryContext);
  const { data, isLoading, error } = useQuery(
    ['myData', state.filters], // Query key is now an array
    visualizationsService.getPapersCount
  );

  const [currentVisualization, setCurrentVisualization] = useState(
    chart.LINE as string
  );

  const onSelectHandle = (value: string) => {
    setCurrentVisualization(value);
  };

  let graphData: { count: number; year: number }[] = [];

  if (!isLoading) {
    const key =
      currentVisualization === chart.LINE ? 'count' : 'totalCitations';

    graphData = data.map(
      (v: { count: number; totalCitations: number; year: number }) => {
        return {
          count: Number(v[key]),
          year: v.year
        };
      }
    );
  }

  return (
    <VisualizationsContainer isLoading={isLoading} error={error}>
      <div
        style={{
          textAlign: 'start',
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
        graphData.length !== 0 ? (
          <LineChart data={graphData} />
        ) : null
      ) : graphData.length !== 0 ? (
        <VerticalBarChart data={graphData} />
      ) : null}
    </VisualizationsContainer>
  );
};

export default DistributionOverTime;
