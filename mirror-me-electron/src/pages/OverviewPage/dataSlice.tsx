import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import jetpack from 'fs-jetpack';
import { COMPANIES, DATA_DIR } from '../../globals';
import { RootState } from '../../store';
import { CompanyRelevanDataObject } from '../../types';

export type DataState = {
  stringifiedData: string;
  canUpload: boolean;
  companyRelevantDataArray: CompanyRelevanDataObject[];
};

const initialState: DataState = {
  stringifiedData: '',
  canUpload: false,
  companyRelevantDataArray: [],
};

const loadFiles = createAsyncThunk('data/loadFiles', async () => {
  const dataArray = [] as CompanyRelevanDataObject[];
  Object.values(COMPANIES).forEach((company) => {
    if (jetpack.exists(DATA_DIR + company.save_file) === 'file') {
      const fileContent = jetpack.read(DATA_DIR + company.save_file, 'utf8');
      if (fileContent) {
        const currentJson = JSON.parse(fileContent);
        dataArray.push({
          company: company.name,
          logo: company.logo,
          data: currentJson,
        });
      }
    }
  });
  return dataArray;
});

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
  extraReducers: (builder) => {
    builder.addCase(loadFiles.fulfilled, (state, action) => {
      state.companyRelevantDataArray = action.payload;
    });
  },
});

const { actions, reducer } = dataSlice;

const selectStringifiedData = (state: RootState): string =>
  state.data.stringifiedData;

const selectCanUpload = (state: RootState): boolean => state.data.canUpload;

const selectHasData = (state: RootState): boolean =>
  state.data.companyRelevantDataArray.length > 0;

const selectData = (state: RootState): CompanyRelevanDataObject[] =>
  state.data.companyRelevantDataArray;

export const { updateStringifiedData, updateCanUpload } = actions;

export {
  selectStringifiedData,
  selectCanUpload,
  loadFiles,
  selectHasData,
  selectData,
};

export default reducer;
