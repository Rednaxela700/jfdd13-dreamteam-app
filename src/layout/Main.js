import React, { Fragment } from 'react'
import Header from './Header'
import Hero from './Hero'

export default function Main() {
  return (
    <Fragment>
      <Header />
      <main className="wrapper">
        <Hero />
      </main>
    </Fragment>
  )
}
