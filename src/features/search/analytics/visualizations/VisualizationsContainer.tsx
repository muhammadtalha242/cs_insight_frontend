import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

import { ApplicationContext } from '../../../../context/Application.context';

import { VisualizationContainer } from './Visualizations.styles';

type VisualizationsContainerProps = {
  children: ReactNode;
  isLoading?: boolean;
  error?: unknown;
};

const VisualizationsContainer: React.FC<VisualizationsContainerProps> = ({
  children,
  isLoading,
  error
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
  if (isLoading) return <div>LOADING...</div>;
  if (error) return <div>ERROR</div>;

  return (
    <VisualizationContainer ref={chartRef} height={dimensions.height}>
      {children}
    </VisualizationContainer>
  );
};

export default VisualizationsContainer;
