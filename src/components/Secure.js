import React, {useState, useEffect, useContext} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Login from "../screens/Login";
import Register from "../screens/Register";
import {ShowLoader} from "./Loader";
import Main from "../layout/Main";
import About from "./pages/About"
import App from "../App";
import AppState from "../context/app/AppState";

const Secure = () => {
  const [user, setUser] = useState(null);
  if (user) {
    return <AppState><App user={user}/></AppState>
  }
  return (
    <AppState>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/about" component={About}/>
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
    </AppState>
  );
};

export default Secure;
