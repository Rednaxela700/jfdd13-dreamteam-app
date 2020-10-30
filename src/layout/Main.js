import React, { Fragment } from 'react'
import Header from './Header'
import Hero from './Hero'
import Info from './Info'

export default function Main() {
  return (
    <Fragment>
      <Header />
      <main className="wrapper">
        <Hero />
        <Info/>
      </main>
    </Fragment>
  )
}
