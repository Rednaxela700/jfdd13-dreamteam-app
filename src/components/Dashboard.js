import React, { useState, useEffect } from 'react';
import PieChartComponent from "./PieChart";
import { Grid, Loader } from "semantic-ui-react";
import DataBarChart from "./DataChart";
import { fetchTrips } from "../services/TripService";


function Dashboard() {
  const [loading, setLoading] = useState(false)
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(()=> {
    setLoading(true)
    handlePieChartData();
    setLoading(false)
    // eslint-disable-next-line
  }, [])


  const handlePieChartData = async () => {
    const continentsColors = ['#0088FE', '#00C49F', '#FFBB28', '#d37736', '#FF8042', '#ff3c42', '#764afe'];

    const result = await fetchTrips()
    const distribution = result.reduce((result, next) => {
      result[next.continent] = (result[next.continent] || 0) + 1
      return result;
    }, {})
    const trips = Object.entries(distribution).map(([name, value]) => ({ name, value }))
    const continentsWithColors = trips.map((continent, index) => ({ ...continent, color: continentsColors[index] }))
    setPieChartData(continentsWithColors)

  }
  if(loading) return <Loader/>
  return (
    <div className="Dashboard">
      <Grid padded={true}>
        <Grid.Row>
          <Grid.Column>
            <h2>Planowanie podróży nigdy nie było tak proste i przyjemne</h2>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column widescreen={8} largeScreen={8} mobile={16}>
            <PieChartComponent data={pieChartData} loading={loading} />
          </Grid.Column>
          <Grid.Column widescreen={8} largeScreen={8} mobile={16} verticalAlign={'middle'}>
            <DataBarChart />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered={true}>
          <Grid.Column width={8} verticalAlign={'middle'}>
            <h3>Z WAY.TO pojedziesz do:</h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ul className={'pieUl'}>
                <li className={'pieLi pieLi__asia'}>Azji</li>
                <li className={'pieLi pieLi__europe'}>Europy</li>
                <li className={'pieLi pieLi__northamerica'}>Północnej Ameryki</li>
                <li className={'pieLi pieLi__africa'}>Afryki</li>
              </ul>
              <ul className={'pieUl'}>
                <li className={'pieLi pieLi__southamerica'}>Ameryki Południowej</li>
                <li className={'pieLi pieLi__antarctica'}>Antarktydy</li>
                <li className={'pieLi pieLi__australia'}>Australii</li>
              </ul>
            </div>
          </Grid.Column>
          <Grid.Column width={8} verticalAlign={'middle'} style={{ height: '100%' }}>
            <h3>Podróż na każdą kieszeń, zawsze.</h3>
            <div>
              <ul style={{ listStyle: 'none' }}>
                <li>Wyjdź z domu i poczuj się turystą we własnym mieście</li>
                <li>Skorzystaj z formularza i dodaj swoją wycieczkę</li>
                <li>Wracaj do swoich najlepszych lokalizacji z pomocą ulubionych</li>

              </ul>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}


export default Dashboard