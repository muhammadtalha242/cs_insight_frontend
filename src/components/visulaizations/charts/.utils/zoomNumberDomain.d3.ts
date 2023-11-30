import type { ScaleContinuousNumeric } from 'd3-scale';
import { select } from 'd3-selection';
import { D3ZoomEvent, zoom, zoomIdentity, zoomTransform } from 'd3-zoom';

import { defaultTransition, type TransitionConfig } from './transitionConfig';

export function zoomNumberDomain(
  this: Element,
  x1Scale: ScaleContinuousNumeric<number, number, number>,
  x2Scale: ScaleContinuousNumeric<number, number, number>
) {
  let callback: (event: D3ZoomEvent<Element, unknown>) => void,
    transition = defaultTransition;
  const x1ScaleZoom = x1Scale.copy(),
    x2ScaleZoom = x2Scale.copy();

  const behavior = zoom()
    .duration(transition.duration)
    .on('start', zoomStart)
    .on('zoom', zoomed)
    .on('end', zoomEnd);

  function zoomStart(this: Element, event: D3ZoomEvent<Element, unknown>) {
    callback?.(event);
  }

  function zoomed(this: Element, event: D3ZoomEvent<Element, unknown>) {
    const rX1 = x1Scale.range();
    const rX2 = x2Scale.range();

    const dX1_0 = x1Scale.domain();
    const dX2_0 = x2Scale.domain();

    const isEqualX1 = dX1_0[0] === dX1_0[1];
    const isEqualX2 = dX2_0[0] === dX2_0[1];

    x1ScaleZoom.range(rX1);
    x2ScaleZoom.range(rX2);

    const dX1 = isEqualX1
      ? dX1_0
      : event.transform.rescaleX(x1ScaleZoom).domain();
    const dX2 = isEqualX2
      ? dX2_0
      : event.transform.rescaleY(x2ScaleZoom).domain();

    x1Scale.domain(dX1);
    x2Scale.domain(dX2);

    callback?.(event);
  }

  function zoomEnd(this: Element, event: D3ZoomEvent<Element, unknown>) {
    callback?.(event);
  }

  const component = () => {
    select(this).call(behavior);

    return component;
  };

  component.behavior = behavior;

  component.reset = <E extends Pick<Event, 'preventDefault'>>(e?: E) => {
    if (e) {
      e.preventDefault();
    }

    const t = zoomTransform(this);

    if (!(t.k === 1 && t.x === 0 && t.y === 0)) {
      select(this)
        .interrupt(transition.name + 'zoom')
        .transition(transition.name + 'zoom')
        .duration(transition.duration)
        .ease(transition.ease)
        .call(behavior.transform, zoomIdentity);
    }
  };

  component.scaleBy = (step: number) => {
    select(this)
      .interrupt(transition.name + 'zoom')
      .transition(transition.name + 'zoom')
      .duration(transition.duration)
      .ease(transition.ease)
      .call(behavior.scaleBy, step);
  };

  component.scaleTo = (level: number) => {
    select(this)
      .interrupt(transition.name + 'zoom')
      .transition(transition.name + 'zoom')
      .duration(transition.duration)
      .ease(transition.ease)
      .call(behavior.scaleTo, level);
  };

  component.rescale = () => {
    x1ScaleZoom.range(x1Scale.range()).domain(x1Scale.domain());
    x2ScaleZoom.range(x2Scale.range()).domain(x2Scale.domain());

    (select(this).node() as any).__zoom = zoomIdentity;
  };

  component.callback = (_: (event: D3ZoomEvent<Element, unknown>) => void) => (
    (callback = _), component
  );

  component.transition = (_: TransitionConfig) => (
    (behavior.duration(_.duration), (transition = _)), component
  );

  return component();
}
