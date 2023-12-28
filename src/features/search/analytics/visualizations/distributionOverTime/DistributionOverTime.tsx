import React, { useEffect, useLayoutEffect, useState } from 'react';

import { Select } from 'antd';

import VerticalBarChart from '../../../../../components/visulaizations/charts/BarChart';
import LineChart from '../../../../../components/visulaizations/charts/LineChart';
import {
  CHART_TITLE,
  chart
} from '../../../../../constants/visualizations/visualizations.types';
import visualizationsService from '../../../../../services/visualizations';
import VisualizationsContainer from '../VisualizationsContainer';

const VISUALIZATIONS_OPTIONS = [
  { label: CHART_TITLE.line, value: chart.LINE },
  { label: CHART_TITLE.bar, value: chart.BAR }
];

const DistributionOverTime: React.FC = () => {
  const [currentVisualization, setCurrentVisualization] = useState(
    chart.LINE as string
  );
  const [data, setData] = useState<{ count: number; year: number }[]>([]);

  useLayoutEffect(() => {
    const getData = async () => {
      const graphData: { count: number; year: number }[] =
        await visualizationsService.getPapersCount();

      //TODO: useMemo here
      //TODO: make it more generic
      const dt = () =>
        graphData.map(v => ({ count: Number(v.count), year: v.year }));

      setData(dt);
    };

    getData();
  }, []);

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
      {currentVisualization === chart.LINE ? (
        data.length !== 0 ? (
          <LineChart data={data} />
        ) : null
      ) : data.length !== 0 ? (
        <VerticalBarChart data={data} />
      ) : null}
    </VisualizationsContainer>
  );
};

export default DistributionOverTime;
