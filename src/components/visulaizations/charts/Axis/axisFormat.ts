import type { AxisDomain } from 'd3-axis';
import { format } from 'd3-format';
import type { NumberValue } from 'd3-scale';

import type { AxisFormat } from './axis.types';

export const formatFloat = format('~f');
export const formatIntegerWithGrouping = format(',d');
export const formatIntegerWithoutGrouping = format('d');
export const formatSI = format('~s');

export const formatPositiveInteger = (d: NumberValue) => {
  if (d === 0) return '0';
  if (d < 0) return '';

  if (d >= 1e5) {
    return formatSI(d);
  }

  return formatIntegerWithGrouping(d);
};

export const formatPositiveFloat = (d: NumberValue) => {
  if (d === 0) return '0';
  if (d < 0) return '';

  if (d >= 1e5) {
    return formatSI(d);
  }

  if (d > 1e2) {
    return formatIntegerWithGrouping(d);
  }

  return formatFloat(d);
};

export function formatDefault(d: AxisDomain) {
  return `${d}`;
}

export function computeFormat(
  axisFormat?: AxisFormat<NumberValue>
): (d: NumberValue) => string;
export function computeFormat(
  axisFormat?: AxisFormat<string>
): (d: string) => string;
export function computeFormat<D extends AxisDomain>(
  axisFormat?: any
): (d: D) => string;

export function computeFormat<D extends string | NumberValue>(axisFormat?: D) {
  if (typeof axisFormat === 'function') {
    return axisFormat as (d: D) => string;
  }

  switch (axisFormat) {
    case 'integer':
      return formatIntegerWithGrouping;
    case 'integer-without-grouping':
      return formatIntegerWithoutGrouping;
    case 'positive-integer':
      return formatPositiveInteger;
    case 'float':
      return formatFloat;
    case 'positive-float':
      return formatPositiveFloat;
  }

  return formatDefault as (d: D) => string;
}
