import React, {useReducer} from 'react'
import PublicReducer from './AppReducer'
import AppContext from './AppContext'
import {
  SET_USER_AUTH,
  SET_USER_DATA,
  GET_BARCHART_DATA,
  GET_PIECHART_DATA,
  FETCH_TRIPS,
  SET_ERROR,
  LOGOUT_USER,
} from '../types'
import firebase from "firebase";
import {getUserByUID, signOut} from "../../services/AuthService";

const AppState = props => {
  const initialState = {
    logged: false,
    user: null,
    pieChartData: null,
    barChartData: null,
    loading: false,
    trips: [],
    errors: [],
    continents: []
  }
  const [state, dispatch] = useReducer(PublicReducer, initialState)

  //  Actions
  const setUserAuth = async () => {
    try {
      await firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const userData = {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
            emailVerified: user.emailVerified,
            favourites: [],
            id: user.uid
          }
          dispatch({
            type: SET_USER_AUTH,
            payload: userData,
          })
        }
      });

    } catch (err) {
      setError({
        userData: {
          msg: "Failed to fetch user data, ",
          code: err.code
        }
      })
    }
  }

  const setUserData = (data) => {
    dispatch({
      type: SET_USER_DATA,
      payload: data
    })
  }


  const loginUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(err => {
        if (err.code) {
          setError({login: {msg: `Login failed! Fix ${err.code}`}})
        }
      })
      .then(() => setUserAuth());
  }

  const setError = (error) => {
    dispatch({
      type: SET_ERROR,
      payload: error
    })

  }

  const clearUser = () => {
    signOut().catch(err => setError({logout: {msg: err.code}}));
    dispatch({
      type: LOGOUT_USER
    })
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
    await getPieChartData(trips)
    dispatch({
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
      logged: state.logged,
      user: state.user,
      pieChartData: state.pieChartData,
      barChartData: state.barChartData,
      loading: state.loading,
      trips: state.trips,
      errors: state.errors,
      continents: state.continents,
      setUserData,
      setUserAuth,
      loginUser,
      fetchTrips,
      getPieChartData,
      clearUser
    }}
  >
    {props.children}
  </AppContext.Provider>

}

export default AppState;
