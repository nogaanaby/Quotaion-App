import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import quoteReducer from './quoteReducer';

export default combineReducers({
  item: itemReducer,
  quote: quoteReducer
});