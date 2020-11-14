import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import userIcon from '../assets/navIcon.svg'
import Card from './Card';
import AppContext from '../context/app/AppContext'

export default function Header() {
  const appContext = useContext(AppContext);
  const [userOpened, setUserOpened] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const {user} = appContext;

  const handleScroll = () => {
    const domRef = document.querySelector(".header")
    if (domRef) {
      if (window.scrollY > 50) {
        document.querySelector(".header").classList.add("header--scrolled")
      } else {
        document.querySelector(".header").classList.remove("header--scrolled")
      }
    }
  }
  return (
    <header className={`header${user ? " logged" : null}`}>
      <div className="header__container">
        <Link to='/' className="logo">
          <p>where<span className="logo--accent">to</span></p>
        </Link>
        <nav className="nav">
          <ul className="nav__container">
            <li className="nav__item">
              <Link to="/create" className="nav__link">Create</Link>
            </li>
            <li className="nav__item">
              {user ?
                <Link to="/" className="nav__link">Find</Link>
                :
                <Link to="/register" className="nav__link">Join</Link>
              }
            </li>
            <li className="nav__item">
              <Link to="/about" className="nav__link">About</Link>
            </li>
            <li className="nav__item">
              {user && <button
                className="nav__link"
                onClick={() => setUserOpened(!userOpened)}
              >
                <img className="nav__icon" src={userIcon} alt="user icon"/>
              </button>
              }
              {userOpened && <Card/>}
              {
                !user && <Link to="/login" className="nav__link">
                  <img className="nav__icon" src={userIcon} alt="user icon"/>
                </Link>
              }
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
