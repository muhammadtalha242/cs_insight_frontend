import React, { useState } from "react";

import VisualizationsContainer from "../VisualizationsContainer";
import LineChart from "../../../../../components/visulaizations/charts/LineChart.reactchart";
import BarChartReChart from "../../../../../components/visulaizations/charts/BarChart.reactchart";
import { Select } from "antd";

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
    <VisualizationsContainer>
      <Select
        options={VISUALIZATIONS_OPTIONS}
        onChange={onSelectHandle}
        defaultValue={currentVisualization}
      />
      {currentVisualization === "line-chart" ? (
        <LineChart />
      ) : (
        <BarChartReChart />
      )}
    </VisualizationsContainer>
  );
};

export default DistributionOverTime;
