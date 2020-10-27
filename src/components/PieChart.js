import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';

const windowWidth = window.screen.width;
const PieChartComponent = ({data, loading}) => {

  if(loading) return null

  return (<div>
    <PieChart
      width={windowWidth > 500 ? 500 : 300}
      height={windowWidth > 500 ? 350 : 250}
      style={{ margin: '0 auto' }}
    >
      <Pie
        data={data}
        labelLine={true}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
        }
      </Pie>
      <Tooltip />
    </PieChart>
  </div>)
}

export default PieChartComponent
