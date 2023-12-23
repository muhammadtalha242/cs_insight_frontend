import React, { useState } from "react";

import { Select } from "antd";

import BarChartReChart from "../../../../../components/visulaizations/charts/BarChart.reactchart";
import LineChart from "../../../../../components/visulaizations/charts/LineChart.reactchart";
import VisualizationsContainer from "../VisualizationsContainer";

const VISUALIZATIONS_OPTIONS = [
  { label: "Line Chart", value: "line-chart" },
  { label: "Bar Chart", value: "bar-chart" },
];

const DistributionOverTime: React.FC = () => {
  const [currentVisualization, setCurrentVisualization] =
    useState("line-chart");
  const onSelectHandle = (value: string) => {
    setCurrentVisualization(value);
  };

  return (
    <div>
      asdasdask
      <LineChart />
    </div>
  );
};

export default DistributionOverTime;
