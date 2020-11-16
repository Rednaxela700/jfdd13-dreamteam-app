import React, {useContext} from 'react';
import AppContext from "../context/app/AppContext";
import App from "../App";
import {ShowLoader} from "./Loader";

function Gate(props) {

  const appContext = useContext(AppContext);
  const {loading, logged} = appContext;
  if(loading) {
    return <ShowLoader/>
  }
  if (logged) {
    return <App/>
  }
  return props.children
}

export default Gate;