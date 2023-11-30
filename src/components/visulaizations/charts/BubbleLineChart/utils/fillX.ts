import type { LineData, Point, Range } from '../BubbleLineChart.types';

export function fillX(lineData: LineData, domain: Range): LineData {
  const id = lineData.id;
  const map: Record<string, Point> = {};

  for (const d of lineData.points) {
    map[d.x] = d;
  }

  const start = domain[0] || 0;
  const end = domain[1] || 0;
  const length = end - start + 1;
  const points = new Array(length);

  for (let i = 0, x = start; i < length; i++, x++) {
    points[i] = map[`${x}`] || {
      id,
      x,
      y: undefined,
      r: undefined
    };
  }

  return { id, points };
}
