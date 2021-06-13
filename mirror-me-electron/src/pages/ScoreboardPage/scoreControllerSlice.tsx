import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { NicknameAndScore, ScoresObject } from '../../types';

export type ScoreControllerState = {
  score: ScoresObject;
  allScores: NicknameAndScore[];
  uploadedScore: boolean;
};

const initialState: ScoreControllerState = {
  score: { scoreTotal: 0, scoreReddit: 0, scoreInsta: 0 },
  allScores: [],
  uploadedScore: false,
};

const scoreInstance = axios.create({
  baseURL: `http://localhost:4000/scoreboard`,
  timeout: 1000,
});

const getMeScoreThunk = createAsyncThunk(
  'scoreController/getMe',
  async ({ nickname, authToken }: { nickname: string; authToken: string }) => {
    const response = await scoreInstance.post(
      '/getMe',
      { nickname },
      {
        headers: { token: authToken },
      }
    );
    return response;
  }
);

const addScoreThunk = createAsyncThunk(
  'scoreController/addScore',
  async ({
    nickname,
    score,
    authToken,
  }: {
    nickname: string;
    score: ScoresObject;
    authToken: string;
  }) => {
    const response = await scoreInstance.post(
      '/addScore',
      { nickname, score },
      { headers: { token: authToken } }
    );
    return response;
  }
);

const getAllScoreThunk = createAsyncThunk(
  'scoreController/getAll',
  async (authToken: string) => {
    const response = await scoreInstance.get('/getAll', {
      headers: { token: authToken },
    });
    return response;
  }
);

const updateScoreThunk = createAsyncThunk(
  'scoreController/update',
  async ({
    nickname,
    score,
    authToken,
  }: {
    nickname: string;
    score: ScoresObject;
    authToken: string;
  }) => {
    const response = await scoreInstance.put(
      '/update',
      { nickname, score },
      { headers: { token: authToken } }
    );
    return response;
  }
);

const deleteScoreThunk = createAsyncThunk(
  'scoreController/delete',
  async ({ nickname, authToken }: { nickname: string; authToken: string }) => {
    const response = await scoreInstance.delete('/delete', {
      data: { nickname },
      headers: { token: authToken },
    });
    return response;
  }
);

const scoreControllerSlice = createSlice({
  name: 'scoreController',
  initialState,
  reducers: {
    deleteScoreLocally: (state) => {
      state.score = { scoreTotal: 0, scoreReddit: 0, scoreInsta: 0 };
      state.allScores = [];
    },
    setScore: (state, action: PayloadAction<ScoresObject>) => {
      state.score = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMeScoreThunk.fulfilled, (state, action) => {
      state.uploadedScore = action.payload.data.uploadedScore;
      if (state.uploadedScore) {
        state.score = action.payload.data.score;
      }
    });
    builder.addCase(addScoreThunk.fulfilled, (state) => {
      state.uploadedScore = true;
    });
    builder.addCase(getAllScoreThunk.fulfilled, (state, action) => {
      state.allScores = [];
      Object.entries(action.payload.data).forEach(([key, value]) => {
        state.allScores.push({ nickname: key, score: value as ScoresObject });
      });
    });
    builder.addCase(deleteScoreThunk.fulfilled, (state) => {
      state.uploadedScore = false;
      state.allScores = [];
      state.score = { scoreTotal: 0, scoreReddit: 0, scoreInsta: 0 };
    });
  },
});

const selectUploadedScore = (state: RootState): boolean =>
  state.scoreControl.uploadedScore;

const selectAllScores = (state: RootState): NicknameAndScore[] =>
  state.scoreControl.allScores;

const selectScore = (state: RootState): ScoresObject =>
  state.scoreControl.score;

const { actions, reducer } = scoreControllerSlice;

export const { deleteScoreLocally, setScore } = actions;

export {
  getMeScoreThunk,
  addScoreThunk,
  getAllScoreThunk,
  updateScoreThunk,
  deleteScoreThunk,
  selectUploadedScore,
  selectAllScores,
  selectScore,
};

export default reducer;
