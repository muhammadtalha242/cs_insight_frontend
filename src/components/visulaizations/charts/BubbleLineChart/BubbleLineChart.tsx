import React, { useEffect, useMemo, useRef } from "react";
import useComponentSize from "@rehooks/component-size";
import * as d3 from "d3";

type DataPoint = {
  x: number;
  y: number;
};

export interface BubbleLineChartProps {
  data: DataPoint[];
}

type Range = [number, number];

export const BubbleLineChart: React.FC<BubbleLineChartProps> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  let { width, height } = useComponentSize(chartRef);
  console.log("width, height", width, height);

  const extentX = useMemo<Range>(
    () => d3.extent(data, (d) => d.x) as [number, number],
    [data]
  );
  const maxY = useMemo(() => d3.max(data, (d) => d.y), [data]);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    width = 928;
    height = 500;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 40;

    const xScale = d3.scaleLinear(extentX, [marginLeft, width - marginRight]);

    const yScale = d3.scaleLinear([0, maxY] as [number, number], [
      height - marginBottom,
      marginTop,
    ]);

    const rScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)] as [number, number])
      .range([2, 20]);

    const line = d3
      .line<DataPoint>()
      .x((d) => xScale(d.x) || 0)
      .y((d) => yScale(d.y) || 0);

    const svg = d3.select(chartRef.current);

    svg.selectAll("*").remove(); // Clear existing content

    svg
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr(
        "style",
        "max-width: 100%; height: auto; height: intrinsic; font: 10px sans-serif;"
      )
      .style("-webkit-tap-highlight-color", "transparent")
      .style("overflow", "visible")
      .on("pointerenter pointermove", pointermoved)
      .on("pointerleave", pointerleft)
      .on("touchstart", (event) => event.preventDefault());

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(width / 50)
          .tickSizeOuter(5)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", width - marginRight)
          .attr("y", marginBottom + 20)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text("Years")
      );

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .ticks(height / 40)
          .tickSizeInner(5)
      )
      .call((g) =>
        g
          .selectAll(".tick line")
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.4)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Number of Papers")
      );

    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(data));

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", (d) => rScale(d.y / (maxY || 1)))
      .attr("fill", "steelblue");

    const tooltip = svg.append("g");

    // function formatValue(value: number) {
    //   return value.toLocaleString("en", {
    //     style: "currency",
    //     currency: "USD",
    //   });
    // }

    function formatNumber(value: number) {
      return value.toLocaleString("en", {
        style: "decimal",
        maximumFractionDigits: 2,
      });
    }

    function formatDate(date: number) {
      return new Date(date, 0).toLocaleString("en", {
        year: "numeric",
      });
    }

    const bisect = d3.bisector((d: DataPoint) => d.x).center;
    function pointermoved(event: any) {
      const i = bisect(data, xScale.invert(d3.pointer(event)[0]));
      tooltip.style("display", null);
      tooltip.attr(
        "transform",
        `translate(${xScale(new Date(data[i].x)) || 0},${
          yScale(data[i].y) || 0
        })`
      );

      const path = tooltip
        .selectAll("path")
        .data([,])
        .join("path")
        .attr("fill", "white")
        .attr("stroke", "black");

      const text = tooltip
        .selectAll("text")
        .data([,])
        .join("text")
        .call((text) =>
          text
            .selectAll("tspan")
            .data([
              `years: ${formatDate(data[i].x)}`,
              `papers: ${formatNumber(data[i].y)}`,
            ])
            .join("tspan")
            .attr("x", 0)
            .attr("y", (_, i) => `${i * 1.1}em`)
            .attr("font-weight", (_, i) => (i ? null : "bold"))
            .text((d) => d)
        );

      size(text, path);
    }

    function pointerleft() {
      tooltip.style("display", "none");
    }

    function size(text: any, path: any) {
      const { x, y, width: w, height: h } = text.node().getBBox();
      text.attr("transform", `translate(${-w / 2},${15 - y})`);
      path.attr(
        "d",
        `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
      );
    }
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

// import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react";

// import useComponentSize from "@rehooks/component-size";

// import { extent } from "d3-array";
// import { type ScaleContinuousNumeric, scaleLinear, scaleSqrt } from "d3-scale";
// import { select } from "d3-selection";
// import {
//   curveBasis,
//   type CurveFactory,
//   curveLinear,
//   curveMonotoneX,
//   curveNatural,
//   curveStep,
//   curveStepAfter,
//   curveStepBefore,
//   line,
//   type Line,
// } from "d3-shape";
// import { useTheme } from "styled-components";

// // import { ComparisonScaleMax } from '@/features/Dashboards/CompanyDashboard/General/hooks/comparisonScale.reducer';
// // import { simpleRandomId } from "@/utils/random";
// // import type { PropsFromStyledComponent } from "../../../../../../util/types";

// import { Svg } from "../.shared/Svg";
// import {
//   defaultTransition,
//   type TransitionConfig,
// } from "../.utils/transitionConfig";
// import type { AxisConfig, AxisFormat } from "../Axis/axis.types";

// import { bubbleLineChart } from "./bubbleLineChart.d3";
// import {
//   defaultFormat,
//   defaultLayout,
//   defaultStyles,
// } from "./BubbleLineChart.defaults";
// import { Container } from "./BubbleLineChart.styles";
// import type {
//   CurveType,
//   Formatter,
//   Handler,
//   LayoutConfig,
//   LineData,
//   Point,
//   Range,
//   StyleConfig,
// } from "./BubbleLineChart.types";
// import { fillX } from "./utils/fillX";
// import { localExtent } from "./utils/localExtent";
// import { black0 } from "../../../../constants/colors";

// const empty = [] as const;

// // PropsFromStyledComponent<typeof Container>,
// type Props<Id extends string = string> = {
//   active: LineData | Point | undefined;
//   curveType?: CurveType;
//   colorMap: string;
//   data: Point[];
//   domainX: Range;
//   formatLabel?: Formatter;
//   highlightedIds?: readonly Id[];
//   interpolateX?: boolean;
//   layout?: LayoutConfig | undefined;
//   onHover?: (e: MouseEvent, d?: LineData | Point) => void;
//   onClick?: (e: MouseEvent, d?: LineData | Point) => void;
//   rMax?: number;
//   rMin?: number;
//   styles?: StyleConfig | undefined;
//   transitionDuration?: number;
//   axisAnchorX?: "top" | "bottom";
//   axisFormatX?: AxisFormat<number>;
//   innerGridX?: boolean;
//   axisAnchorY?: "left" | "right";
//   axisFormatY?: AxisFormat<number>;
//   innerGridY?: boolean;
//   // computedYRange?: ComparisonScaleMax;
// };
// export function simpleRandomId(prefix = "id") {
//   return prefix + Math.random().toString(36).substr(2, 5);
// }
// export const BubbleLineChart = ({
//   active,
//   colorMap,
//   curveType = "monotone",
//   data = empty as unknown as Point[],
//   domainX,
//   formatLabel = defaultFormat,
//   highlightedIds = empty,
//   interpolateX = false,
//   layout = defaultLayout,
//   onHover,
//   onClick,
//   rMax = 8,
//   rMin = 3,
//   styles = defaultStyles,
//   transitionDuration = defaultTransition.duration,
//   axisAnchorX = "bottom",
//   axisFormatX = "integer-without-grouping",
//   innerGridX = false,
//   axisAnchorY = "left",
//   axisFormatY = "positive-float",
//   innerGridY = true,
//   // computedYRange,
//   ...props
// }: Props) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const g = useRef<SVGGElement>(null);

//   const { width, height } = useComponentSize(ref);

//   const w = useMemo(
//     () => Math.max(0, width - (layout.margin.left + layout.margin.right)),
//     [width, layout.margin.left, layout.margin.right]
//   );
//   const h = useMemo(
//     () => Math.max(0, height - (layout.margin.top + layout.margin.bottom)),
//     [height, layout.margin.top, layout.margin.bottom]
//   );

//   const lineClipPathId = useMemo(() => simpleRandomId(), []);
//   const pointClipPathId = useMemo(() => simpleRandomId(), []);

//   const scaleX = useRef<ScaleContinuousNumeric<number, number, number>>(
//     scaleLinear<number, number, number>().unknown(0)
//   );
//   const scaleY = useRef<ScaleContinuousNumeric<number, number, number>>(
//     scaleLinear<number, number, number>().unknown(0)
//   );
//   const scaleR = useRef<ScaleContinuousNumeric<number, number, number>>(
//     scaleSqrt().unknown(0)
//   );
//   const curve = useRef<Line<Point>>(line<Point>());

//   const transition = useMemo<TransitionConfig>(
//     () => ({
//       name: simpleRandomId(),
//       duration: transitionDuration,
//       ease: defaultTransition.ease,
//     }),
//     [transitionDuration]
//   );

//   useLayoutEffect(() => {
//     let c: CurveFactory;

//     switch (curveType) {
//       default:
//       case "monotone":
//         c = curveMonotoneX;
//         break;
//       case "linear":
//         c = curveLinear;
//         break;
//       case "basis":
//         c = curveBasis;
//         break;
//       case "step":
//         c = curveStep;
//         break;
//       case "step-after":
//         c = curveStepAfter;
//         break;
//       case "step-before":
//         c = curveStepBefore;
//         break;
//       case "natural":
//         c = curveNatural;
//         break;
//     }

//     curve.current
//       .curve(c)
//       .x((d) => scaleX.current(+d.x))
//       .y((d) =>
//         isNaN(Number(d.y)) ? scaleY.current(0) : scaleY.current(d.y!)
//       );
//   }, []);

//   const handler = useRef<Handler>({});

//   useLayoutEffect(() => {
//     handler.current.hover = onHover;
//     handler.current.click = onClick;
//   }, [onHover, onClick]);

//   const component = useMemo(
//     () =>
//       bubbleLineChart(
//         scaleX.current,
//         scaleY.current,
//         scaleR.current,
//         curve.current
//       ).handlers(handler.current),
//     []
//   );

//   useLayoutEffect(() => {
//     component.axisX.config({
//       ...component.axisX.config(),
//       anchor: axisAnchorX,
//       format: axisFormatX,
//       innerGrid: innerGridX,
//       tickEveryInteger: axisFormatX === "integer-without-grouping",
//       tickColor: black0,
//     } as AxisConfig<number>);

//     component.axisY.config({
//       ...component.axisY.config(),
//       anchor: axisAnchorY,
//       format: axisFormatY,
//       innerGrid: innerGridY,
//       tickEveryInteger: axisFormatY === "integer-without-grouping",
//       tickColor: black0,
//     } as AxisConfig<number>);
//   }, [
//     component,
//     axisAnchorX,
//     axisFormatX,
//     innerGridX,
//     axisAnchorY,
//     axisFormatY,
//     innerGridY,
//   ]);

//   const points = data;

//   const { extentX, domainY, domainR } = useMemo(() => {
//     const eX = extent(points, (d) => d.x);

//     return {
//       extentX: [
//         Math.min(eX[0] || 0, domainX[0] || 0),
//         Math.max(eX[1] || 0, domainX[1] || 0),
//       ] as [number, number],
//       domainY: localExtent(points, "y", "x", domainX),
//       domainR: localExtent(points, "r", "x", domainX),
//     };
//   }, [points, domainX[0], domainX[1]]);

//   const graphData = useMemo(() => {
//     if (interpolateX) {
//       return data;
//     } else {
//       const array: Point[] = data;

//       return array;
//     }
//   }, [interpolateX, data, extentX[0], extentX[1]]);

//   useLayoutEffect(() => {
//     scaleX.current.range([0, w]);
//     scaleY.current.range([h, 0]);
//     scaleR.current.range([rMin, rMax]);
//     scaleR.current.domain([domainR[0] || 0, domainR[1] || 0]);
//     component.axisX.width(w).height(h);
//     component.axisY.width(w).height(h);
//   }, [w, h, rMin, rMax, domainR[0], domainR[1]]);

//   const updateScales = useCallback(
//     (
//       d: Point[],
//       dx: Range,
//       dy: Range,
//       formatX: typeof axisFormatX,
//       formatY: typeof axisFormatY
//     ) => {
//       const xDefined = dx[0] !== undefined && dx[1] !== undefined;
//       const yDefined = dy[0] !== undefined && dy[1] !== undefined;

//       if (xDefined) {
//         if (
//           formatX === "integer-without-grouping" ||
//           formatX === "integer" ||
//           formatX === "positive-integer"
//         ) {
//           if (dx[0] === dx[1]) {
//             scaleX.current.domain([dx[0]! - 1, dx[1]! + 1]);
//           } else {
//             scaleX.current.domain(dx);
//           }
//         } else {
//           scaleX.current.domain(dx).nice();
//         }

//         if (yDefined) {
//           // const hasSomeUndefined = d.some((l) =>
//           //   l.points.some(
//           //     (p) => dx[0] <= p.x && p.x <= dx[1] && p.y === undefined
//           //   )
//           // );

//           // if (hasSomeUndefined) {
//           //   scaleY.current.domain([Math.min(0, dy[0]), Math.max(0, dy[1])]);
//           // } else {
//           //   scaleY.current.domain(dy);
//           // }

//           if (
//             !(
//               formatY === "integer-without-grouping" ||
//               formatY === "integer" ||
//               formatY === "positive-integer"
//             )
//           ) {
//             scaleY.current.domain(scaleY.current.domain()).nice();
//           }
//         } else {
//           scaleY.current.domain([0, 0]);
//         }
//       }
//     },
//     []
//   );

//   useLayoutEffect(() => {
//     updateScales(graphData, domainX, domainY, axisFormatX, axisFormatY);

//     if (g.current) {
//       component
//         .active(active)
//         .format(formatLabel)
//         .layout(layout)
//         .styles(styles)
//         .highlighted(highlightedIds);

//       const c = select(g.current);

//       c.interrupt(transition.name).selectAll("*").interrupt(transition.name);

//       // c.call(component, graphData);
//     }
//   }, [w, h, formatLabel, axisFormatX, axisFormatY, layout]);

//   useLayoutEffect(() => {
//     updateScales(graphData, domainX, domainY, axisFormatX, axisFormatY);

//     if (g.current) {
//       component
//         .active(active)
//         .format(formatLabel)
//         .layout(layout)
//         .styles(styles)
//         .highlighted(highlightedIds);

//       const c = select(g.current);

//       c.interrupt(transition.name).selectAll("*").interrupt(transition.name);

//       c.transition(transition.name)
//         .duration(transition.duration)
//         .ease(transition.ease)
//         .call(component, graphData);
//     }
//   }, [
//     domainX[0],
//     domainX[1],
//     domainY[0],
//     domainY[1],
//     domainR[0],
//     domainR[1],
//     rMin,
//     rMax,
//     graphData,
//     active,
//     highlightedIds?.join(),
//     colorMap,
//     styles,
//     axisAnchorX,
//     innerGridX,
//     axisAnchorY,
//     innerGridY,
//     curveType,
//   ]);

//   return (
//     <Container
//       {...props}
//       ref={ref}
//       pointClipPathId={pointClipPathId}
//       lineClipPathId={lineClipPathId}
//     >
//       <Svg className="chart" width={width} height={height}>
//         <defs>
//           <clipPath id={lineClipPathId}>
//             <rect
//               x={0}
//               y={-styles.line.default.strokeWidth / 2}
//               width={w}
//               height={h + styles.line.default.strokeWidth}
//             />
//           </clipPath>
//           <clipPath id={pointClipPathId}>
//             <rect
//               x={-(rMax + styles.circle.hovered.strokeWidth)}
//               y={-(rMax + styles.circle.hovered.strokeWidth)}
//               width={w + 2 * (rMax + styles.circle.hovered.strokeWidth)}
//               height={h + 2 * (rMax + styles.circle.hovered.strokeWidth)}
//             />
//           </clipPath>
//         </defs>

//         <g
//           ref={g}
//           transform={`translate(${layout.margin.left},${layout.margin.top})`}
//         >
//           <g className="x axis" />
//           <g className="y axis" />
//           <g className="lines" pointerEvents="painted" cursor="pointer" />
//         </g>
//       </Svg>
//     </Container>
//   );
// };
