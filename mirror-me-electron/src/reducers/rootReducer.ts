import { combineReducers } from 'redux';
import headerSlice from '../components/Header/HeaderSlice';

export default combineReducers({
  header: headerSlice,
});
