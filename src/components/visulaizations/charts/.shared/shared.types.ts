import type { BaseType, Selection } from 'd3-selection';
import type { SelectionOrTransition, Transition } from 'd3-transition';

export type T<
  G extends BaseType = any,
  Datum = any,
  P extends BaseType = any,
  PDatum = any
> = Transition<G, Datum, P, PDatum>;
export type S<
  G extends BaseType = any,
  Datum = any,
  P extends BaseType = any,
  PDatum = any
> = Selection<G, Datum, P, PDatum>;

export type Join<
  G extends BaseType = any,
  Datum = any,
  P extends BaseType = any,
  PDatum = any
> = SelectionOrTransition<G, Datum, P, PDatum> extends S<any, any, any, any>
  ? S<G, Datum, P, PDatum>
  : SelectionOrTransition<G, Datum, P, PDatum>;

export type JoinHandler<Base extends BaseType, Datum, This = any> = (
  this: This,
  s: S<Base, Datum>,
  t: T<BaseType, any> | undefined
) => void;
