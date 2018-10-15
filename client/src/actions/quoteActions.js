import axios from 'axios'
import { GET_QUOTES, ADD_QUOTE, ITEMS_LOADING, DELETE_QUOTE, EDIT_QUOTE } from './types'

export const getQuotes = () => dispatch => {
  dispatch(setItemsLoading())
  axios
    .get('/api/quotes')
    .then(res => 
      dispatch({
        type: GET_QUOTES,
        payload: res.data
      }))
}

export const addQuote = (quote) => dispatch => {
  dispatch(setItemsLoading())
  axios
    .post('/api/quotes', quote)
    .then(res => 
      dispatch({
        type: ADD_QUOTE,
        payload: res.data
      }))
}

export const editQuote = (quoteObj) => dispatch => {
  dispatch(setItemsLoading())
  axios
    .post('/api/quotes', quoteObj.quote)
    .then(res => 
      dispatch({
        type: EDIT_QUOTE,
        payload: quoteObj
      }))
}

export const deleteQuote = (id) => dispatch => {
  dispatch(setItemsLoading())
  axios
    .delete(`/api/quotes/${id}`, id)
    .then(res => 
      dispatch({
        type: DELETE_QUOTE,
        payload: id
      }))
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}