import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper wrapper">
        <div className="footer__container">
          <div className="footer__logo logo">
            <h3 className="logo__title">
              where<span>to</span>
            </h3>
            <p className="logo__subtitle">
              Time to rediscover the world.
            </p>
          </div>
          <nav className="footer__nav">
            <ul className="nav__container">
              <li className="nav__item">
                <h3 className="footer__subtitle">Contact</h3>
              </li>
              <li className="nav__item">
                <a href="mailto:aleksander.walczuk@aol.com" className="footer__link nav__link">aleksander.walczuk@aol.com</a>
              </li>
              <li className="nav__item">
                <a href="tel:0048537777734" className="footer__link nav__link">+48 537-777-734</a>
              </li>
              <li className="nav__item">
                <a href="https://goo.gl/maps/5ZjafHQABXzqbgMn8" className="footer__link nav__link">80-389, Gdańsk</a>
              </li>
            </ul>
            <ul className="nav__container">
              <li className="nav__item">
                <h3 className="footer__subtitle">Info</h3>
              </li>
              <li className="nav__item">
                <Link to="/" className="footer__link nav__link">About</Link>
                <Link to="/" className="footer__link nav__link">Privacy Policy</Link>
              </li>
            </ul>
            <ul className="nav__container">
              <li className="nav__item">
                <h3 className="footer__subtitle">Connect</h3>
              </li>
              <li className="nav__item">
                <a href="https://github.com/Rednaxela700" className="footer__link nav__link">Github</a>
                <a href="https://www.linkedin.com/in/aleksander-walczuk/" className="footer__link nav__link">LinkedIn</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer__container">
          <p>&copy;All rights reserved</p>
          <p>Made with ♥ </p>
        </div>
      </div>
    </footer>
  )
}
