/* eslint-disable import/prefer-default-export */
import { ChangeTitleAction } from './types';

export const changeTitle = (payload: string): ChangeTitleAction => ({
  type: 'title/change',
  payload,
});
