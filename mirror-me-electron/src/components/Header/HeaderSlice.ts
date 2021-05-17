import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Routes from '../../routes';

export type HeaderState = {
  title: string;
};

const initialState: HeaderState = {
  title: 'Mirror Me',
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    changeTitle: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case Routes.DETAIL:
          state.title = 'Details';
          break;
        case Routes.OVERVIEW:
          state.title = 'Data Overview';
          break;
        case Routes.SETTINGS:
          state.title = 'Settings';
          break;
        case Routes.SCOREBOARD:
          state.title = 'Scoreboard';
          break;
        case Routes.REQUEST:
          state.title = 'Requests';
          break;
        default:
          state.title = 'Mirror Me';
          break;
      }
    },
  },
});
const { actions, reducer } = headerSlice;

export const { changeTitle } = actions;
export const selectTitle = (state: HeaderState) => state.title;
export default reducer;
