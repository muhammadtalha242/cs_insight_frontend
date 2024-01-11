import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';

type LineChartProps = {
  data: { count: number; year: number }[];
};

const SingleLineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
          {/* <Label
            value="Papers"
            angle={-90}
            textAnchor="middle"
            position="insideLeft"
          /> */}
        </YAxis>
        {/* <Tooltip content={<CustomizedToolTipContent />} /> */}
        <Tooltip />
        <Line
          type="natural"
          dataKey="count"
          stroke="#8884d8"
          dot={false}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SingleLineChart;
