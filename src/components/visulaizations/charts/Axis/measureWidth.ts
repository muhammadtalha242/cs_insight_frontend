const context = document.createElement('canvas').getContext('2d');

export function measureWidth(
  text: string,
  fontSize: number,
  fontFamily: string
) {
  context!.font = `${fontSize}px ${fontFamily}`;

  return context!.measureText(text).width;
}
