import React, {useState, useEffect, useContext, Fragment} from 'react'
import AppContext from '../../context/app/AppContext'
import Header from "../../layout/Header";
import iconCalendar from '../../assets/iconCalendar.svg'
import iconCash from '../../assets/iconCash.svg'
import iconCompass from '../../assets/iconCompass.svg'
import btnAdd from '../../assets/btnAdd.svg'
import btnHeart from '../../assets/btnHeart.svg'
import Footer from "../../layout/Footer";
import {convertMonth} from "../DataChart";

export default function Trip({match}) {
  const [current, setCurrent] = useState(null);
  const appContext = useContext(AppContext);
  const {trips} = appContext;
  useEffect(() => {
    setCurrent(trips.find(el => el.id === match.params.tripid))
    return () => setCurrent(null)
    //eslint-disable-next-line
  }, [])
  if (!current) return null
  const {city, price, title, description, date, tripImageUrl} = current
  const heroBg = {
    background: `url(${tripImageUrl}) no-repeat center`,
  }
  const monthName = convertMonth(new Date(date).getMonth())
  return (
    <Fragment>
      <Header/>
      <main className="wrapper">
        <section className="site-trip">
          <header
            className="site-hero"
            style={heroBg}
          >
            <h1 className='site-trip__title'>{title}</h1>
            <div className="site-trip__container">
              <button className="site-trip__cta"><img src={btnAdd} alt=""/></button>
              <button className="site-trip__cta"><img src={btnHeart} alt=""/></button>
            </div>
          </header>
          <div className="site-details__container">
            <div className="site-details__categories">
              <figure className="icon__container">
                <div className="icon__item">
                  <img src={iconCash} alt=""/>
                </div>
                <figcaption className='icon__description'>From {price} EUR</figcaption>
              </figure>
              <figure className="icon__container">
                <div className="icon__item">
                  <img src={iconCalendar} alt=""/>
                </div>
                <figcaption className='icon__description'>{monthName}</figcaption>
              </figure>
              <figure className="icon__container">
                <div className="icon__item">
                  <img src={iconCompass} alt=""/>
                </div>
                <figcaption className='icon__description'>{city}</figcaption>
              </figure>
            </div>
            <p className="site-details__text">{description}</p>

          </div>
        </section>
      </main>
      <Footer/>
    </Fragment>
  )
}
