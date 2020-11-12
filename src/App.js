import React, {useState, useEffect, useContext} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import About from "./components/pages/About";
import TripForm from "./components/Form/Form";
import Favorites from "./components/Favourites";
import Search from "./components/Search";
import UserPanel from './components/UserPanel';
import Favicon from 'react-favicon';
import firebase from 'firebase'
import './styles/index.scss'
import Main from './layout/Main';
import Trip from './components/Trip';
import AppContext from "./context/app/AppContext";


function App() {


  const appContext = useContext(AppContext);
  const {loading, user} = appContext;

  if (loading) return null
  return (
    <>
      <Favicon url="../public/favicon.ico" />
      <BrowserRouter>
        <Switch>
          <Route exact strict path="/" render={(props) => (
            <Main {...props}
              logged={true}
              // avatarUrl={avatarUrl}
              // setAvatarUrl={setAvatarUrl}
            />
          )}
          />
          <Route exact strict path="/about" component={About} />
          <Route exact strict path="/search" component={Search} />
          <Route exact strict path="/panel" render={(props) => (
            <UserPanel {...props}  avatarUrl={'avatarUrl'} setAvatarUrl={'setAvatarUrl'} />
          )} />
          <Route exact path="/trip/:tripid" component={Trip}></Route>
          {/* <Route exact strict path="/user" component={LoggedUser} /> */}
          <Route exact strict path="/form" component={TripForm} />
          <Route exact strict path="/favs" component={Favorites} />
          <Route component={() => <h1>404 -
                <span role="img" aria-label="error emoji">🧐</span>
          </h1>} />
        </Switch>
        <Redirect to="/" />
      </BrowserRouter>
    </>
  );
}

export default App;
