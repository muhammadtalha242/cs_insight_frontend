import * as d3 from "d3";
import {
  LineChart,
  DotProps,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

import papersCountPerYear from "../../../../public/paper-count-per-year.json";

const max = d3.max(papersCountPerYear, (d) => d.count) || 1;

const CustomizedToolTipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Year: ${label}`}</p>
        <p className="label">{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Dot = (props: DotProps) => {
  return <></>;
};

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
          dot={Dot}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
