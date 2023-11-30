import React from "react";

export const sans = "'Fira Sans', sans-serif" as const;
export const medium = `${14 / 16}rem` as const;
export const normal = 400 as const;

type Props = React.SVGProps<SVGSVGElement>;

export const Svg = React.forwardRef<SVGSVGElement, Props>(
  ({ children, width, height, ...props }, ref) => {
    return (
      <svg
        fontFamily={sans}
        fontSize={medium}
        height={height}
        preserveAspectRatio="xMinYMin meet"
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        {...props}
      >
        {children}
      </svg>
    );
  }
);
