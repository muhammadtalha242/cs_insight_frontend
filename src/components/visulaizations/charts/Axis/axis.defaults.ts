import type { AxisDomain } from 'd3-axis';


import type { AxisConfig } from './axis.types';
import { medium, normal, sans } from '../.shared/Svg';

export const defaultConfig: AxisConfig<AxisDomain> = {
  anchor: 'left',
  domainColor: '',
  fontFamily: sans,
  fontSize: medium,
  fontWeight: normal,
  format: 'string',
  innerGrid: true,
  labelColor: '',
  labelMaxDimension: 64,
  labelRotation: 0,
  tickColor: '',
  tickCount: 10,
  tickDistanceMin: 64,
  tickEveryInteger: false,
  tickPadding: 4,
  tickSizeInner: 6,
  tickSizeOuter: 6
};
