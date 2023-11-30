import styled from 'styled-components';

import { ChartContainer } from '../.shared/shared.styles';

export const Container = styled(ChartContainer)<{
  lineClipPathId: string;
  pointClipPathId: string;
}>`
  .chart {
    isolation: isolate;

    .serie,
    .dots {
      isolation: isolate;
    }

    .dots {
      isolation: isolate;
      clip-path: ${({ pointClipPathId }) => `url(#${pointClipPathId})`};
    }

    .curve {
      mix-blend-mode: color;
      clip-path: ${({ lineClipPathId }) => `url(#${lineClipPathId})`};
    }
  }
`;
