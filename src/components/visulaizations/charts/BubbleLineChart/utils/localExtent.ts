import type { Dimensions, Point, Range } from "../BubbleLineChart.types";

export function localExtent(
  points: Point[],
  target: Dimensions,
  base: Dimensions,
  baseDomain: Range,
): Range {
  if (baseDomain[0] === undefined || baseDomain[1] === undefined) {
    return [undefined, undefined];
  }

  let extent: Range = [undefined, undefined];

  for (const p of points) {
    const b = p[base];
    const v = p[target];

    if (b !== undefined && v !== undefined) {
      if (baseDomain[0] <= b && b <= baseDomain[1]) {
        if (extent[0] === undefined || extent[1] === undefined) {
          extent = [v, v];
        } else if (extent[1] < v) {
          extent[1] = v;
        } else if (v < extent[0]) {
          extent[0] = v;
        }
      }
    }
  }

  return extent;
}
