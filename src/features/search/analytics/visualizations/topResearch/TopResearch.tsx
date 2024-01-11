import React, { useContext, useLayoutEffect, useState } from 'react';

import { useQuery } from 'react-query';

import VerticalBarChart from '../../../../../components/visulaizations/charts/BarChart';
import { QueryContext } from '../../../../../context/Query.context';
import visualizationsService from '../../../../../services/visualizations';
import VisualizationsContainer from '../VisualizationsContainer';

const TopResearch: React.FC = () => {
  const { state } = useContext(QueryContext);
  const { data, isLoading, error } = useQuery(
    ['myData', state.filters], // Query key is now an array
    visualizationsService.getPapersCount
  );
  let graphData: { count: number; year: number }[] = [];

  if (!isLoading) {
    graphData = data.map((v: { count: number; year: number }) => ({
      count: Number(v.count),
      year: v.year
    }));
  }

  return (
    <VisualizationsContainer isLoading={isLoading} error={error}>
      {graphData.length !== 0 ? <VerticalBarChart data={graphData} /> : null}
    </VisualizationsContainer>
  );
};

export default TopResearch;
