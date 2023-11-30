const two_pi = 2 * Math.PI;
const epsilon = two_pi / 3600;

export function cartesianToRadial(x: number, y: number): [number, number] {
  const alpha = (two_pi - Math.atan2(-y, x)) % two_pi;
  const radius = Math.abs(
    Math.abs((Math.PI - alpha) % Math.PI) > epsilon ? y / Math.sin(alpha) : x
  );

  return [alpha, radius];
}

export function radialToCartesian(
  alpha: number,
  radius: number
): [number, number] {
  const x = radius * Math.cos(alpha);
  const y = radius * Math.sin(alpha);

  return [x, y];
}
