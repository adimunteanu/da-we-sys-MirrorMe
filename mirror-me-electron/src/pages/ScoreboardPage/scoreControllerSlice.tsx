import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '../../store';

export type ScoreControllerState = {
  nickname: string;
  score: {
    totalScore: number;
    redditScore: number;
    instaScore: number;
  };
  allScores: {
    nickname: string;
    score: {
      totalScore: number;
      redditScore: number;
      instaScore: number;
    };
  }[];
  uploadedScore: boolean;
};

const header = store.getState().userControl.authToken;

const config = {
  headers: header,
};

const initialState: ScoreControllerState = {
  nickname: '',
  score: { totalScore: 0, redditScore: 0, instaScore: 0 },
  allScores: [],
  uploadedScore: false,
};

const scoreInstance = axios.create({
  baseURL: `http://localhost:4000/scoreboard`,
  timeout: 1000,
});

const addScoreThunk = createAsyncThunk(
  'scoreController/addScore',
  async ({
    nickname,
    score,
  }: {
    nickname: string;
    score: {
      totalScore: number;
      redditScore: number;
      instaScore: number;
    };
  }) => {
    const response = await scoreInstance.post(
      '/addScore',
      { nickname, score },
      config
    );
    return response;
  }
);

const getAllScoresThunk = createAsyncThunk(
  'scoreController/getAll',
  async () => {
    const response = await scoreInstance.get('/getAll', config);
    return response;
  }
);

const refreshScoreThunk = createAsyncThunk(
  'scoreController/refresh',
  async ({
    nickname,
    score,
  }: {
    nickname: string;
    score: {
      totalScore: number;
      redditScore: number;
      instaScore: number;
    };
  }) => {
    const response = await scoreInstance.put(
      '/refresh',
      { nickname, score },
      config
    );
    return response;
  }
);

const deleteScoreThunk = createAsyncThunk(
  'scoreController/delete',
  async ({ nickname }: { nickname: string }) => {
    const response = await scoreInstance.delete('/delete', {
      data: { nickname },
      headers: header,
    });
    return response;
  }
);
const scoreControllerSlice = createSlice({
  name: 'userControl',
  initialState,
  reducers: {
    deleteLocalScore: (state) => {
      state.nickname = '';
      state.score = { totalScore: 0, redditScore: 0, instaScore: 0 };
      state.allScores = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addScoreThunk.fulfilled, (state) => {
      state.uploadedScore = true;
    });
    builder.addCase(getAllScoresThunk.fulfilled, (state, action) => {
      state.allScores = action.payload.data;
      Object.values(action.payload.data).forEach((value) => console.log(value));
    });
    builder.addCase(deleteScoreThunk.fulfilled, (state) => {
      state.nickname = '';
      state.uploadedScore = false;
      state.allScores = [];
    });
  },
});

const { actions, reducer } = scoreControllerSlice;

export const { deleteLocalScore } = actions;

export {
  addScoreThunk,
  getAllScoresThunk,
  refreshScoreThunk,
  deleteScoreThunk,
};

export default reducer;
