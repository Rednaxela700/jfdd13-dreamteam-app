import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <p>where<span className="logo--accent">to</span></p>
      </Link>
    </div>
  )
}
