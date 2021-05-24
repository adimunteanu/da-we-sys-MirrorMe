import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

export type UserControllerState = {
  isAuthenticated: boolean;
  authToken: string;
};

const initialState: UserControllerState = {
  isAuthenticated: false,
  authToken: '',
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
  async ({ email, password }: { email: string; password: string }) => {
    const response = await userInstance.post('/signup', { email, password });
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.authToken = JSON.parse(JSON.stringify(action.payload.data.token));
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.isAuthenticated = false;
      state.authToken = '';
    });
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.authToken = JSON.parse(JSON.stringify(action.payload.data.token));
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

export const { logout } = actions;

export { selectIsAuthenticated, loginThunk, signupThunk };

export default reducer;
