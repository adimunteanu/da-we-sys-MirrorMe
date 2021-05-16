import { Action } from 'redux';
import { StandardActionTypes } from './types';

export const incrementCountOne = (): Action => ({
  type: StandardActionTypes.INC_COUNT1,
});
export const incrementCountTwo = (): Action => ({
  type: StandardActionTypes.INC_COUNT2,
});

export const decrementCountOne = (): Action => ({
  type: StandardActionTypes.DEC_COUNT1,
});
export const decrementCountTwo = (): Action => ({
  type: StandardActionTypes.DEC_COUNT2,
});
