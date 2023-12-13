import React, { useRef } from "react";
import BubbleLineChart, {
  BubbleLineChartProps,
} from "../../../components/visulaizations/charts/BubbleLineChart";
import useComponentSize from "@rehooks/component-size";

const DistributionOverTime: React.FC<Omit<BubbleLineChartProps, "ref">> = ({
  data,
}) => {
  const chartRef = useRef<null>(null);

  let { width, height } = useComponentSize(chartRef);
  console.log("width, height ", width, height);

  return (
    <div style={{ outline: "1px solid" }} ref={chartRef}>
      <BubbleLineChart data={data} />
    </div>
  );
};

export default DistributionOverTime;
