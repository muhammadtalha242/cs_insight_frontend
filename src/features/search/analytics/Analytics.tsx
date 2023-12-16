import React, { useMemo, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import _ from "lodash";

import papersCountPerYear from "../../../../public/paper-count-per-year.json";

import DistributionOverTime from "../../visualizations/distributionOverTime/DistributionOverTime";

export type ColorMap = Record<string, string>;
const data = papersCountPerYear;

export const visualizationsAll: TabsProps["items"] = [
  {
    key: "line-chart",
    label: "Distribution of Papers",
    children: <DistributionOverTime data={data} />,
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];
export const Analytics: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const visualizationsSelected: TabsProps["items"] = [];

  return (
    <>
      <Tabs
        defaultActiveKey="line-chart"
        items={visualizationsAll}
        onChange={onChange}
      />
    </>
  );
};
