import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  { month: "Jan", income: 3200, momGrowth: 20 },
  { month: "Feb", income: 4800, momGrowth: 40 },
  { month: "Mar", income: 7000, momGrowth: 30 },
  { month: "Apr", income: 3000, momGrowth: -60 },
  { month: "May", income: 5000, momGrowth: 60 },
  { month: "Jun", income: 0, momGrowth: -100 },
];

const IncomeTrend = () => {
  return (
    <div className="w-full  mx-auto p-4 border border-gray-200 rounded-2xl">
      <h3 className="text-gray-500 font-semibold">Income Trend</h3>
      <p className="text-gray-500 text-sm mb-6 mt-2">
        Your monthly income and growth for the last 6 months.
      </p>

      <div className="w-full h-64 sm:h-80">
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#6B7280" }} />
            <YAxis
              yAxisId="left"
              tick={{ fill: "#6B7280" }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#6B7280" }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              formatter={(value, name) =>
                name === "income" ? `$${value}` : `${value}%`
              }
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="income"
              barSize={30}
              fill="#A855F7"
              name="income"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="momGrowth"
              stroke="#7F1D1D"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="momGrowth"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeTrend;
