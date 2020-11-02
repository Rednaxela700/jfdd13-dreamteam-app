import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/Navbar";
import Dashboard from "./components/Dashboard";
import TripForm from "./components/Form/Form";
import Favorites from "./components/Favourites";
import Search from "./components/Search";
import Appbar from "./layout/Appbar";
import UserPanel from './components/UserPanel';
import Register from './screens/Register';
import Login from './screens/Login';
import Favicon from 'react-favicon';
import firebase from 'firebase'
import './styles/index.scss'
import Main from './layout/Main';

function App({ user }) {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('')
  const currentUser = user

  useEffect(() => {
    if (!loading) {
      setLoading(false);
      fetchUser(currentUser)
    }
    return () => setLoading(false)
    // eslint-disable-next-line
  }, [])

  const fetchUser = (user) => {
    return firebase.database().ref('/users/' + user).once('value')
      .then(function (snapshot) {
        var userObj = (snapshot.val() && snapshot.val()) || 'Anonymous';
        // userObj.id = userId
        setUserData(userObj)
        setLoading(false);
      });
  }

  if (loading) return null
  return (
    <>
      <Favicon url="../public/favicon.ico" />
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <main className={'main'}>
            <Appbar />
            <Switch>
              <Route exact strict path="/" render={(props) => (
                <Main {...props} userData={userData} logged={true}  />
              )}
              />
              <Route exact strict path="/main" component={Dashboard} />
              <Route exact strict path="/search" component={Search} />
              <Route exact strict path="/panel" render={(props) => (
                <UserPanel {...props} data={userData} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />
              )} />
              <Route exact strict path="/register" component={Register} />
              <Route exact strict path="/login" component={Login} />
              {/* <Route exact strict path="/user" component={LoggedUser} /> */}
              <Route exact strict path="/form" component={TripForm} />
              <Route exact strict path="/favs" component={Favorites} />
              <Route component={() => <h1>404 - sadface</h1>} />
            </Switch>
          </main>
        </div>
        <Redirect to="/" />
      </BrowserRouter>
    </>
  );
}

export default App;
