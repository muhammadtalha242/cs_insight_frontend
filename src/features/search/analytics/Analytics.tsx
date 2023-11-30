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
  // const [active, setActive] = useState<Point | LineData | undefined>();

  // // const points = useMemo(
  // //   () =>
  // //     data.reduce((acc, current) => {
  // //       acc.push(...current.points);

  // //       return acc;
  // //     }, [] as Point[]),
  // //   [data]
  // // );

  // const extentX = useMemo(
  //   () => d3.extent(data, (d) => d.x) as [number, number],
  //   [data]
  //   );
  //   const [domainX, setDomainX1] = useState(() => extentX);
  //   <BubbleLineChart
  //     active={active}
  //     colorMap={"rgb(70,156,221)"}
  //     data={data}
  //     domainX={domainX}
  //     interpolateX={false}
  //     axisFormatX="integer-without-grouping"
  //   />

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

  const visualizationsSelected: TabsProps["items"] = [
    {
      key: "line-chart",
      label: "Distribution of Papers",
      children:
        "Visualize the distribution of papers across different categories such as years, venues, or topics. Show trends in the number of papers over time.",
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

  // const papersPerYear = _.groupBy(papers, "year");
  // console.log("papersPerYear", papersPerYear);
  // const papersCountPerYear = Object.entries(papersPerYear).map(
  //   ([key, value]) => ({
  //     x1: key,
  //     x2: value.length,
  //     x3: 1,
  //   })
  // );
  // console.log("papersCountPerYear", papersCountPerYear);

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
