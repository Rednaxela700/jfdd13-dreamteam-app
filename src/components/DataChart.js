import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { fetchUsers } from "../services/TripService";

const windowWidth = window.screen.width;
export const DataBarChart = () => {
  const [usersData, setUsersData] = useState([])
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    if (!fetched) {
      const data = fetchUsers();
      data.then(res => {
        setUsersData(res)
        setFetched(true)
      })
    }
    return () => setFetched(true)
  }, [fetched])

  const data = () => [

    {
      name: 'Listopad',
      mobileName: '08',
      uv: 2,
      pv: 2,
      amt: 2,
    },
    {
      name: 'Grudzień',
      mobileName: '10',
      uv: usersData.length,
      pv: 3908,
      amt: 2000,
    }
  ]
  if (!fetched) {
    return null
  }
  return (
    <BarChart
      width={windowWidth > 500 ? 500 : 300}
      height={windowWidth > 500 ? 300 : 150}
      data={data()}
      style={{ margin: '0 auto' }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={windowWidth > 500 ? "name" : "mobileName"} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" fill="#82ca9d" name={'Liczba zarejestrowanych użytkowników'} />
    </BarChart>
  )

}
