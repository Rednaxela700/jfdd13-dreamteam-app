import React, { useEffect } from 'react'

export default function Trip({ match }) {
  useEffect(() => {
    console.log(match.params)
    //eslint-disable-next-line
  }, [])
  return (
    <div>

    </div>
  )
}
