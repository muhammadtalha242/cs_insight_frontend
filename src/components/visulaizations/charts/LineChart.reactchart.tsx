import React from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from 'recharts';

import papersCountPerYear from '../../../../public/paper-count-per-year.json';

export default function LineChartReChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={papersCountPerYear}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year">
          <Label value="Years" position="bottom" />
        </XAxis>
        <YAxis>
          <Label
            value="Papers"
            angle={-90}
            textAnchor="middle"
            position="insideLeft"
          />
        </YAxis>
        {/* <Tooltip content={<CustomizedToolTipContent />} /> */}
        <Tooltip />
        <Line
          type="natural"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
