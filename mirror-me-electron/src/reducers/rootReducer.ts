import { combineReducers } from 'redux';
import { counterReducer, CounterState } from './testCounter';
import { titleReducer, TitleState } from './titleReducer';

export type GlobalState = {
  counterReducer: CounterState;
  titleReducer: TitleState;
};
export const rootReducer = combineReducers({ counterReducer, titleReducer });

export default rootReducer;
