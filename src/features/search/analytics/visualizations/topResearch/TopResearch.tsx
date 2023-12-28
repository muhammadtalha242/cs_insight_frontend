import React, { useLayoutEffect, useState } from 'react';

import VerticalBarChart from '../../../../../components/visulaizations/charts/BarChart';
import visualizationsService from '../../../../../services/visualizations';
import VisualizationsContainer from '../VisualizationsContainer';

const TopResearch: React.FC = () => {
  const [data, setData] = useState<{ count: number; year: number }[]>([]);

  useLayoutEffect(() => {
    const getData = async () => {
      const graphData: { count: number; year: number }[] =
        await visualizationsService.getPapersCount();

      //TODO: useMemo
      const dt = () =>
        graphData.map(v => ({ count: Number(v.count), year: v.year }));

      setData(dt);
    };

    getData();
  }, []);

  return (
    <VisualizationsContainer>
      {data.length !== 0 ? <VerticalBarChart data={data} /> : null}
    </VisualizationsContainer>
  );
};

export default TopResearch;
