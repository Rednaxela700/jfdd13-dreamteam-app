import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import firebase from "firebase";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { ShowLoader } from "./Loader";
import Main from "../layout/Main";
import App from "../App";

const Secure = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(false);
      }
    });
  }, []);

  if (user == null) {
    return ShowLoader()

  }

  if (user === false) {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  if (user) {
    return <App user={user}/>
  }
};

export default Secure;
