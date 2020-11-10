import {
  SET_USER_DATA,
  GET_BARCHART_DATA,
  GET_PIECHART_DATA, FETCH_TRIPS, LOGIN_USER,
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    case GET_PIECHART_DATA:
      return {
        ...state,
        pieChartData: action.payload,
        loading: false

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
    default :
      return state;
  }
}