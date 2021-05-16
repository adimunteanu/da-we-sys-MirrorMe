import Routes from '../routes';
import { ActionPayload } from '../actions/types';

export type TitleState = {
  title: string;
};

const initialState: TitleState = {
  title: 'Mirror Me',
};

export const titleReducer = (
  state: TitleState = initialState,
  action: ActionPayload
) => {
  if (action.type !== 'title/change') return state;
  switch (action.payload) {
    case Routes.LANDING:
      return {
        ...state,
        title: 'Welcome to MirrorMe',
      };
    case Routes.DETAIL:
      return {
        ...state,
        title: 'Deatails',
      };
    case Routes.OVERVIEW:
      return {
        ...state,
        title: 'Overview',
      };
    case Routes.REQUEST:
      return {
        ...state,
        title: 'Requests',
      };
    case Routes.SCOREBOARD:
      return {
        ...state,
        title: 'Scoreboard',
      };
    case Routes.SETTINGS:
      return {
        ...state,
        title: 'Settings',
      };
    default:
      return {
        ...state,
        title: 'MirrorMe',
      };
  }
};

export default titleReducer;
