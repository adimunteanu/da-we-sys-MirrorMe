import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

export type UserScore = {
  nickname: string;
  score: {
    scoreTotal: number;
    scoreReddit: number;
    scoreInsta: number;
  };
};
export type ScoreControllerState = {
  nickname: string;
  score: {
    scoreTotal: number;
    scoreReddit: number;
    scoreInsta: number;
  };
  allScores: UserScore[];
  uploadedScore: boolean;
};

const initialState: ScoreControllerState = {
  nickname: '',
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
    const response = await scoreInstance.post('/uploadedScore', nickname, {
      headers: { token: authToken },
    });
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
    score: {
      scoreTotal: number;
      scoreReddit: number;
      scoreInsta: number;
    };
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
    score: {
      scoreTotal: number;
      scoreReddit: number;
      scoreInsta: number;
    };
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
    deleteLocalScore: (state) => {
      state.nickname = '';
      state.score = { scoreTotal: 0, scoreReddit: 0, scoreInsta: 0 };
      state.allScores = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadedScoreThunk.fulfilled, (state, action) => {
      state.uploadedScore = action.payload.data;
      console.log('lääääätzd');
      console.log(state.uploadedScore);
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
      state.nickname = '';
      state.uploadedScore = false;
      state.allScores = [];
    });
  },
});

const selectUploadedScore = (state: RootState): boolean =>
  state.scoreControl.uploadedScore;

const selectAllScores = (state: RootState): UserScore[] =>
  state.scoreControl.allScores;

const { actions, reducer } = scoreControllerSlice;

export const { deleteLocalScore } = actions;

export {
  uploadedScoreThunk,
  addScoreThunk,
  getAllScoresThunk,
  updateScoreThunk,
  deleteScoreThunk,
  selectUploadedScore,
  selectAllScores,
};

export default reducer;
