import { bisectRight } from 'd3-array';
import type { ScaleBand, ScalePoint } from 'd3-scale';

import type { Range, View } from './zoomBandRange.types';

export function padding(scale: ScaleBand<string> | ScalePoint<string>) {
  return {
    paddingInner: 'paddingInner' in scale ? scale.paddingInner() : 0,
    paddingOuter:
      'paddingOuter' in scale ? scale.paddingOuter() : scale.padding()
  };
}

export function domainCount(scale: ScaleBand<string> | ScalePoint<string>) {
  const domain = scale.domain();
  const { paddingInner, paddingOuter } = padding(scale);
  const total = domain.length - paddingInner + 2 * paddingOuter;

  return total;
}

export function scaleSpread(
  scale: ScaleBand<string> | ScalePoint<string>,
  bound: Range,
  minStep: number,
  minCount: number
): Range {
  const size = bound[1] - bound[0];
  const total = domainCount(scale);
  const from = Math.max(0, (minStep * total) / size);
  const to = Math.max(from, total / minCount);

  return [from, to];
}

export function outerStep(scale: ScaleBand<string> | ScalePoint<string>) {
  const step = scale.step();
  const { paddingOuter } = padding(scale);
  const outer = step * paddingOuter;

  return outer;
}

export function innerStep(scale: ScaleBand<string> | ScalePoint<string>) {
  const step = scale.step();
  const { paddingInner } = padding(scale);
  const inner = step * paddingInner;

  return inner;
}

export function inView(
  scale: ScaleBand<string> | ScalePoint<string>,
  bound: Range
): View {
  const bandwidth = scale.bandwidth();
  const inner = innerStep(scale);
  const outer = outerStep(scale);
  const domain = scale.domain();
  const steps = domain.map(scale) as number[];

  const startIndex =
    Math.max(1, bisectRight(steps, bound[0] + bandwidth / 2 + inner)) - 1;
  const endIndex =
    Math.max(startIndex, bisectRight(steps, bound[1] - bandwidth / 2 - inner)) -
    1;

  const includesFirst = startIndex === 0;
  let offset = inner / 2;

  if (includesFirst) {
    if (bandwidth + outer <= bound[1]) {
      offset = outer;
    } else {
      offset = Math.min(offset, outer);
    }
  }

  const startPos = Math.round(
    steps[startIndex] ? steps[startIndex] - offset : bound[0]
  );

  return { startIndex, startPos, endIndex };
}

export function first(scale: ScaleBand<string> | ScalePoint<string>) {
  const step = scale.step();
  const { paddingOuter } = padding(scale);
  const outer = step * paddingOuter;
  const domain = scale.domain();
  const pos = scale(domain[0]) || 0;

  return pos - outer;
}
