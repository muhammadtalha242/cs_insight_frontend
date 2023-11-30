import type { ScaleBand, ScaleContinuousNumeric, ScalePoint } from 'd3-scale';

export type Scale<X> = X extends string
  ? ScaleBand<X> | ScalePoint<X>
  : X extends number
  ? ScaleContinuousNumeric<number, number, number>
  : never;

export type NumericScaleType =
  | 'linear'
  | `pow${number | ''}`
  | `log${number | ''}`;

export type BandConfig = {
  paddingInner: number;
  paddingOuter: number;
  align: number;
};
