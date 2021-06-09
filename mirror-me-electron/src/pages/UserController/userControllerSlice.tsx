import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

export type UserControllerState = {
  isAuthenticated: boolean;
  authToken: string;
  nickname: string;
};

const initialState: UserControllerState = {
  isAuthenticated: false,
  authToken: '',
  nickname: '',
};

const userInstance = axios.create({
  baseURL: `http://localhost:4000/user`,
  timeout: 1000,
});

const loginThunk = createAsyncThunk(
  'userController/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await userInstance.post('/login', { email, password });
    return response;
  }
);

const signupThunk = createAsyncThunk(
  'userController/signup',
  async ({
    nickname,
    email,
    password,
  }: {
    nickname: string;
    email: string;
    password: string;
  }) => {
    const response = await userInstance.post('/signup', {
      nickname,
      email,
      password,
    });
    return response;
  }
);

const userControllerSlice = createSlice({
  name: 'userControl',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.authToken = '';
      state.nickname = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.authToken = JSON.parse(JSON.stringify(action.payload.data.token));
      state.nickname = JSON.parse(JSON.stringify(action.payload.data.nickname));
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.isAuthenticated = false;
      state.authToken = '';
      state.nickname = '';
    });
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.authToken = JSON.parse(JSON.stringify(action.payload.data.token));
      state.nickname = JSON.parse(JSON.stringify(action.payload.data.nickname));
    });
    builder.addCase(signupThunk.rejected, (state) => {
      state.isAuthenticated = false;
      state.authToken = '';
    });
  },
});

const { actions, reducer } = userControllerSlice;

const selectIsAuthenticated = (state: RootState): boolean =>
  state.userControl.isAuthenticated;

const selectAuthToken = (state: RootState): string =>
  state.userControl.authToken;

const selectNickname = (state: RootState): string => state.userControl.nickname;

export const { logout } = actions;

export {
  selectIsAuthenticated,
  selectAuthToken,
  selectNickname,
  loginThunk,
  signupThunk,
};

export default reducer;
