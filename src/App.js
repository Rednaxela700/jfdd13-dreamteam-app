import React, { useState, useEffect } from 'react';
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

function App({ user }) {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      fetchUser(user)
    }
    return () => setLoading(false)
    // eslint-disable-next-line
  }, [user])

  const fetchUser = (user) => {
    return firebase.database().ref('/users/' + user).once('value')
      .then(function (snapshot) {
        var userObj = (snapshot.val() && snapshot.val()) || 'Anonymous';
        userObj.id = user
        setUserData(userObj)
        setLoading(false);
      });
  }

  if (loading) return null
  return (
    <>
      <Favicon url="../public/favicon.ico" />
      <BrowserRouter>
        <Switch>
          <Route exact strict path="/" render={(props) => (
            <Main {...props}
              userData={userData}
              logged={true}
              avatarUrl={avatarUrl}
              setAvatarUrl={setAvatarUrl}
            />
          )}
          />
          <Route exact strict path="/about" component={About} />
          <Route exact strict path="/search" component={Search} />
          <Route exact strict path="/panel" render={(props) => (
            <UserPanel {...props} data={userData} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />
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
