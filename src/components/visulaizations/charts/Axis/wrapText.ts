import { ArrayLike, BaseType, select, ValueFn } from 'd3-selection';

import { Join, T } from '../.shared/shared.types';

import type { Anchor } from './axis.types';
import { measureWidth } from './measureWidth';

type Line = { width: number; text: string };

function cutoffText(
  line: Line,
  maxWidth: number,
  measure: (s: string) => number,
  isLastLine?: boolean
): [number, Line] {
  let text = line.text,
    width = line.width,
    cutoff = 0;
  const words = line.text.split(/\s+/g),
    breakInside = words.length <= 1 || isLastLine;

  if (breakInside) {
    while (width > maxWidth && text.length > 0) {
      cutoff--;
      text = text.slice(0, -1);
      width = measure(text);
    }
  } else {
    while (width > maxWidth && words.length > 1) {
      const length = words.pop()!.length + 1;

      cutoff -= length;
      text = text.slice(0, -length);
      width = measure(text);
    }
  }

  line.text = text;
  line.width = width;

  return [cutoff, line];
}

export function wrapText<Datum>(
  format: ValueFn<any, Datum, string> = d => '' + d,
  maxWidth: ValueFn<any, Datum, number> | number = 50,
  maxHeight: ValueFn<any, Datum, number> | number = 50,
  anchor: Anchor,
  rotate = 0,
  padding = 0,
  lineHeight = 1.25
) {
  const horizontal = anchor === 'top' || anchor === 'bottom',
    textAnchor =
      ((anchor === 'top' || anchor === 'bottom') && 'middle') ||
      (anchor === 'left' && 'end') ||
      'start',
    k = anchor === 'top' || anchor === 'left' ? -1 : 1,
    dx = (!horizontal && k * padding) || 0,
    dy = (!horizontal && 0.32) || (anchor === 'bottom' && 0.71) || 0;

  const w = typeof maxWidth === 'function' ? maxWidth : () => maxWidth,
    h = typeof maxHeight === 'function' ? maxHeight : () => maxHeight;

  return function (
    this: SVGTextElement,
    d: Datum,
    index: number,
    arr: ArrayLike<SVGTextElement> | SVGTextElement[],
    t?: T<BaseType>
  ) {
    const fontSize = parseFloat(window?.getComputedStyle(this).fontSize),
      fontFamily = window?.getComputedStyle(this).fontFamily,
      lh = lineHeight * fontSize,
      widthMax = w(d, index, arr),
      heightMax = h(d, index, arr),
      maxLines = Math.max(1, Math.floor(heightMax / lh)),
      ddy =
        (dy * fontSize + (horizontal ? padding : 0)) *
        (anchor === 'top' ? -1 : 1);

    const selection = select(this);

    this.textContent = '';

    const content = '' + format(d, index, arr),
      words = content.split(/\s+/g);

    if (!words[words.length - 1]) words.pop();
    if (!words[0]) words.shift();

    let line;
    const lines: Line[] = [],
      measure = (s: string) => measureWidth(s, fontSize, fontFamily),
      ellipsisWidth = measure('…');

    for (let i = 0; i < words.length && lines.length <= maxLines; ++i) {
      const text: string = (line?.text ? line.text + ' ' : '') + words[i];
      const width = measure(text);

      if (!line) {
        line = {
          width,
          text
        };

        lines.push(line);
      }

      line.width = width;
      line.text = text;

      if (width >= widthMax) {
        if (lines.length + 1 > maxLines) {
          [, line] = cutoffText(line, widthMax - ellipsisWidth, measure, true);

          line.text += '…';

          break;
        } else {
          let cutoff = 0;

          [cutoff, line] = cutoffText(line, widthMax, measure);

          if (cutoff) {
            words.splice(i + 1, 0, words[i].slice(cutoff));
            words[i] = line.text;

            lines[lines.length - 1].text = line.text;
            lines[lines.length - 1].width = line.width;

            line = {
              width: 0,
              text: ''
            };
          }

          lines.push(line);
        }
      }
    }

    const offset =
        (!horizontal && (lines.length - 1) / 2) ||
        (anchor === 'top' && lines.length - 1) ||
        0,
      x0 = +selection.attr('x') || 0,
      y0 = +selection.attr('y') || 0,
      x = x0 + dx,
      y = (_: Line, i: number) => y0 + (i - offset) * lh + ddy,
      transform =
        (selection.attr('transform') || '') +
        (rotate ? () => ` rotate(${rotate} 0 0)` : '');

    selection
      .attr('text-anchor', textAnchor)
      .call((j: Join<SVGTextElement, any>) => {
        t && (j = j.transition(t));
        j.attr('transform', transform || null);
      })
      .selectChildren<SVGTSpanElement, Line>('tspan')
      .data(lines)
      .join(
        e =>
          e
            .append('tspan')
            .text(l => l.text)
            .attr('x', x)
            .attr('y', y),
        u => u,
        e => e.remove()
      )
      .call((j: Join<SVGTSpanElement, Line>) => {
        j.text(l => l.text);

        t && (j = j.transition(t));

        j.attr('x', x);
        j.attr('y', y);
      });
  };
}
