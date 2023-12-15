import React, { useEffect, useRef, useState } from "react";
import BubbleLineChart, {
  BubbleLineChartProps,
} from "../../../components/visulaizations/charts/BubbleLineChart";
import useComponentSize from "@rehooks/component-size";

const DistributionOverTime: React.FC<
  Omit<BubbleLineChartProps, "dimensions">
> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // let { width, height } = useComponentSize(containerRef);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size update

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", backgroundColor: "lightblue" }}
    >
      <BubbleLineChart
        data={data}
        dimensions={{ width: size.width, height: size.height }}
        // dimensions={{ width, height }}
      />
    </div>
  );
};

export default DistributionOverTime;
