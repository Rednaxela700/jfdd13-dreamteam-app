import React, { Fragment, useContext, useEffect } from 'react'
import Search from '../components/Search'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import Info from './Info'
import Recent from './Recent'
import AppContext from '../context/app/AppContext'
import {ShowLoader} from "../components/Loader";

export default function Main({ userData, logged, avatarUrl, setAvatarUrl }) {
  const appContext = useContext(AppContext);
  const {loading, fetchTrips,trips, getPieChartData} = appContext;
  useEffect(()=>{
    fetchTrips()
    if(trips) {
      getPieChartData(trips)
    }
  },[])
  if(loading) return <ShowLoader/>
  return (
    <Fragment>
      <Header
        logged={logged}
        userData={userData}
        avatarUrl={avatarUrl}
        setAvatarUrl={setAvatarUrl}
      />
      <main className="wrapper">
        {logged && <Search userData={userData} />}
        {!logged && <Fragment>
          <Hero />
          <Info />
          <Recent />
        </Fragment>
        }
      </main>
      <Footer />
    </Fragment>
  )
}
