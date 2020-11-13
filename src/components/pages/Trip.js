import React, {useState, useEffect, useContext, Fragment} from 'react'
import AppContext from '../../context/app/AppContext'
import Header from "../../layout/Header";
import iconCalendar from '../../assets/iconCalendar.svg'
import iconCash from '../../assets/iconCash.svg'
import iconCompass from '../../assets/iconCompass.svg'

export default function Trip({match}) {
  const [current, setCurrent] = useState(null);
  const appContext = useContext(AppContext);
  const {trips} = appContext;
  useEffect(() => {
    setCurrent(trips.find(el => el.id === match.params.tripid))
    //eslint-disable-next-line
    return ()=> setCurrent(null)
  }, [])
  if (!current) return null
  const {city, price, title, description, date, tripImageUrl} = current
  const heroBg = {
    background: `url(${tripImageUrl}) no-repeat center`,
  }
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
          <div className="site-details__container">
            <div className="site-details__categories">
              <figure className="icon__container"><img src={iconCash} alt="" className="icon__item"/>
                <figcaption className='icon__description'>From 60EUR</figcaption>
              </figure>
              <figure className="icon__container"><img src={iconCalendar} alt="" className="icon__item"/>
                <figcaption className='icon__description'>{date}</figcaption>
              </figure>
              <figure className="icon__container"><img src={iconCash} alt="" className="icon__item"/>
                <figcaption className='icon__description'>From 60EUR</figcaption>
              </figure>
            </div>
            <p className="site-details__text">{description}</p>
            
          </div>
        </section>
      </main>
    </Fragment>
  )
}
