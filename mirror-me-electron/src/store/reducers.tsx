import { combineReducers } from '@reduxjs/toolkit';
import dataSlice from '../pages/OverviewPage/dataSlice';
import userControllerSlice from '../pages/UserController/userControllerSlice';
import globalSlice from './globalSlice';
import scoreControllerSlice from '../pages/ScoreboardPage/scoreControllerSlice';

export default combineReducers({
  global: globalSlice,
  userControl: userControllerSlice,
  data: dataSlice,
  scoreControl: scoreControllerSlice,
});
