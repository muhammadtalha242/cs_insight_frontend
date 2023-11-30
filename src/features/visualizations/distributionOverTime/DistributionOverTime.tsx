import React from "react";
import BubbleLineChart, {
  BubbleLineChartProps,
} from "../../../components/visulaizations/charts/BubbleLineChart";

const DistributionOverTime: React.FC<BubbleLineChartProps> = ({ data }) => {
  return <BubbleLineChart data={data} />;
};

export default DistributionOverTime;
