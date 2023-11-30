import { type D3ZoomEvent } from 'd3-zoom';

export type ZoomEvent = D3ZoomEvent<Element, unknown>;
export type Extent = [[number, number], [number, number]];
export type Range = [number, number];
/**
 * like "object-fit" in css
 * https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
 * */

export type Fit = 'contain' | 'cover' | 'fill';

export type View = {
  startIndex: number;
  startPos: number;
  endIndex: number;
};
