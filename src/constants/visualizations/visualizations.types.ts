import { ReactElement, ReactNode } from 'react';

export enum visualization {
  DISTRIBUTIONS_OVERTIME = 'distribution_overtime',
  TOP_RESEARCH = 'top_research'
}

export enum chart {
  AREA = 'area',
  AREA_STACKED = 'area_stacked',
  LINE = 'line',
  MULTI_LINE = 'multi_line',
  BAR = 'bar'
}

export const VISUALIZATION_TITLE: Record<visualization, string> = {
  [visualization.DISTRIBUTIONS_OVERTIME]: 'Distribution Over Time',
  [visualization.TOP_RESEARCH]: 'Top Research'
} as const;

export const CHART_TITLE: Record<chart, string> = {
  [chart.BAR]: 'Bar Chart',
  [chart.AREA]: 'Area Chart',
  [chart.AREA_STACKED]: 'Stacked Area Chart',
  [chart.LINE]: 'Line Chart',
  [chart.MULTI_LINE]: 'Multi Line Chart'
} as const;

export type Tab = {
  key: string;
  label: string;
  forceRender?: boolean;
  destroyInactiveTabPane?: boolean;
  children?: ReactNode | ReactElement;
};
