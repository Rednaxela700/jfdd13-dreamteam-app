import {
  SET_USER_DATA,
  GET_BARCHART_DATA,
  GET_PIECHART_DATA,
  FETCH_TRIPS,
  LOGIN_USER,
  SET_ERROR,
  LOGOUT_USER,
  SET_USER_AUTH
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case SET_USER_AUTH:
      return {
        ...state,
        user: action.payload,
        logged: !!action.payload,
        loading: false
      }
    case SET_USER_DATA:
      return {
        ...state,
        user: {...state.user, ...action.payload},
        loading: false
      }
    case GET_PIECHART_DATA:
      return {
        ...state,
        pieChartData: action.payload,
        continents: action.payload.map(continent => continent.name)

      }
    case GET_BARCHART_DATA:
      return {
        ...state,
        barChartData: action.payload
      }
    case FETCH_TRIPS:
      return {
        ...state,
        trips: action.payload,
      }
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        logged: false
      }
    case SET_ERROR:
      return {
        ...state,
        errors: [
          ...state.errors,
          action.payload
        ]
      }
    default :
      return state;
  }
}