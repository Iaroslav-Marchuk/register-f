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
import { formatNumber } from '../../helpers/formatters.js';

function SimpleBarChart({ data, medium }) {
  return (
    <ResponsiveContainer width="100%" height={330}>
      <BarChart
        data={data}
        barCategoryGap="30%"
        margin={{
          top: 20,
          right: 10,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 14 }} interval={0} />
        <YAxis width="auto" tickFormatter={value => formatNumber(value)} />
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
                <span>{`${formatNumber(payload[0].value)} m²`}</span>
              </div>
            );
          }}
        />
        {/* <Legend /> */}

        <ReferenceLine
          y={medium}
          stroke="var(--primary-foreground)"
          strokeDasharray="6 6"
          label={({ viewBox }) => {
            const { x, y } = viewBox;
            const paddingX = 6;
            const paddingY = 2;
            const fontSize = 12;
            const text = `Média: ${formatNumber(medium)} m²`;
            const textWidth = text.length * 6; // приблизна ширина

            // додаткове підняття над лінією
            const offsetY = 4; // пікселів над ReferenceLine

            return (
              <g>
                {/* фон */}
                <rect
                  x={x + 5}
                  y={y - fontSize - paddingY - offsetY}
                  width={textWidth + paddingX * 2}
                  height={fontSize + paddingY * 2}
                  rx={4}
                  fill="var(--background)"
                />

                {/* текст */}
                <text
                  x={x + 5 + paddingX}
                  y={y - paddingY - offsetY}
                  fill="var(--primary-foreground)"
                  fontSize={fontSize}
                  textAnchor="start"
                  dominantBaseline="auto"
                >
                  {text}
                </text>
              </g>
            );
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
