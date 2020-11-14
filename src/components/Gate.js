import React, {useContext} from 'react';
import AppContext from "../context/app/AppContext";
import App from "../App";
import {ShowLoader} from "./Loader";

function Gate(props) {

  const appContext = useContext(AppContext);
  const {loading, user} = appContext;
  if(loading) {
    return <ShowLoader/>
  }
  if (user) {
    return <App/>
  }
  return props.children
}

export default Gate;