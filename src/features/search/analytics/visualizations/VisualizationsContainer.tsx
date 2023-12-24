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

  //TODO: Get dimensions of the screen of first render, make this dynamic
  const [dimensions, setDimensions] = useState({ height: 710, width: 920 });
  const { isFiltersCollaped } = applicationState;

  // useLayoutEffect(() => {
  //   if (chartRef.current) {
  //     setDimensions({
  //       width: chartRef.current.clientWidth,
  //       height: chartRef.current.clientHeight,
  //     });

  //     console.log(
  //       'chartRef.current.clientHeight',
  //       chartRef.current.clientHeight
  //     );
  //   }
  // }, [isFiltersCollaped]);

  return (
    <VisualizationContainer ref={chartRef} height={dimensions.height}>
      {children}
    </VisualizationContainer>
  );
};

export default VisualizationsContainer;
