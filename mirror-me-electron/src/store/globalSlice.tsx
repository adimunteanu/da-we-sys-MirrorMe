import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Page } from '../types';

export const PAGES = {
  LANDING: { route: '/', title: '' },
  LOGIN: { route: '/auth/login', title: '' },
  SIGNUP: { route: '/auth/signup', title: '' },
  OVERVIEW: { route: '/home/overview', title: 'Overview' },
  DETAIL: { route: '/home/overview/', title: 'Summary' },
  REQUEST: { route: '/home/request', title: 'Requests' },
  SCOREBOARD: { route: '/home/scoreboard', title: 'Scoreboard' },
  SETTINGS: { route: '/home/settings', title: 'Settings' },
};

export type GlobalState = {
  currentPage: Page;
  currentCompanyView: string;
  isDarkmode: boolean;
};

const initialState: GlobalState = {
  currentPage: PAGES.LANDING,
  currentCompanyView: '',
  isDarkmode: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<string>) => {
      const foundPage = Object.values(PAGES).find(
        (page) => page.route === action.payload
      );

      if (foundPage) {
        state.currentPage = foundPage;
      } else if (action.payload.includes(PAGES.DETAIL.route)) {
        state.currentPage = PAGES.DETAIL;
      }
    },
    updateCurrentCompanyView: (state, action: PayloadAction<string>) => {
      state.currentCompanyView = action.payload;
    },
    updateIsDarkmode: (state, action: PayloadAction<boolean>) => {
      state.isDarkmode = action.payload;
    },
  },
});

const { actions, reducer } = globalSlice;

const selectTitle = (state: RootState): string => {
  if (state.global.currentPage === PAGES.DETAIL) {
    return `${state.global.currentCompanyView} ${state.global.currentPage.title}`;
  }
  return state.global.currentPage.title;
};

const selectIsDarkmode = (state: RootState): boolean => {
  return state.global.isDarkmode;
};

export const {
  updateCurrentPage,
  updateCurrentCompanyView,
  updateIsDarkmode,
} = actions;

export { selectTitle, selectIsDarkmode };

export default reducer;
