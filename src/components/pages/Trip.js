import React, {useState, useEffect, useContext, Fragment} from 'react'
import AppContext from '../../context/app/AppContext'
import Header from "../../layout/Header";

export default function Trip({match}) {
  const [current, setCurrent] = useState(null);
  const appContext = useContext(AppContext);
  const {trips} = appContext;
  useEffect(() => {
    setCurrent(trips.find(el => el.id = match.params))
    //eslint-disable-next-line
  }, [])
  return (
    <Fragment>
      <Header/>
      <div>

      </div>
    </Fragment>
  )
}
