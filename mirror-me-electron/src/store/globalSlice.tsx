import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PAGES } from '../globals';
import { Page } from '../types';

export type GlobalState = {
  currentPage: Page;
};

const initialState: GlobalState = {
  currentPage: PAGES.LANDING,
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
      }
    },
  },
});

const { actions, reducer } = globalSlice;

const selectTitle = (state: GlobalState): string => state.currentPage.title;

export const { updateCurrentPage } = actions;

export { selectTitle };

export default reducer;
