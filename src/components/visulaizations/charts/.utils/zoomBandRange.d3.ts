import { type ScaleBand, ScalePoint } from 'd3-scale';
import { select } from 'd3-selection';
import { type D3ZoomEvent, zoom, zoomIdentity, zoomTransform } from 'd3-zoom';

import type { Join } from '../.shared/shared.types';
import { defaultTransition, type TransitionConfig } from './transitionConfig';
import type {
  Extent,
  Fit,
  Range,
  View,
  ZoomEvent
} from './zoomBandRange.types';
import { domainCount, first, inView, scaleSpread } from './zoomBandRange.utils';

export function zoomBandRange(
  this: Element,
  scaleX: ScaleBand<string> | ScalePoint<string> | undefined,
  scaleY: ScaleBand<string> | ScalePoint<string> | undefined
) {
  let callback: (
      event: ZoomEvent,
      current?: { x?: View; y?: View }
    ) => void | undefined,
    autoReset = false,
    fit: Fit = 'cover',
    snap = true,
    minStep = 16,
    minCount = 5,
    transition = defaultTransition,
    aspect: Range = [1, 1];

  const both = !!scaleX && !!scaleY;

  const horizontal: Range = scaleX ? scaleX.range() : [0, 0];
  const vertical: Range = scaleY
    ? (scaleY.range().reverse() as [number, number])
    : [0, 0];

  function aspectRatio() {
    const a: Range = [1, 1];

    if (both) {
      const dx = horizontal[1] - horizontal[0];
      const dy = vertical[1] - vertical[0];
      const n1 = domainCount(scaleX);
      const n2 = domainCount(scaleY);
      const r1 = (dy * n1) / (dx * n2);
      const r2 = (dx * n2) / (dy * n1);

      if (isFinite(r1) && isFinite(r2)) {
        if (fit === 'cover') {
          a[0] = Math.max(1, r1);
          a[1] = Math.max(1, r2);
        } else if (fit === 'contain') {
          a[0] = Math.min(1, r1);
          a[1] = Math.min(1, r2);
        } else {
          a[0] = Math.max(1, (minStep * n1) / dx);
          a[1] = Math.max(1, (minStep * n2) / dy);
        }
      }
    }

    return a;
  }

  function expansion(isVertical: boolean): Range {
    if (isVertical) {
      return [vertical[0] * aspect[1], vertical[1] * aspect[1]];
    }

    return [horizontal[0] * aspect[0], horizontal[1] * aspect[0]];
  }

  function scaleExtent(): Range {
    const se_x = scaleX
      ? scaleSpread(scaleX, expansion(false), minStep, minCount)
      : [Infinity, 1];
    const se_y = scaleY
      ? scaleSpread(scaleY, expansion(true), minStep, minCount)
      : [Infinity, 1];

    return [Math.min(se_x[0], se_y[0]), Math.max(se_x[1], se_y[1])];
  }

  const behavior = zoom()
    .duration(transition.duration)
    .on('start', zoomStart)
    .on('zoom', zoomed)
    .on('end', zoomEnd);

  function zoomStart(this: Element, e: D3ZoomEvent<Element, unknown>) {
    callback?.(e);
  }

  function zoomed(this: Element, e: D3ZoomEvent<Element, unknown>) {
    scaleX?.range(expansion(false).map(x => e.transform.applyX(x)));
    scaleY?.range(expansion(true).map(y => e.transform.applyY(y)));

    callback?.(e);
  }

  function zoomEnd(this: Element, e: D3ZoomEvent<Element, unknown>) {
    let dx = 0,
      dy = 0,
      k = e.transform.k,
      current: { x?: View; y?: View } = { x: undefined, y: undefined };

    if (snap) {
      if (scaleX) {
        current.x = inView(scaleX, expansion(false));
        dx = current.x.startPos;
      }

      if (scaleY) {
        current.y = inView(scaleY, expansion(true));
        dy = current.y.startPos;
      }
    }

    const transform = zoomIdentity
      .translate(-dx, -dy)
      .translate(e.transform.x, e.transform.y)
      .scale(k);

    (this as any).__zoom = transform;

    scaleX?.range(expansion(false).map(x => transform.applyX(x)));
    scaleY?.range(expansion(true).map(y => transform.applyY(y)));
    callback?.({ ...e, transform }, current);
  }

  const component = () => {
    select(this).call(behavior);

    return component;
  };

  component.reset = <E extends Pick<Event, 'preventDefault'>>(
    context?: Join,
    e?: E
  ) => {
    const se = behavior.scaleExtent();
    const { x: x0, y: y0, k: k0 } = zoomTransform(this);

    const k = Math.max(fit === 'contain' ? 0 : 1, se[0]);
    let t = zoomIdentity.scale(k);

    const sx = scaleX?.copy().range(expansion(false).map(x => t.applyX(x)));
    const sy = scaleY?.copy().range(expansion(true).map(y => t.applyY(y)));

    const x = sx ? first(sx) : 0;
    const y = sy ? first(sy) : 0;

    t = zoomIdentity.translate(-x, -y).scale(k);

    if (!(k0 === t.k && x0 === t.x && y0 === t.y)) {
      e?.preventDefault();

      if (context) {
        context.call(behavior.transform, t);
      } else {
        zoomEnd.call(this, {
          sourceEvent: e,
          transform: t,
          target: behavior,
          type: 'end'
        });
      }
    }

    return component;
  };

  component.rescale = (call?: () => void) => {
    aspect = aspectRatio();
    const se0 = behavior.scaleExtent();
    const se1 = scaleExtent();

    const extent: Extent = [
      [horizontal[0], vertical[0]],
      [horizontal[1], vertical[1]]
    ];

    behavior.scaleExtent(se1).extent(extent);

    const { x: x0, y: y0, k: k0 } = zoomTransform(this);
    let k = (k0 * (se1[1] - se1[0])) / (se0[1] - se0[0]) || 1;

    k = Math.min(Math.max(k, se1[0]), se1[1]);

    let transform = zoomIdentity.translate(x0, y0).scale(k);
    scaleX?.range(expansion(false).map(x => transform.applyX(x)));
    scaleY?.range(expansion(true).map(y => transform.applyY(y)));

    if (snap) {
      const dx = scaleX ? inView(scaleX, expansion(false)).startPos : 0;
      const dy = scaleY ? inView(scaleY, expansion(true)).startPos : 0;

      transform = zoomIdentity
        .translate(-dx, -dy)
        .translate(transform.x, transform.y)
        .scale(transform.k);
      scaleX?.range(expansion(false).map(x => transform.applyX(x)));
      scaleY?.range(expansion(true).map(y => transform.applyY(y)));
    }

    (this as any).__zoom = transform;

    call?.();

    return component;
  };

  component.extent = (e: Extent) => {
    horizontal[0] = e[0][0];
    horizontal[1] = e[1][0];
    vertical[0] = e[0][1];
    vertical[1] = e[1][1];

    const t0 = zoomTransform(this),
      se = scaleExtent();
    behavior.scaleExtent(se).extent(e);

    if (autoReset || t0.k > se[1] || t0.k < se[0]) {
      component.rescale(component.reset);
    } else {
      component.rescale();
    }

    return component;
  };

  component.autoReset = (_: boolean) => ((autoReset = _), component);
  component.behavior = behavior;

  component.callback = (
    _: (event: ZoomEvent, current?: { x?: View; y?: View }) => void
  ) => ((callback = _), component);

  component.fit = (_: Fit) => ((fit = _), component.rescale());
  component.minCount = (_: number) => ((minCount = Math.max(1, _)), component);
  component.minStep = (_?: number) =>
    _ === undefined ? minStep : ((minStep = Math.max(0, _)), component);
  component.snap = (_: boolean) => ((snap = _), component);

  component.transition = (_: TransitionConfig) => (
    (behavior.duration(_.duration), (transition = _)), component
  );

  component.aspect = () => aspect;

  return component();
}
