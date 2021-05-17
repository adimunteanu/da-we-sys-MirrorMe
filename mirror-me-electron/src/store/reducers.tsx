import { combineReducers } from '@reduxjs/toolkit';
import userControllerSlice from '../pages/UserController/userControllerSlice';
import globalSlice from './globalSlice';

export default combineReducers({
  global: globalSlice,
  userControl: userControllerSlice,
});
