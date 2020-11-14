import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Main from "../layout/Main";
import About from "./pages/About"
import AppState from "../context/app/AppState";
import Gate from "./Gate";

const Secure = () => {

  return (
    <AppState>
      <Gate>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/about" component={About}/>
            <Redirect to="/"/>
          </Switch>
        </BrowserRouter>
      </Gate>
    </AppState>
  );
};

export default Secure;
