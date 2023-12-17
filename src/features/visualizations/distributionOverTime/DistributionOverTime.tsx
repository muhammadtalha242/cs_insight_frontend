import React from "react";
import BubbleLineChart, {
  BubbleLineChartProps,
} from "../../../components/visulaizations/charts/BubbleLineChart";

const DistributionOverTime: React.FC<BubbleLineChartProps> = ({
  data,
  isExpanded,
}) => {
  return <BubbleLineChart data={data} isExpanded={isExpanded} />;
};

export default DistributionOverTime;
