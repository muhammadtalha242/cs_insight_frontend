import { ValueFn } from 'd3-selection';

export type Point = {
  x: number;
  y: number | undefined;
  r: number | undefined;
};

export type LineData = {
  points: Point[];
};

export type Range = [number, number] | [undefined, undefined];
export type Dimensions = 'x' | 'y' | 'r';

export type LayoutConfig = {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  label: {
    padding: number;
  };
};

export type CircleStyleConfig = {
  fillOpacity: number;
  strokeOpacity: number;
  strokeWidth: number;
};

export type LineStyleConfig = {
  strokeOpacity: number;
  strokeWidth: number;
};

export type TextStyleConfig = {
  fill: string | ValueFn<any, Point, string>;
  fillOpacity: number;
};

export type LabelStyleConfig = {
  fontSize: string | number;
  fontWeight: string | number;
  fontFamily: string;
};

export type Status = 'default' | 'active' | 'inactive';
export type PointStatus = Status | 'hovered';

export type StyleConfig = {
  circle: Record<PointStatus, CircleStyleConfig>;
  line: Record<Status, LineStyleConfig>;
  text: Record<PointStatus, TextStyleConfig>;
  labels: LabelStyleConfig;
};

export type Handler = {
  hover?: (event: MouseEvent, d?: Point | LineData) => void;
  click?: (event: MouseEvent, d?: Point | LineData) => void;
};

export type Formatter = (d: Point) => string;

export type CurveType =
  | 'monotone'
  | 'linear'
  | 'basis'
  | 'step'
  | 'step-after'
  | 'step-before'
  | 'natural';
