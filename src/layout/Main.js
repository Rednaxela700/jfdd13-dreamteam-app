import React, { Fragment } from 'react'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import Info from './Info'
import Recent from './Recent'

export default function Main() {
  return (
    <Fragment>
      <Header />
      <main className="wrapper">
        <Hero />
        <Info/>
        <Recent/>
      </main>
      <Footer/>
    </Fragment>
  )
}
