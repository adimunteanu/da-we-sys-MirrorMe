import { useDispatch } from 'react-redux';
import { ActionPayload } from './actions/types';

// eslint-disable-next-line import/prefer-default-export
export const useAction = () => {
  const dispatch = useDispatch();
  return (action: ActionPayload) => dispatch(action);
};
