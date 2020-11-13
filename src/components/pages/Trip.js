import React, {useState, useEffect, useContext, Fragment} from 'react'
import AppContext from '../../context/app/AppContext'
import Header from "../../layout/Header";

export default function Trip({match}) {
  const [current, setCurrent] = useState(null);
  const appContext = useContext(AppContext);
  const {trips} = appContext;
  useEffect(() => {
    setCurrent(trips.find(el => el.id = match.params.tripid))
    //eslint-disable-next-line
    return ()=> setCurrent(null)
  }, [])
  if (!current) return null
  const {city, price, title, description, date, tripImageUrl} = current
  const heroBg = {backgroundImage: `url(${tripImageUrl})`}
  return (
    <Fragment>
      <Header/>
      <main className="wrapper">
        <section className="site-trip">
          <header
            className="site-hero"
            style={heroBg}
          >

          </header>
        </section>
      </main>
    </Fragment>
  )
}
