import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import userIcon from '../assets/navIcon.svg'
import { signout } from "../services/AuthService";


export default function Nav({ logged, userData }) {
  const [userOpened, setUserOpened] = useState(false);
  return (
    <header className="header">
      <div className="header__container">
        <div className="logo">
          <p>where<span className="logo--accent">to</span></p>
        </div>
        <nav className="nav">
          <ul className="nav__container">
            <li className="nav__item">
              <Link to="/" className="nav__link">Create</Link>
            </li>
            <li className="nav__item">
              {logged && <Link to="/" className="nav__link">Find</Link>}
              {!logged && <Link to="/register" className="nav__link">Join</Link>}
            </li>
            <li className="nav__item">
              <Link to="/" className="nav__link">About</Link>
            </li>
            <li className="nav__item">
              {logged && <button
                className="nav__link"
                onClick={() => setUserOpened(!userOpened)}
              >
                <img className="nav__icon" src={userIcon} alt="user icon" />
              </button>
              }
              {userOpened &&
                <div
                  style={{ position: "absolute", top: "4rem", right: "0" }}
                >this is {userData.email} user panel
                <div>
                    <button
                      onClick={() => signout()}
                    >sign out
                  </button>
                  </div>
                </div>
              }
              {
                !logged && <Link to="/login" className="nav__link">
                  <img className="nav__icon" src={userIcon} alt="user icon" />
                </Link>
              }
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
