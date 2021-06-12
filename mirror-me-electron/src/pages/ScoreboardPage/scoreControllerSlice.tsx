import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

export type Scores = {
  scoreTotal: number;
  scoreReddit: number;
  scoreInsta: number;
};

export type NicknameAndScore = {
  nickname: string;
  score: Scores;
};

export type ScoreControllerState = {
  score: Scores;
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

const uploadedScoreThunk = createAsyncThunk(
  'scoreController/uploadedScore',
  async ({ nickname, authToken }: { nickname: string; authToken: string }) => {
    const response = await scoreInstance.post(
      '/uploadedScore',
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
    score: Scores;
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

const getAllScoresThunk = createAsyncThunk(
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
    score: Scores;
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
  name: 'userControl',
  initialState,
  reducers: {
    deleteScoreLocally: (state) => {
      state.score = { scoreTotal: 0, scoreReddit: 0, scoreInsta: 0 };
      state.allScores = [];
    },
    setScore: (state, action: PayloadAction<Scores>) => {
      state.score = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadedScoreThunk.fulfilled, (state, action) => {
      state.score = action.payload.data.score;
      state.uploadedScore = action.payload.data.uploadedScore;
    });
    builder.addCase(addScoreThunk.fulfilled, (state) => {
      state.uploadedScore = true;
    });
    builder.addCase(getAllScoresThunk.fulfilled, (state, action) => {
      state.allScores = action.payload.data;
      // console.log(state.allScores);
      Object.values(action.payload.data).forEach((value) => {
        console.log(value);
        state.allScores.push(); // #TODO
      });
    });
    builder.addCase(deleteScoreThunk.fulfilled, (state) => {
      state.uploadedScore = false;
      state.allScores = [];
    });
  },
});

const selectUploadedScore = (state: RootState): boolean =>
  state.scoreControl.uploadedScore;

const selectAllScores = (state: RootState): NicknameAndScore[] =>
  state.scoreControl.allScores;

const selectScore = (state: RootState): Scores => state.scoreControl.score;

const { actions, reducer } = scoreControllerSlice;

export const { deleteScoreLocally, setScore } = actions;

export {
  uploadedScoreThunk,
  addScoreThunk,
  getAllScoresThunk,
  updateScoreThunk,
  deleteScoreThunk,
  selectUploadedScore,
  selectAllScores,
  selectScore,
};

export default reducer;
