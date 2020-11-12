import React, { Fragment, useState, useContext, useEffect } from 'react'
import Search from '../components/Search'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import Info from './Info'
import Recent from './Recent'
import AppContext from '../context/app/AppContext'
import {ShowLoader} from "../components/Loader";

export default function Main() {
  const [fetched, setFetched] = useState(false)
  const appContext = useContext(AppContext);
  const {loading, fetchTrips,trips, getPieChartData, user, setUserData} = appContext;
  useEffect(()=>{
    let timer;
    if(!fetched) {
      fetchTrips()
      if(trips) {
        getPieChartData(trips)
      }
      if(!user) {
        setUserData();
      }
       timer = setTimeout(()=> setFetched(true), 2000)
    }
    return () => {
      if(timer){
        clearTimeout(timer)
      }
    }
  },[])
  if(!fetched) return <ShowLoader/>
  return (
    <Fragment>
      <Header/>
      <main className="wrapper">
        {user && <Search />}
        {!user && <Fragment>
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
