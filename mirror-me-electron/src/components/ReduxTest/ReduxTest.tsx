import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import {
  decrementCountOne,
  decrementCountTwo,
  incrementCountOne,
  incrementCountTwo,
} from '../../actions/testCounterAction';

type CounterState = {
  counter1: number;
  counter2: number;
};

export const ReduxTestComponent: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          dispatch(incrementCountOne);
        }}
      >
        increment 1
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(decrementCountOne);
        }}
      >
        decrement 1
      </button>
      {useSelector((state: CounterState) => state.counter1)}
      <br />
      <button
        type="button"
        onClick={() => {
          dispatch(incrementCountTwo);
        }}
      >
        increment 2
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(decrementCountTwo);
        }}
      >
        decrement 2
      </button>
      {useSelector((state: CounterState) => state.counter2)}
    </div>
  );
};
export default ReduxTestComponent;
