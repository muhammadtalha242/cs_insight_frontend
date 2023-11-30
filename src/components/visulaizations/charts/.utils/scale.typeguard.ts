import type { ScaleBand, ScaleContinuousNumeric, ScalePoint } from 'd3-scale';

import type { Scale } from './scale.types';

export function isBandScale(
  scale: Scale<string | number> | undefined
): scale is ScaleBand<string> {
  return !!scale && 'bandwidth' in scale && 'paddingInner' in scale;
}

export function isPointScale(
  scale: Scale<string | number> | undefined
): scale is ScalePoint<string> {
  return !!scale && 'bandwidth' in scale && 'padding' in scale;
}

export function isBandOrPointScale<X extends string = string>(
  scale:
    | ScaleBand<X>
    | ScalePoint<X>
    | ScaleContinuousNumeric<number, number, any>
    | undefined
): scale is ScaleBand<X> | ScalePoint<X> {
  return !!scale && 'bandwidth' in scale;
}
