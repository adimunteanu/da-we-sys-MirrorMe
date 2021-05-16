import * as TestCounterAction from './TestCounterAction';
import * as TitleAction from './TitleAction';

// eslint-disable-next-line import/prefer-default-export
export const Actions = {
  ...TestCounterAction,
  ...TitleAction,
};
