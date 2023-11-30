const format = new Intl.NumberFormat('en-US').format;

// positive numbers
export const num = (v?: number | null, showNegative = false) => {
  if (!v) return '0';

  if (!showNegative && v < 0) return '';

  return format(v);
};

export const numRange = (a: number, b: number) => {
  return `${format(a)}–${format(b)}`;
};
