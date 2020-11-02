import React from 'react'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <h1 className="hero__title">
          The new way to <br />rediscover the world.
          </h1>
        <p className="hero__subtitle">Make a trip that suits you.</p>
        <div className="">
          <button type="submit" className="cta hero__cta">register now</button>
        </div>
      </div>
    </section>
  )
}
