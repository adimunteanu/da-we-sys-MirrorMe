import { createSlice } from '@reduxjs/toolkit';

export type UserControllerState = {
  isAuthenticated: boolean;
};

const initialState: UserControllerState = {
  isAuthenticated: false,
};

const userControllerSlice = createSlice({
  name: 'userControl',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

const { actions, reducer } = userControllerSlice;

const selectIsAuthenticated = (state: UserControllerState): boolean =>
  state.isAuthenticated;

export const { login, logout } = actions;

export { selectIsAuthenticated };

export default reducer;
