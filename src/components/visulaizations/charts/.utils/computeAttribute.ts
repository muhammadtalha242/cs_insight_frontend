export function computeAttribute<This, Datum>(
  this: This,
  s: string | number | ((this: This, d: Datum, i?: number) => string | number),
  d: Datum,
  i?: number
): string | number {
  return typeof s === 'function' ? s.call(this, d, i) : s;
}
