import { combineReducers } from '@reduxjs/toolkit';
import globalSlice from './globalSlice';

export default combineReducers({
  global: globalSlice,
});
