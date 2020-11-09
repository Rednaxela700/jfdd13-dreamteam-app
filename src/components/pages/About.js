import React, {Fragment} from 'react'
import Header from "../../layout/Header";
import DataBarChart from "../DataChart";
import PieChartComponent from "../PieChart";
import '../../mockup'

export default function About({logged, userData, avatarUrl, setAvatarUrl}) {
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
          <DataBarChart/>
          <PieChartComponent/>
        </div>
      </main>
    </Fragment>
  )
}
