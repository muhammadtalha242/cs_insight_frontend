import { AUTHORS, Dataset, PAPERS, VENUES } from '../dataset.types';

export enum visualizations {
  DISTRIBUTIONS_OVERTIME = 'distribution_overtime'
}

export enum chart {
  AREA = 'area',
  AREA_STACKED = 'area_stacked',
  LINE = 'line',
  MULTI_LINE = 'multi_line',
  BAR = 'bar'
}

export const VISUALIZATION_TITLE: Record<visualizations, string> = {
  [visualizations.DISTRIBUTIONS_OVERTIME]: 'Distribution Over Time'
} as const;

export const CHART_TITLE: Record<chart, string> = {
  [chart.BAR]: 'Bar Chart',
  [chart.AREA]: 'Area Chart',
  [chart.AREA_STACKED]: 'Stacked Area Chart',
  [chart.LINE]: 'Line Chart',
  [chart.MULTI_LINE]: 'Multi Line Chart'
} as const;

export const VISUALIZATION_BY_DATASET: Record<Dataset, visualizations[]> = {
  [PAPERS]: [visualizations.DISTRIBUTIONS_OVERTIME],
  [AUTHORS]: [visualizations.DISTRIBUTIONS_OVERTIME],
  [VENUES]: [visualizations.DISTRIBUTIONS_OVERTIME]
} as const;
