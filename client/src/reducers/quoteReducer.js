
import { GET_QUOTES, ADD_QUOTE, ITEMS_LOADING, DELETE_QUOTE } from '../actions/types'

const initalState = {
  quotes: [],
  loading: false
}

export default function( state = initalState, action ) {
  switch(action.type) {
    case GET_QUOTES:
      return {
        ...state,
        quotes: action.payload,
        loading: false
      }
    case ADD_QUOTE:
      return {
        ...state,
        quotes: [action.payload, ...state.quotes],
        loading: false
      }
    case DELETE_QUOTE:
      return {
        ...state,
        quotes: state.quotes.slice().filter((quote) => quote._id !== action.payload),
        loading: false
      }
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }      
    default:
      return state;
  }
}