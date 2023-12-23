import React, {
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState
} from 'react';

import { ApplicationContext } from '../../../../context/Application.context';

import { VisualizationContainer } from './Visualizations.styles';

type VisualizationsContainerProps = {
  children: ReactNode;
};

const VisualizationsContainer: React.FC<VisualizationsContainerProps> = ({
  children
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { state: applicationState } = useContext(ApplicationContext);
  const { isFiltersCollaped } = applicationState;
  const [dimensions, setDimensions] = useState({ height: 620, width: 920 });

  useLayoutEffect(() => {
    if (chartRef.current) {
      setDimensions({
        width: chartRef.current.clientWidth,
        height: chartRef.current.clientHeight
      });

      console.log(
        'chartRef.current.clientHeight',
        chartRef.current.clientHeight
      );
    }
  }, [isFiltersCollaped]);

  return (
    <VisualizationContainer
      ref={chartRef}
      style={{
        height: `${dimensions.height}px`,
        width: '99.5%',
        position: 'relative'
      }}
    >
      {children}
    </VisualizationContainer>
  );
};

export default VisualizationsContainer;
