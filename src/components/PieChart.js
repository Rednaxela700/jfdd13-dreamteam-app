import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import { fetchTrips } from "../services/TripService";

const data = [
  { name: 'Azja', value: 423 },
  { name: 'Europa', value: 313 },
  { name: 'Ameryka', value: 241 },
  { name: 'Afryka', value: 87 },
  { name: 'Ameryka Południowa', value: 328 },
  { name: 'Antarktyda', value: 56 },
  { name: 'Australia', value: 81 }
];
const windowWidth = window.screen.width;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#d37736', '#FF8042', '#ff3c42', '#764afe'];

export const PieChartComponent = () => {
  const [fetched, setFetched] = useState(false)
  const [tripsData, setTripsData] = useState([])

  useEffect(() => {
    if (!fetched) {
      fetchTrips().then(res => {
        const distribution = res.reduce((result, next) => {
          result[next.continent] = (result[next.continent] || 0) + 1
          return result;
        }, {})
        console.log(distribution)
        const tripsData = Object.entries(distribution).map(([name, value]) => ({ name, value }))
        setTripsData(tripsData)
        setFetched(true)
      });
    }
    return () => setFetched(true)
  }, [])

  if (!fetched) {
    return null
  }

  return (
    <PieChart
      width={windowWidth > 500 ? 500 : 300}
      height={windowWidth > 500 ? 350 : 250}
      style={{ margin: '0 auto' }}
    >
      <Pie
        data={tripsData}
        labelLine={true}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
      <Tooltip />
    </PieChart>
  )

}
