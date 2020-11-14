import React, {Fragment, useState, useEffect} from 'react'
import Header from "../../layout/Header";
import DataBarChart from "../DataChart";
import PieChartComponent from "../PieChart";
import {pieChart, users} from "../../mockup";


export default function About({logged, userData, avatarUrl, setAvatarUrl}) {
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarchartData] = useState([]);

  useEffect(() => {
    getPieChartData();
    getBarChartData();
  }, [])
  const getPieChartData = () => {
    const continentsColors = ['#0088FE', '#00C49F', '#FFBB28', '#d37736', '#FF8042', '#ff3c42', '#764afe'];

    const result = Object.entries(pieChart).map(entry => {
      const [id, trip] = entry
      return {
        id,
        ...trip
      }
    })
    const distribution = result.reduce((result, next) => {
      result[next.name] = (result[next.name] || 0) + 1
      return result;
    }, {})
    const trips = Object.entries(distribution).map(([name, value]) => ({name, value}))
    const continentsWithColors = trips.map((continent, index) => ({...continent, color: continentsColors[index]}))
    setPieChartData(continentsWithColors)
  }

  const getBarChartData = () => {
    const fetched = Object.entries(users).map(entry => {
      const [a, b] = entry;
      return {
        a,
        ...b
      }
    });
    const usersWithDate = fetched.filter(({date}) => date)
    setBarchartData(usersWithDate)
  }
  if (!barChartData || barChartData.length === 0) return null

  return (
    <Fragment>
      <Header
        logged={logged}
        userData={userData}
        avatarUrl={avatarUrl}
        setAvatarUrl={setAvatarUrl}
      />
      <main className="wrapper">
        <div>
          <h1>About Page</h1>
          <PieChartComponent data={pieChartData}/>
          <DataBarChart data={barChartData}/>
        </div>
      </main>
    </Fragment>
  )
}
