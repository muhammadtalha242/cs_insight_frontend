import { LineData, Point } from "./BubbleLineChart.types";

export function isPoint(d: Point | LineData): d is Point {
  return !("points" in d);
}

export function isLine(d: Point | LineData): d is LineData {
  return "points" in d;
}
