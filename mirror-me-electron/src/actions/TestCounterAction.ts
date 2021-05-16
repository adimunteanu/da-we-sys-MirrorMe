import { Action } from 'redux';

const INC_COUNT1 = 'INC_COUNT1';
const DEC_COUNT1 = 'DEC_COUNT1';
const INC_COUNT2 = 'INC_COUNT2';
const DEC_COUNT2 = 'DEC_COUNT2';

export const incrementCountOne: Action = {
  type: INC_COUNT1,
};
export const incrementCountTwo: Action = {
  type: INC_COUNT2,
};

export const decrementCountOne: Action = {
  type: DEC_COUNT1,
};
export const decrementCountTwo: Action = {
  type: DEC_COUNT2,
};
