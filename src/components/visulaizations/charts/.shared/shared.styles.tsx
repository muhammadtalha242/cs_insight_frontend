import styled from "styled-components";

// import { FontFamily } from '@/themes';
export const sans = "'Fira Sans', sans-serif" as const;

export const ChartContainer = styled.div`
  position: relative;
  flex: 1 0 auto;
  align-self: stretch;

  min-height: 0;
  min-width: 0;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  svg text {
    font-family: ${sans};
    cursor: default;
    user-select: none;
  }

  path,
  circle,
  ellipse,
  line,
  polygon,
  polyline,
  rect {
    shape-rendering: geometricPrecision;
  }
`;
