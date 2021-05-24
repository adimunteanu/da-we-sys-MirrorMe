import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DataState = {
  stringifiedData: string;
  canUpload: boolean;
};

const initialState: DataState = {
  stringifiedData: '',
  canUpload: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateStringifiedData: (state, action: PayloadAction<string>) => {
      state.stringifiedData = action.payload;
    },
    updateCanUpload: (state, action: PayloadAction<boolean>) => {
      state.canUpload = action.payload;
    },
  },
});

const { actions, reducer } = dataSlice;

const selectStringifiedData = (state: DataState): string =>
  state.stringifiedData;

const selectCanUpload = (state: DataState): boolean => state.canUpload;

export const { updateStringifiedData, updateCanUpload } = actions;

export { selectStringifiedData, selectCanUpload };

export default reducer;
