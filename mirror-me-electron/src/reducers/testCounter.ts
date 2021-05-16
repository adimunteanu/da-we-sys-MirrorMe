import { Action } from 'redux';

type CounterState = {
  counter1: number;
  counter2: number;
};

const initialState: CounterState = {
  counter1: 10,
  counter2: 33,
};

export const counterReducer = (
  state: CounterState = initialState,
  action: Action
) => {
  switch (action.type) {
    case 'INC_COUNT1':
      return {
        ...state,
        counter1: state.counter1 + 1,
      };
    case 'INC_COUNT2':
      return {
        ...state,
        counter2: state.counter2 + 1,
      };
    case 'DEC_COUNT1':
      return {
        ...state,
        counter1: state.counter1 - 1,
      };
    case 'DEC_COUNT2':
      return {
        ...state,
        counter2: state.counter2 - 1,
      };
    default:
      return state;
  }
};

export default counterReducer;
