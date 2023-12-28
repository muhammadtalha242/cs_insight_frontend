import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  Bar
} from 'recharts';

type VerticalBarChartProps = {
  data: { count: number; year: number }[];
};

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 15
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
        <Bar type="natural" dataKey="count" stroke="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VerticalBarChart;
