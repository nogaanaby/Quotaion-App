import axios from 'axios'
import { GET_QUOTES, ADD_QUOTE, QUOTES_LOADING, DELETE_QUOTE } from './types'

export const getQuotes = () => dispatch => {
  dispatch(setQuotesLoading())
  axios
    .get('/api/quotes')
    .then(res => 
      dispatch({
        type: GET_QUOTES,
        payload: res.data
      }))
}

export const addQuote = (quote) => dispatch => {
  dispatch(setQuotesLoading())
  axios
    .post('/api/quotes', quote)
    .then(res => 
      dispatch({
        type: ADD_QUOTE,
        payload: res.data
      }))
}

export const deleteQuote = (id) => dispatch => {
  dispatch(setQuotesLoading())
  axios
    .delete(`/api/quotes/${id}`, id)
    .then(res => 
      dispatch({
        type: DELETE_QUOTE,
        payload: id
      }))
}

export const setQuotesLoading = () => {
  return {
    type: QUOTES_LOADING
  }
}