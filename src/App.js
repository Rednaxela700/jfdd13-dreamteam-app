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
import Register from './screens/register/Register';
import Login from './screens/Login';
import LoggedUser from './screens/LoggedUser';
import Favicon from 'react-favicon';
import firebase from 'firebase'
import './styles/index.scss'

function App() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('')
  const currentUser = firebase.auth().currentUser.uid;

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      fetchUser(currentUser)
    }
    return () => setLoading(false)
    // eslint-disable-next-line
  }, [])

  const fetchUser = (user) => {
    const userId = user
    return firebase.database().ref('/users/' + userId).once('value')
      .then(function (snapshot) {
        var userObj = (snapshot.val() && snapshot.val()) || 'Anonymous';
        userObj.id = userId
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
              <Route exact strict path="/" component={Dashboard} />
              <Route exact strict path="/main" component={Dashboard} />
              <Route exact strict path="/search" component={Search} />
              <Route exact strict path="/panel" render={(props) => (
                <UserPanel {...props} data={userData} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />
              )} />
              <Route exact strict path="/register" component={Register} />
              <Route exact strict path="/login" component={Login} />
              <Route exact strict path="/user" component={LoggedUser} />
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
