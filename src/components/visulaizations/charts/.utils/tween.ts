import { cartesianToRadial, radialToCartesian } from './radial';

const two_pi = 2 * Math.PI;
const epsilon = two_pi / 3600;
const m = [0, 0];

export type Point = [number, number];
export type Interpolator = (t: number) => number;
export type PointInterpolator = (t: number) => Point;
export type PointsInterpolator = (t: number) => Point[];

/**
 * Simple point tween. Arrays are filled if length are not matching
 * @param p0 The array of points to tween from
 * @param p1 The array of points to tween to
 * @param tween interpolation generator
 * @returns The interpolator function
 */
export function pointsTween(
  p0: Point[],
  p1: Point[],
  tween = pointTween
): PointsInterpolator {
  const max = Math.max(p0.length, p1.length);
  const min = Math.min(p0.length, p1.length) - 1;

  const interpolators: PointInterpolator[] = new Array(max);

  for (let i = 0; i < max; i++) {
    interpolators[i] = tween(p0[i] || p0[min] || m, p1[i] || p1[min] || m);
  }

  return (t: number) => interpolators.map(i => i(t));
}

export function pointTween(a: Point, b: Point): PointInterpolator {
  const x = numberTween(a[0], b[0]);
  const y = numberTween(a[1], b[1]);

  return (t: number) => [x(t), y(t)];
}

export function pointTweenRadial(a: Point, b: Point): PointInterpolator {
  const u = cartesianToRadial(a[0], a[1]);
  const v = cartesianToRadial(b[0], b[1]);

  // interpolate only radius, if point is at centroid
  if (!(u[0] || u[1])) u[0] = v[0];
  else if (!(v[0] || v[1])) v[0] = u[0];

  const angle = angleTween(u[0], v[0]);
  const number = numberTween(u[1], v[1]);

  return (t: number) => radialToCartesian(angle(t), number(t));
}

export function numberTween(a: number, b: number): Interpolator {
  return (t: number) => a * (1 - t) + b * t;
}

export function angleTween(a: number, b: number): Interpolator {
  let d = a - b;

  if (Math.abs(d) > epsilon) {
    if (d < -Math.PI) {
      d += two_pi;
    } else if (d > Math.PI) {
      d -= two_pi;
    }

    return (t: number) => a - t * d;
  }

  if (isNaN(b)) {
    if (isNaN(a)) {
      return () => 0;
    }

    return () => a;
  }

  return () => b;
}
