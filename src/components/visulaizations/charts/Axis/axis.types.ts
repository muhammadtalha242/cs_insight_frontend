import type { AxisDomain } from 'd3-axis';
import type {
  NumberValue,
  ScaleBand,
  ScaleContinuousNumeric,
  ScalePoint
} from 'd3-scale';

export type Anchor = 'left' | 'bottom' | 'right' | 'top';

export type AxisConfig<Domain> = {
  anchor: Anchor;
  domainColor?: string;
  fontFamily: string;
  fontSize: number | string;
  fontWeight: number | string;
  format?: AxisFormat<Domain>;
  innerGrid?: boolean;
  labelColor?: string | ((d: string) => string);
  labelMaxDimension: number;
  labelRotation?: number;
  tickColor?: string;
  tickCount: number;
  tickDistanceMin: number;
  tickEveryInteger?: boolean;
  tickPadding: number;
  tickSizeInner: number;
  tickSizeOuter: number;
};

export type AxisFormat<D> = D extends NumberValue
  ?
      | 'float'
      | 'integer'
      | 'integer-without-grouping'
      | 'positive-integer'
      | 'positive-float'
      | ((d: number) => string)
      | ((d: number | undefined) => string)
  : D extends string
  ? 'string' | ((d: D) => string)
  : never;

export type AxisScale<Domain extends AxisDomain> = Domain extends string
  ? ScaleBand<Domain> | ScalePoint<Domain>
  : ScaleContinuousNumeric<number, number, number>;
