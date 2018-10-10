import axios from 'axios'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'

export const getItems = () => dispatch => {
  dispatch(setItemsLoading())
  axios
    .get('/api/services')
    .then(res => 
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      }))
}

export const deleteItem = (id) => dispatch => {
  dispatch(setItemsLoading())
  axios
    .delete(`/api/services/${id}`, id)
    .then(res => 
      dispatch({
        type: DELETE_ITEM,
        payload: id
      }))
}

export const addItem = (item) => dispatch => {
  dispatch(setItemsLoading())
  axios
    .post('/api/services', item)
    .then(res => 
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      }))
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}