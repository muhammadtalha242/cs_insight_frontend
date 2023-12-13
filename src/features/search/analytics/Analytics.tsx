import React, { useMemo, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import _ from "lodash";

import papersCountPerYear from "../../../../public/paper-count-per-year.json";

import DistributionOverTime from "../../visualizations/distributionOverTime/DistributionOverTime";

export type ColorMap = Record<string, string>;

export const Analytics: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const data = papersCountPerYear;

  const visualizationsAll: TabsProps["items"] = [
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
