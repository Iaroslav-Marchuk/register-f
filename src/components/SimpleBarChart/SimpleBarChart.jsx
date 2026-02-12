import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

function SimpleBarChart({ data, medium }) {
  return (
    <ResponsiveContainer width="100%" height={330}>
      <BarChart
        data={data}
        barCategoryGap="30%"
        margin={{
          top: 10,
          right: 10,
          left: 40,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 14 }} interval={0} />
        <YAxis width="auto" />
        <Tooltip
          content={({ payload }) => {
            if (!payload || !payload.length) return null;
            return (
              <div
                style={{
                  backgroundColor: 'var(--background)',
                  padding: '5px 10px',
                  border: '1px solid #ccc',
                }}
              >
                <span>{`${payload[0].value} m²`}</span>
              </div>
            );
          }}
        />
        {/* <Legend /> */}

        <ReferenceLine
          y={medium}
          stroke="var(--primary-foreground)"
          strokeDasharray="6 6"
          label={{
            value: `Média: ${medium}`,
            position: 'left',
            fill: 'var(--primary-foreground)',
            fontSize: 12,
          }}
        />
        <Bar
          dataKey="value"
          name="m²"
          fill="var(--secondary-foreground)"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SimpleBarChart;
