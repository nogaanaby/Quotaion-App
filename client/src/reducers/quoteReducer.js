
import { GET_QUOTES, ADD_QUOTE, QUOTES_LOADING, DELETE_QUOTE } from '../actions/types'

const initalState = {
  quotes: [],
  quotesLoading: false
}

export default function( state = initalState, action ) {
  switch(action.type) {
    case GET_QUOTES:
      return {
        quotesLoading: false,
        quotes: action.payload
      }
    case ADD_QUOTE:
      return {
        quotes: [action.payload, ...state.quotes],
        quotesLoading: false
      }   
    case DELETE_QUOTE:
      return {
        quotes: state.quotes.slice().filter((quote) => quote._id !== action.payload),
        quotesLoading: false
      }
    case QUOTES_LOADING:
      return {
        ...state,
        quotesLoading: true
      }      
    default:
      return state;
  }
}