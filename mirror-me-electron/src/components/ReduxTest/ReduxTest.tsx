import { useSelector } from 'react-redux';
import React from 'react';

import { GlobalState } from '../../reducers/rootReducer';
import { Actions } from '../../actions';
import { useAction } from '../../hooks';

export const ReduxTestComponent: React.FC = () => {
  const dispatch = useAction();
  const counter1 = useSelector(
    (state: GlobalState) => state.counterReducer.counter1
  );
  const counter2 = useSelector(
    (state: GlobalState) => state.counterReducer.counter2
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          dispatch(Actions.incrementCountOne());
        }}
      >
        increment 1
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(Actions.decrementCountOne());
        }}
      >
        decrement 1
      </button>
      {counter1}
      <br />
      <button
        type="button"
        onClick={() => {
          dispatch(Actions.incrementCountTwo());
        }}
      >
        increment 2
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(Actions.decrementCountTwo());
        }}
      >
        decrement 2
      </button>
      {counter2}
    </div>
  );
};
export default ReduxTestComponent;
