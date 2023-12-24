import styled from 'styled-components';

export const VisualizationContainer = styled.div<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
`;
