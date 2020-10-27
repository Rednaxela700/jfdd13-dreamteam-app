import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

const windowWidth = window.screen.width;
const PieChartComponent = ({ data }) => {

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5 + 100;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#000" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${name}`}
      </text>
    );
  };
  return (<div>
    <PieChart
      width={windowWidth > 500 ? 700 : 300}
      height={windowWidth > 500 ? 350 : 250}
      style={{ margin: '0 auto' }}
    >
      <Pie
        data={data}
        labelLine={true}
        fill="#8884d8"
        dataKey="value"
        label={renderCustomizedLabel}
      >
        {
          data.map((entry, index) => <Cell key={`cell-${entry.name}`} fill={entry.color} >
          </Cell>)
        }
      </Pie>
      <Tooltip />
    </PieChart>
  </div>)
}

export default PieChartComponent
