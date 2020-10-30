import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="logo"><p>where<span className="logo--accent">to</span></p></div>
        <nav className="nav">
          <ul className="nav__container">
            <li className="nav__item">
              <Link to="/" className="nav__link">Create</Link>
            </li>
            <li className="nav__item">
              <Link to="/" className="nav__link">Join</Link>
            </li>
            <li className="nav__item">
              <Link to="/" className="nav__link">About</Link>
            </li>
            <li className="nav__item">
              <Link to="/" className="nav__link">ikona</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
