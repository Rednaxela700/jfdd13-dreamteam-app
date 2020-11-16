import React from 'react'
import joinImg from '../assets/heroJoin.svg'
import shareImg from '../assets/heroSend.svg'
import discoverImg from '../assets/heroDiscover.svg'

export default function Info() {
  return (
    <section className="info">
      <h2 className="info__title section__title">How does it work?</h2>
      <div className="info__container">
        <figure className="info__item">
          <div className="info__img">
            <img src={joinImg} alt="" className='info__icon'/>
          </div>
          <h3 className="info__subtitle">join</h3>
          <figcaption className="info__text">Create an account and start your adventure with a few clicks!</figcaption>
        </figure>
        <figure className="info__item">
          <div className="info__img">
            <img src={shareImg} alt="" className='info__icon icon__share'/>
          </div>
          <h3 className="info__subtitle">share</h3>
          <figcaption className="info__text">Plan the trip of your dreams and share it with the community.</figcaption>
        </figure>
        <figure className="info__item">
          <div className="info__img">
            <img src={discoverImg} alt="" className='info__icon icon__discover'/>
          </div>
          <h3 className="info__subtitle">discover</h3>
          <figcaption className="info__text">Don’t feel like making your own trip? Look for a trip created by others.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
