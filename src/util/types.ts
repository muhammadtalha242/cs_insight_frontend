// import React from 'react';

// import {
//   DefaultTheme,
//   StyledComponent,
//   AnyStyledComponent,
//   StyledComponentInnerOtherProps,
//   StyledComponentPropsWithRef
// } from 'styled-components';

// export type PropsFromStyledComponent<C extends AnyStyledComponent> =
//   React.ComponentProps<C> &
//     StyledComponentPropsWithRef<C> &
//     Partial<StyledComponentInnerOtherProps<C>>;

// export type ReactOrStyledComponent<
//   Props extends Record<string, unknown>,
//   StyledProps extends Record<string, unknown> = any
// > =
//   | React.ComponentType<Props>
//   | StyledComponent<
//       React.ComponentType<StyledProps>,
//       DefaultTheme,
//       Props,
//       never
//     >;
