
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types'

const initalState = {
  items: [],
  itemsLoading: false
}

export default function( state = initalState, action ) {
  switch(action.type) {
    case GET_ITEMS:
      return {
        items: action.payload,
        itemsLoading: false
      }
    case ADD_ITEM:
      return {
        items: [action.payload, ...state.items],
        itemsLoading: false
      }
    case DELETE_ITEM:
      return {
        items: state.items.slice().filter((item) => item._id !== action.payload),
        itemsLoading: false
      }
    case ITEMS_LOADING:
      return {
        ...state,
        itemsLoading: true
      }
    default:
      return state;
  }
}