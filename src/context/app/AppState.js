import React, {useReducer} from 'react'
import PublicReducer from './AppReducer'
import AppContext from './AppContext'
import {
  SET_USER_DATA,
  GET_BARCHART_DATA,
  GET_PIECHART_DATA,
  FETCH_TRIPS,
  LOGIN_USER,
} from '../types'
import {login} from "../../services/AuthService";
import firebase from "firebase";
import {pieChart} from "../../mockup";

const AppState = props => {
  const initialState = {
    user: null,
    pieChartData: null,
    barChartData: null,
    loading: false,
    trips: null
  }
  const [state, dispatch] = useReducer(PublicReducer, initialState)

  //  Actions
  const setUserData = async (user) => {
    const loggedUser = await firebase.auth().onAuthStateChanged(user => user);
    dispatch({
      type: SET_USER_DATA,
      payload: loggedUser
    })
  }

  const loginUser = async (email, password) => {
    const getUserId = () => {
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          return res.user.uid
        })
    }

    const dbRef = await firebase.database().ref('/users/' + await getUserId())
    let userObj
    {
      let user = firebase.auth().currentUser;

      let name, email, photoUrl, uid, emailVerified;

      if (user != null) {
        userObj = {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          emailVerified: user.emailVerified,
          id: user.uid  // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.}
        }
      }
    }
    dispatch({
      type: LOGIN_USER,
      payload: userObj
    });
  }

  const fetchTrips = async () => {

    const dataSnapshot = await firebase.database().ref('/trips').once('value')
    const tripsFromFirebase = dataSnapshot.val()
    const trips = Object.entries(tripsFromFirebase).map(entry => {
      const [id, trip] = entry
      return {
        id,
        ...trip
      }
    })
    dispatch({
      loading: true,
      type: FETCH_TRIPS,
      payload: trips,
    });
  }
  const getPieChartData = (trips) => {
    const continentsColors = ['#0088FE', '#00C49F', '#FFBB28', '#d37736', '#FF8042', '#ff3c42', '#764afe'];

    const distribution = trips.reduce((result, next) => {
      result[next.continent] = (result[next.continent] || 0) + 1
      return result;
    }, {})
    const arr = Object.entries(distribution).map(([name, value]) => ({name, value}))
    const continentsWithColors = arr.map((continent, index) => ({...continent, color: continentsColors[index]}))
    dispatch({
      type: GET_PIECHART_DATA,
      payload: continentsWithColors
    })

  }

  return <AppContext.Provider
    value={{
      user: state.user,
      pieChartData: state.pieChartData,
      barChartData: state.barChartData,
      loading: state.loading,
      trips: state.trips,
      setUserData,
      loginUser,
      fetchTrips,
      getPieChartData
    }}
  >
    {props.children}
  </AppContext.Provider>

}

export default AppState;

