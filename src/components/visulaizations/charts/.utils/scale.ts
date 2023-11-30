import {
  InterpolatorFactory,
  ScaleContinuousNumeric,
  scaleLinear,
  scalePow
} from 'd3-scale';

import { isBandOrPointScale, isBandScale } from './scale.typeguard';
import type { BandConfig, NumericScaleType, Scale } from './scale.types';
import scaleSymlog from './symlog';

export interface ScaleNumeric<Range, Output, Unknown>
  extends ScaleContinuousNumeric<Range, Output, Unknown> {
  unknown<NewUnknown>(
    value: NewUnknown
  ): ScaleNumeric<Range, Output, NewUnknown>;
  interpolate<NewOutput>(
    interpolate: InterpolatorFactory<Range, NewOutput>
  ): ScaleNumeric<Range, NewOutput, Unknown>;
}

export function numericScale(
  type: NumericScaleType,
  domain: readonly number[],
  range: readonly string[]
): ScaleNumeric<string, string, unknown>;
export function numericScale(
  type: NumericScaleType,
  domain: readonly number[],
  range: readonly number[]
): ScaleNumeric<number, number, unknown>;

export function numericScale<Range extends string | number, Unknown = unknown>(
  type: NumericScaleType,
  domain: readonly number[],
  range: readonly Range[]
) {
  let scale: ScaleNumeric<Range, Range, Unknown> = scaleLinear();

  if (type.startsWith('pow')) {
    const exponent = +(type.replace('pow', '') || '2');

    scale = scalePow<Range, Range, Unknown>().exponent(exponent);
  } else if (type.startsWith('log')) {
    const base = +(type.replace('log', '') || Math.E);

    scale = scaleSymlog().base(base);
  }

  return scale.domain(domain).nice().range(range);
}

export function applyBandConfig(scale: Scale<any>, band: BandConfig) {
  if (isBandOrPointScale(scale)) {
    if (isBandScale(scale)) {
      scale
        .paddingOuter(band.paddingOuter)
        .paddingInner(band.paddingInner)
        .align(band.align);
    } else {
      scale.padding(band.paddingOuter).align(band.align);
    }
  }

  return scale;
}
