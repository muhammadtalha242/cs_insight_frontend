import { interpolatePath } from 'd3-interpolate-path';
import type { ScaleContinuousNumeric } from 'd3-scale';
import type { BaseType, Selection } from 'd3-selection';
import { select } from 'd3-selection';
import type { Line } from 'd3-shape';

import type { Join, S, T } from '../.shared/shared.types';
import { axis } from '../Axis/axis';

import {
  defaultFormat,
  defaultLayout,
  defaultStyles
} from './BubbleLineChart.defaults';
import { isPoint } from './BubbleLineChart.typeGuard';
import type {
  Formatter,
  Handler,
  LayoutConfig,
  LineData,
  Point,
  PointStatus,
  Status,
  StyleConfig
} from './BubbleLineChart.types';

export function bubbleLineChart<Id extends string = string>(
  scaleX: ScaleContinuousNumeric<number, number, number>,
  scaleY: ScaleContinuousNumeric<number, number, number>,
  scaleR: ScaleContinuousNumeric<number, number, number>,
  curve: Line<Point>
) {
  let highlightedIds: Record<string, boolean> = {},
    active: Point | LineData | undefined = undefined,
    colorMap: Record<string, string> = {},
    styles = defaultStyles,
    layout = defaultLayout,
    handlers: Handler,
    format = defaultFormat;

  function status(d: LineData): Status;
  function status(d: Point): PointStatus;
  function status(d: Point | LineData) {
    // if (active) {
    //   if (d.id === active.id) {
    //     if (isPoint(d) && isPoint(active) && d.x === active.x) {
    //       return 'hovered';
    //     }

    //     return 'active';
    //   }

    //   if (highlightedIds[d.id]) return 'active';

    //   return 'inactive';
    // }

    // if (highlightedIds[d.id]) return 'active';

    return 'default';
  }

  const on = {
    click(event: MouseEvent, d: Point | LineData) {
      active = d;
      handlers?.click?.(event, d);
    },
    move(event: MouseEvent, d: Point | LineData) {
      active = d;
      handlers?.hover?.(event, d);
    },
    out(event: MouseEvent) {
      active = undefined;
      handlers?.hover?.(event);
    }
  };

  const update = {
    circle: {
      enter(s: Selection<SVGCircleElement, Point, any, unknown>) {
        return s
          .on('click', on.click)
          .on('mouseover', on.move)
          .on('mouseout', on.out)
          .attr('cursor', 'pointer')
          .attr('cx', (d: Point) => scaleX(d.x))
          .attr('cy', (d: Point) => scaleY(d.y || 0))
          .attr('r', 0)
          .call(update.circle.style);
      },
      update(s: any) {
        return s
          .attr('cx', (d: Point) => scaleX(d.x))
          .attr('cy', (d: Point) => scaleY(d.y || 0))
          .attr('r', (d: Point) => (d.r === undefined ? 0 : scaleR(d.r)))
          .call(update.circle.style);
      },
      style(s: any) {
        return s
          .attr(
            'fill-opacity',
            (d: Point) => styles.circle[status(d)].fillOpacity
          )
          .attr(
            'stroke-opacity',
            (d: Point) => styles.circle[status(d)].strokeOpacity
          )
          .attr(
            'stroke-width',
            (d: Point) => styles.circle[status(d)].strokeWidth
          );
      }
    },
    curve: {
      style(s: any) {
        return s
          .attr(
            'stroke-opacity',
            (d: LineData) => styles.line[status(d)].strokeOpacity
          )
          .attr(
            'stroke-width',
            (d: LineData) => styles.line[status(d)].strokeWidth
          );
      }
    },
    text: {
      exit(
        s: Selection<SVGTextElement, Point, any, unknown>,
        t: T<BaseType, any> | undefined
      ) {
        let j: Join<SVGTextElement, Point> = s;

        if (t) {
          j = j.transition(t).attr('fill-opacity', 0);
        }

        j.remove();
      },
      x: (d: Point) => scaleX(d.x),
      y: (d: Point) =>
        scaleY(d.y || 0) -
        (d.r === undefined ? 0 : scaleR(d.r)) -
        layout.label.padding
    },
    group: {
      style(s: any) {
        return s
          .attr('stroke', (d: LineData) => colorMap)
          .attr('fill', (d: LineData) => colorMap[d.id])
          .style('opacity', 1);
      }
    },
    labels: {
      join: (
        s: S<SVGGElement, LineData>,
        t: T<BaseType, any> | undefined
      ) => {
        const domainX = scaleX.domain();

        s.each((l, lineIndex, lines) => {
          const points = l.points.filter(
            p => domainX[0] <= p.x && p.x <= domainX[1]
          );

          select<SVGGElement, LineData>(lines[lineIndex])
            .call(update.labels.style, t)
            .selectAll<SVGTextElement, Point>('text')
            .data(points, p => p.x)
            .join(
              e =>
                e
                  .append('text')
                  .attr('fill-opacity', 0)
                  .attr('x', update.text.x)
                  .attr('y', update.text.y),
              u => u,
              e => e.call(update.text.exit, t)
            )
            .text(format)
            .each((p, index, arr) => {
              const node = arr[index] as any;
              let j: Join<SVGTextElement, Point> = select(node);

              if (t) {
                j = j.transition(t);
              }

              let isVisible = !!node.textContent;
              const rx = update.text.x(p);
              const ry = update.text.y(p);

              if (isVisible) {
                const { width: rw, height: rh } = node.getBoundingClientRect();

                for (let i = index - 1; i >= 0; i--) {
                  const prev = arr[i] as any;

                  if (prev && prev.__visible) {
                    const left = (prev.__data__ || points[i]) as Point;
                    const lx = update.text.x(left);
                    const ly = update.text.y(left);
                    const { width: lw, height: lh } =
                      node.getBoundingClientRect();

                    const dx = Math.abs(rx - lx);
                    const dy = Math.abs(ry - ly);
                    const dw = rw / 2 + lw / 2 + layout.label.padding;
                    const dh = Math.max(rh, lh) + layout.label.padding;

                    isVisible = dw < dx || dh < dy;

                    if (!isVisible && dw > dx) {
                      break;
                    }
                  }
                }
              }

              node.__visible = isVisible;

              j.attr('x', rx);
              j.attr('y', ry);

              j.attr(
                'fill-opacity',
                isVisible ? styles.text[status(p)].fillOpacity : 0
              );

              j.attr('fill', (d, i, g) => {
                const fill = styles.text[status(p)].fill;

                return typeof fill === 'function' ? fill(d, i, g) : fill;
              });
            });
        });
      },
      style(s: S<SVGGElement, LineData>, t: T<BaseType, any> | undefined) {
        s.attr('font-family', styles.labels.fontFamily);
        let j: Join<SVGGElement, LineData> = s;

        if (t) j = j.transition(t);

        j.attr('font-weight', styles.labels.fontWeight);
        j.attr('font-size', styles.labels.fontSize);
      }
    }
  };

  const sort = (a: LineData, b: LineData) => {
    if (active) {
      if (a.id === active.id || highlightedIds[a.id]) return 1;
      if (b.id === active.id || highlightedIds[b.id]) return -1;
    }

    return 0;
  };

  const axisX = axis(scaleX).anchor('bottom');
  const axisY = axis(scaleY).anchor('left');

  const chart = function (
    context: Join<SVGGElement, any>,
    data: LineData[]
  ) {
    const selection = (
      context.selection ? context.selection() : context
    ) as S<SVGGElement>;

    const t =
      context !== selection ? (context as any as T<BaseType>) : undefined;

    const hasData = data.some(d => d.points.length > 0);

    selection
      .selectAll<SVGGElement, any>('.x.axis')
      .data(hasData ? [null] : [])
      .join(e =>
        e.insert('g', '.lines').classed('x', true).classed('axis', true)
      )
      .call(s => s.call(axisX, t));

    selection
      .selectAll<SVGGElement, any>('.y.axis')
      .data(hasData ? [null] : [])
      .join(e =>
        e.insert('g', '.lines').classed('y', true).classed('axis', true)
      )
      .call(s => s.call(axisY, t));

    selection
      .selectAll<SVGGElement, any>('.lines')
      .data([null])
      .join(e => e.append('g').classed('lines', true))
      .selectAll<SVGGElement, LineData>('.serie')
      .data(data.sort(sort), d => d.id)
      .order()
      .join(
        e =>
          e
            .append('g')
            .classed('serie', true)
            .call(update.group.style)
            .style('opacity', 0)
            .call(s => {
              let j: Join<SVGGElement, LineData> = s;

              s.append('path')
                .classed('curve', true)
                .on('click', on.click)
                .on('mousemove', on.move)
                .on('mouseout', on.out)
                .attr('fill', 'none')
                .attr('cursor', 'pointer')
                .call(update.curve.style)
                .attr('d', d => curve(d.points));

              let circles: Join<SVGCircleElement, Point> = s
                .append('g')
                .classed('dots', true)
                .attr('paint-order', 'stroke fill')
                .selectAll<SVGCircleElement, Point>('circle')
                .data(
                  d =>
                    d.points.filter(
                      p =>
                        scaleX.domain()[0] <= p.x && p.x <= scaleX.domain()[1]
                    ),
                  p => p.x
                )
                .join(enter =>
                  enter.append('circle').call(update.circle.enter)
                );

              s.append('g')
                .classed('labels', true)
                .attr('stroke', 'none')
                .attr('pointer-events', 'none')
                .attr('text-anchor', 'middle')
                .call(update.labels.join, t);

              if (t) {
                j = j.transition(t);
                circles = circles.transition(t);
              }

              j.style('opacity', 1);
              circles.call(update.circle.update);
            }),
        u =>
          u.call(function (c) {
            let g: Join<SVGGElement, LineData> = c;
            let line: Join<SVGPathElement, LineData> = c.select('.curve');
            const circles: Join<SVGGElement, LineData> = c.select('.dots');
            const labels: Join<SVGGElement, LineData> = c.select('.labels');

            circles
              .selectAll<SVGCircleElement, Point>('circle')
              .data(
                d =>
                  d.points.filter(
                    p => scaleX.domain()[0] <= p.x && p.x <= scaleX.domain()[1]
                  ),
                p => p.x
              )
              .join(
                enter =>
                  enter
                    .insert('circle')
                    .call(update.circle.enter)
                    .call(
                      t
                        ? circle =>
                            circle.transition(t).call(update.circle.update)
                        : circle => circle.call(update.circle.update)
                    ),
                up =>
                  up.call(
                    t
                      ? circle =>
                          circle.transition(t).call(update.circle.update)
                      : circle => circle.call(update.circle.update)
                  ),
                exit => exit.remove()
              );

            labels.call(update.labels.join, t);

            if (t) {
              g = g.transition(t);

              line = line.transition(t).attrTween('d', function (d) {
                const previous =
                  select(this).attr('d') || (curve(d.points) as string);
                const current = curve(d.points);

                if (!current) return () => previous;

                return interpolatePath(previous, current);
              });
            } else {
              line.attr('d', d => curve(d.points));
            }

            line.call(update.curve.style);
            g.call(update.group.style);
          }),
        e =>
          e.call(
            t
              ? s => s.transition(t).style('opacity', 0).remove()
              : s => s.remove()
          )
      );
  };

  chart.active = (_: LineData | Point | undefined) => (
    (active = _), chart
  );

  chart.colorMap = (_: Record<string, string>) => ((colorMap = _), chart);
  chart.format = (_: Formatter) => ((format = _), chart);
  chart.handlers = (_: Handler) => ((handlers = _), chart);

  chart.highlighted = (_: readonly string[]) => (
    (highlightedIds = _.reduce(
      (acc, id) => ((acc[id] = true), acc),
      {} as Record<string, boolean>
    )),
    chart
  );

  chart.styles = (_: StyleConfig) => ((styles = _), chart);
  chart.layout = (_: LayoutConfig) => ((layout = _), chart);
  chart.axisX = axisX;
  chart.axisY = axisY;

  return chart;
}
