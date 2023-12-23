import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import * as d3 from "d3";

import { ApplicationContext } from "../../../../context/Application.context";

import {
  defaultFormat,
  defaultLayout as layout,
  defaultStyles,
} from "./BubbleLineChart.defaults";

type DataPoint = {
  x: number;
  y: number;
};

export interface BubbleLineChartProps {
  data: DataPoint[];
}

type Range = [number, number];

/*//TODO
1. create wrapper, margins, and bounded structure for all visualizations
2. use declaritive ways to create charts ->
3. add transitions on entry and exit of charts
*/
export const BubbleLineChart: React.FC<BubbleLineChartProps> = ({ data }) => {
  const { state: applicationState } = useContext(ApplicationContext);
  const { isFiltersCollaped } = applicationState;
  const chartRef = useRef<SVGSVGElement>(null);

  const extentX = useMemo<Range>(
    () => d3.extent(data, (d) => d.x) as [number, number],
    [data],
  );
  const maxY = useMemo(() => d3.max(data, (d) => d.y), [data]);

  useLayoutEffect(() => {
    if (!chartRef.current || !data.length) return;

    if (data && chartRef.current) {
      const containerWidth = chartRef.current.clientWidth;
      const containerHeight = chartRef.current.clientHeight;

      drawChart({ width: containerWidth, height: containerHeight });
    }
  }, [data, isFiltersCollaped]);

  const drawChart = (dim: { width: number; height: number }) => {
    const width = dim.width;
    const height = 620;

    const xScale = d3.scaleLinear(extentX, [
      layout.margin.left,
      width - layout.margin.right,
    ]);

    const yScale = d3.scaleLinear([0, maxY] as [number, number], [
      height - layout.margin.bottom,
      layout.margin.top,
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
    const t = d3.transition().duration(750).ease(d3.easeLinear);

    svg
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .on("pointerenter pointermove", pointermoved)
      .on("pointerleave", pointerleft)
      .on("touchstart", (event) => event.preventDefault())
      .transition(t)
      .style("-webkit-tap-highlight-color", "transparent")
      .style("overflow", "visible");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - layout.margin.bottom})`)
      .call((g) =>
        g
          .append("text")
          .attr("x", width - layout.margin.right)
          .attr("y", layout.margin.bottom + 20)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text("Years"),
      )
      .transition(t)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(width / 50)
          .tickSizeOuter(5),
      );

    svg
      .append("g")
      .attr("transform", `translate(${layout.margin.left},0)`)
      .call((g) =>
        g
          .append("text")
          .attr("x", -layout.margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Number of Papers"),
      )
      .transition(t)
      .call(
        d3
          .axisLeft(yScale)
          .ticks(height / 40)
          .tickSizeInner(5),
      )
      .call((g) =>
        g
          .selectAll(".tick line")
          .attr("x2", width - layout.margin.left - layout.margin.right)
          .attr("stroke-opacity", 0.4),
      );

    svg
      .append("path")
      .attr("d", line(data))
      .transition(t)
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .attr("stroke", "steelblue");

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .transition(t)
      .attr("r", (d) => rScale(d.y / (maxY || 1)))
      .attr("fill", "steelblue");

    const tooltip = svg.append("g");

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
        })`,
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
            .text((d) => d),
        );

      size(text, path);
    }

    function pointerleft() {
      tooltip.style("display", "none");
    }

    function size(text: any, path: any) {
      const { y, width: w, height: h } = text.node().getBBox();

      text.attr("transform", `translate(${-w / 2},${15 - y})`);

      path.attr(
        "d",
        `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`,
      );
    }
  };

  return (
    <svg
      ref={chartRef}
      style={{ width: "100%", height: "100%" }}
      className="chart-area"
    ></svg>
  );
};
