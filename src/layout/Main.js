import React, {Fragment, useState, useContext, useEffect} from 'react'
import Search from '../components/Search'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import Info from './Info'
import Recent from './Recent'
import AppContext from '../context/app/AppContext'
import {ShowLoader} from "../components/Loader";
import {getUserByUID, getUserData} from "../services/AuthService";

export default function Main() {
  const [fetched, setFetched] = useState(false)
  const appContext = useContext(AppContext);
  const {fetchTrips, user, setUserAuth, setUserData} = appContext;
  useEffect(() => {
    let timer;
    if (user) {
      (
        async () => {
          const data = await getUserData(user.id);
          setUserData(data)
        }
      )()
    }

    if (!fetched) {
      fetchTrips()
      if (!user) {
        setUserAuth();
      }
      timer = setTimeout(() => setFetched(true), 2000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
    //  eslint-disable-next-line
  }, [])
  if (!fetched) return <ShowLoader/>
  return (
    <Fragment>
      <Header/>
      <main className="wrapper">
        {user && <Search/>}
        {!user && <Fragment>
          <Hero/>
          <Info/>
          <Recent/>
        </Fragment>
        }
      </main>
      <Footer/>
    </Fragment>
  )
}
