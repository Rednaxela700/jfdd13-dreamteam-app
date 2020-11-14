import React from 'react'
import {Link} from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <h1 className="hero__title">
          The new way to <br />rediscover the world.
          </h1>
        <p className="hero__subtitle">Make a trip that suits you.</p>
        <div className="">
          <Link to='/register' className="cta hero__cta">register now</Link>
        </div>
      </div>
    </section>
  )
}
