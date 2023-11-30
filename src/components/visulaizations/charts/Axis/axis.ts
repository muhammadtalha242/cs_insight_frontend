import type { AxisDomain } from 'd3-axis';

import type { Join, S, T } from '../.shared/shared.types';
import { getCurrentColor } from '../.utils/currentColor';

import { defaultConfig } from './axis.defaults';
import type { Anchor, AxisConfig, AxisFormat, AxisScale } from './axis.types';
import { computeFormat } from './axisFormat';
import { wrapText } from './wrapText';

const epsilon = 1e-6;

function number(scale: AxisScale<number>) {
  return (d: number) => Number(scale(d));
}

function center(scale: AxisScale<string>, offset: any) {
  let dx = Math.max(0, scale.bandwidth() - offset * 2) / 2;

  if (scale.round()) dx = Math.round(dx);

  return (d: any) => Number(scale(d)) + dx;
}

function entering(this: any) {
  return !this.__axis;
}

export interface Axis<Domain extends AxisDomain> {
  (selection: S<SVGGElement, any>, transition?: T<any>): this;
  anchor(_: Anchor): this;
  config(): AxisConfig<Domain>;
  config(_: AxisConfig<Domain>): this;
  domainColor(_?: string): this;
  fontFamily(_?: string): this;
  fontSize(_?: string | number): this;
  fontWeight(_?: string | number): this;
  format(_?: AxisFormat<Domain> | undefined): this;
  height(): number;
  height(_: number): this;
  innerGrid(_?: boolean | undefined): this;
  labelColor(_?: string | ((d: string) => string)): this;
  labelMaxDimension(_?: number): this;
  labelRotation(_?: number): this;
  offset(): number;
  offset(_: number): this;
  scale: AxisScale<Domain>;
  tickColor(_?: string): this;
  tickCount(_?: number | undefined): this;
  tickDistanceMin(_?: number | undefined): this;
  tickEveryInteger(_?: boolean | undefined): this;
  tickPadding(_?: number | undefined): this;
  tickSizeInner(_?: number | undefined): this;
  tickSizeOuter(_?: number | undefined): this;
  width(): number;
  width(_: number): this;
}

export function axis<Domain extends AxisDomain>(scale: AxisScale<Domain>) {
  const c = { ...defaultConfig } as AxisConfig<Domain>;

  let tickFormat = computeFormat<Domain>(c.format),
    horizontal = c.anchor === 'top' || c.anchor === 'bottom',
    k = c.anchor === 'top' || c.anchor === 'left' ? -1 : 1,
    x = horizontal ? 'y' : 'x',
    y = horizontal ? 'x' : 'y',
    width = 0,
    height = 0,
    expansion = 0,
    offset = window?.devicePixelRatio > 1 ? 0 : 0.5,
    position = ('bandwidth' in scale ? center : number)(
      (scale as any).copy(),
      offset
    ) as (d: Domain) => number,
    currentColor = 'currentColor';

  function transform(n: number) {
    return `translate(${horizontal ? n : 0},${horizontal ? 0 : n})`;
  }

  function update() {
    horizontal = c.anchor === 'top' || c.anchor === 'bottom';
    k = c.anchor === 'top' || c.anchor === 'left' ? -1 : 1;
    x = horizontal ? 'y' : 'x';
    y = horizontal ? 'x' : 'y';
    expansion = horizontal ? height : width;
  }

  const render = {
    path: {
      update(j: any, dimension: number) {
        const outer = c.innerGrid ? k * c.tickSizeOuter : 0;

        j.attr(
          'd',
          horizontal
            ? (outer &&
                `M${offset},${outer}V${offset}H${dimension}V${outer}`) ||
                `M${offset},${offset}H${dimension}`
            : (outer &&
                `M${outer},${offset}H${offset}V${dimension}H${outer}`) ||
                `M${offset},${offset}V${dimension}`
        ).attr('stroke', c.domainColor || c.tickColor || currentColor);
      }
    },
    tick: {
      group: {
        enter(s: S<SVGGElement, any>) {
          s.attr('opacity', epsilon).attr('transform', function (d) {
            const p = (this as any).parentNode.__axis;

            return p && isFinite(p(d))
              ? transform(p(d) + offset)
              : transform(position(d) + offset);
          });
        },
        update(j: any) {
          j.attr('opacity', 1).attr('transform', (d: Domain) =>
            transform(position(d) + offset)
          );
        },
        exit(j: any) {
          j.attr('opacity', epsilon)
            .attr('transform', function (this: SVGGElement, d: Domain) {
              return isFinite(position(d))
                ? transform(position(d) + offset)
                : this.getAttribute('transform');
            })
            .remove();
        }
      },
      line(j: any) {
        j.attr('stroke', c.tickColor || currentColor)
          .attr(y + '1', 0)
          .attr(y + '2', 0)
          .attr(x + '1', c.innerGrid ? k * c.tickSizeInner : 0)
          .attr(x + '2', k * (c.innerGrid ? -expansion : c.tickSizeInner));
      },
      text(j: any) {
        j.attr('font-weight', c.fontWeight)
          .attr('font-size', c.fontSize)
          .attr('fill', c.labelColor || currentColor);
      }
    }
  };

  const component = <Axis<Domain>>(
    function (s: S<SVGGElement, any>, t?: T<any>) {
      let j: Join<SVGGElement, any> = s;
      const domain = scale.domain();

      position = ('bandwidth' in scale ? center : number)(
        (scale as any).copy(),
        offset
      ) as (d: Domain) => number;

      currentColor = getCurrentColor(s.node()) || currentColor;

      const range = scale.range(),
        dimension = Math.abs(range[1] - range[0]);
      const distance = Math.max(
        dimension /
          Math.max(
            c.tickCount,
            'bandwidth' in scale
              ? domain.length
              : Math.abs(Number(domain[1]) || 1 - Number(domain[0]) || 0)
          ),
        c.tickDistanceMin
      );

      const count = Math.max(
        2,
        'bandwidth' in scale
          ? domain.length
          : Math.round(
              c.tickEveryInteger
                ? Math.abs(Number(domain[1]) - Number(domain[0]))
                : dimension / distance
            )
      );

      const isIntegerFormat =
        c.format === 'integer' ||
        c.format === 'integer-without-grouping' ||
        c.format === 'positive-integer';

      const values = (
        'ticks' in scale
          ? scale
              .ticks(count)
              .filter(isIntegerFormat ? Number.isInteger : () => true)
          : scale.domain()
      ) as Domain[];

      const modulo = Math.max(
        Math.round((values.length * distance) / dimension),
        1
      );

      const formatLabel =
        'step' in scale
          ? tickFormat
          : (d: Domain, index: number) =>
              (index % modulo === 0 && tickFormat(d)) || '';

      const labelMax1 = Math.max(
          0,
          ('step' in scale ? scale.step() : c.tickDistanceMin) -
            2 * c.tickPadding
        ),
        labelMax2 = Math.max(
          0,
          c.labelMaxDimension - c.tickPadding - c.tickSizeInner
        );

      const label = wrapText(
        formatLabel,
        horizontal ? labelMax1 : labelMax2,
        horizontal ? labelMax2 : labelMax1,
        c.anchor,
        c.labelRotation,
        c.tickSizeInner + c.tickPadding
      );

      s.filter(entering)
        .attr('fill', 'none')
        .attr(
          'transform',
          `translate(${c.anchor === 'right' ? expansion : 0},${
            c.anchor === 'bottom' ? expansion : 0
          })`
        );

      let path: any = s
          .selectChildren<SVGPathElement, null>('.domain')
          .data([null]),
        ticks: Join<SVGGElement, Domain> = s
          .selectChildren<SVGGElement, Domain>('.tick')
          .data(values, d => scale(d as any)!)
          .order(),
        ticksExit: Join<SVGGElement, Domain> = ticks.exit(),
        line: Join<SVGLineElement, Domain> = ticks.select('line'),
        text: Join<SVGTextElement, Domain> = ticks.select('text');

      path = path.merge(
        path
          .enter()
          .insert('path', '.tick')
          .attr('class', 'domain')
          .attr('pointer-events', 'none')
          .attr('stroke', c.domainColor || c.tickColor || currentColor)
      );

      const ticksEnter: Join<SVGGElement, Domain> = ticks
        .enter()
        .append('g')
        .attr('class', 'tick')
        .call(render.tick.group.enter);

      ticks = ticks.merge(ticksEnter);

      line = line.merge(
        ticksEnter
          .append('line')
          .attr('pointer-events', 'none')
          .attr('stroke', c.tickColor || currentColor)
          .call(render.tick.line)
      );

      text = text.merge(
        ticksEnter.append('text').call(render.tick.text).each(label)
      );

      if (t) {
        j = j.transition(t);
        path = path.transition(t);
        ticks = ticks.transition(t);
        line = line.transition(t);
        text = text.transition(t);

        ticksExit = ticksExit.transition(t).call(render.tick.group.exit);
        ticksEnter.call(render.tick.group.enter);
      }

      ticksExit.remove();
      path.call(render.path.update, dimension);
      line.call(render.tick.line);

      text.call(render.tick.text).each(function (...args) {
        label.call(this, ...args, t);
      });

      ticks
        .call(u =>
          u.attr('class', d =>
            values.indexOf(d) % modulo === 0 ? 'tick major' : 'tick minor'
          )
        )
        .call(render.tick.group.update);

      s.attr('font-family', c.fontFamily)
        .attr(
          'text-anchor',
          (c.anchor === 'right' && 'start') ||
            (c.anchor === 'left' && 'end') ||
            'middle'
        )
        .each(function (this: any) {
          this.__axis = position;
        });

      j.attr(
        'transform',
        `translate(${c.anchor === 'right' ? expansion : 0},${
          c.anchor === 'bottom' ? expansion : 0
        })`
      );

      return component;
    }
  );

  component.scale = scale;

  component.width = <
    {
      (): number;
      (_: number): Axis<Domain>;
    }
  >function (_?: number) {
    return _ === undefined ? width : ((width = _), update(), component);
  };

  component.height = <
    {
      (): number;
      (_: number): Axis<Domain>;
    }
  >function (_?: number) {
    return _ === undefined ? height : ((height = _), update(), component);
  };

  component.offset = <
    {
      (): number;
      (_: number): Axis<Domain>;
    }
  >function (_?: number) {
    return _ === undefined ? offset : ((offset = _), component);
  };

  component.domainColor = function (_?: string) {
    return (c.domainColor = _ ?? defaultConfig.domainColor), component;
  };

  component.fontFamily = function (_?: string) {
    return (c.fontFamily = _ ?? defaultConfig.fontFamily), component;
  };

  component.fontSize = function (_?: string | number) {
    return (c.fontSize = _ ?? defaultConfig.fontSize), component;
  };

  component.fontWeight = function (_?: string | number) {
    return (c.fontWeight = _ ?? defaultConfig.fontWeight), component;
  };

  component.format = function (_?: AxisFormat<Domain>) {
    return (
      ((c.format = _), (tickFormat = computeFormat<Domain>(c.format))),
      component
    );
  };

  component.innerGrid = function (_?: boolean) {
    return (c.innerGrid = _ ?? defaultConfig.innerGrid), component;
  };

  component.labelColor = function (_?: string | ((d: string) => string)) {
    return (c.labelColor = _ ?? defaultConfig.labelColor), component;
  };

  component.labelMaxDimension = function (_?: number) {
    return (
      (c.labelMaxDimension = _ ?? defaultConfig.labelMaxDimension), component
    );
  };

  component.labelRotation = function (_?: number) {
    return (c.labelRotation = _ ?? defaultConfig.labelRotation), component;
  };

  component.tickColor = function (_?: string) {
    return (c.tickColor = _ ?? defaultConfig.tickColor), component;
  };

  component.tickCount = function (_?: number) {
    return (c.tickCount = _ ?? defaultConfig.tickCount), component;
  };

  component.tickDistanceMin = function (_?: number) {
    return (c.tickDistanceMin = _ ?? defaultConfig.tickDistanceMin), component;
  };

  component.tickEveryInteger = function (_?: boolean) {
    return (
      (c.tickEveryInteger = _ ?? defaultConfig.tickEveryInteger), component
    );
  };

  component.tickPadding = function (_?: number) {
    return (c.tickPadding = _ ?? defaultConfig.tickPadding), component;
  };

  component.tickSizeInner = function (_?: number) {
    return (c.tickSizeInner = _ ?? defaultConfig.tickSizeInner), component;
  };

  component.tickSizeOuter = function (_?: number) {
    return (c.tickSizeOuter = _ ?? defaultConfig.tickSizeOuter), component;
  };

  component.anchor = function (_: Anchor) {
    return _ !== c.anchor ? ((c.anchor = _), update(), component) : component;
  };

  component.config = <
    {
      (): AxisConfig<Domain>;
      (_: AxisConfig<Domain>): Axis<Domain>;
    }
  >function (_?: AxisConfig<Domain>) {
    return _ === undefined
      ? ({ ...c } as AxisConfig<Domain>)
      : component
          .anchor(_.anchor)
          .domainColor(_.domainColor)
          .fontFamily(_.fontFamily)
          .fontSize(_.fontSize)
          .fontWeight(_.fontWeight)
          .format(_.format)
          .innerGrid(_.innerGrid)
          .labelColor(_.labelColor)
          .labelMaxDimension(_.labelMaxDimension)
          .labelRotation(_.labelRotation)
          .tickColor(_.tickColor)
          .tickDistanceMin(_.tickDistanceMin)
          .tickEveryInteger(_.tickEveryInteger)
          .tickPadding(_.tickPadding)
          .tickSizeInner(_.tickSizeInner)
          .tickSizeOuter(_.tickSizeOuter);
  };

  return component;
}
