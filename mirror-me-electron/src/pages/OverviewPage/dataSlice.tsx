import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import jetpack from 'fs-jetpack';
import { COMPANIES, DATA_DIR } from '../../globals';
import { RootState } from '../../store';
import { CompanyRelevantDataObject } from '../../types';

export type DataState = {
  stringifiedData: string;
  canUpload: boolean;
  companyRelevantDataArray: CompanyRelevantDataObject[];
  isLoadingFiles: boolean;
  isUploadingFiles: boolean;
};

const initialState: DataState = {
  stringifiedData: '',
  canUpload: false,
  companyRelevantDataArray: [],
  isLoadingFiles: false,
  isUploadingFiles: false,
};

const loadFiles = createAsyncThunk('data/loadFiles', async () => {
  const dataArray = [] as CompanyRelevantDataObject[];
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
    deleteCompanyRelevantData: (state, action: PayloadAction<string>) => {
      const dataArray = [] as CompanyRelevantDataObject[];
      Object.entries(state.companyRelevantDataArray).forEach(([_, value]) => {
        if (value.company !== action.payload) {
          dataArray.push({
            company: value.company,
            logo: value.logo,
            data: value.data,
          });
        }
      });
      state.companyRelevantDataArray = dataArray;
    },
    updateIsUploadingFiles: (state, action: PayloadAction<boolean>) => {
      state.isUploadingFiles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFiles.pending, (state) => {
      state.isLoadingFiles = true;
    });
    builder.addCase(loadFiles.fulfilled, (state, action) => {
      state.companyRelevantDataArray = action.payload;
      state.isLoadingFiles = false;
    });
  },
});

const { actions, reducer } = dataSlice;

const selectStringifiedData = (state: RootState): string =>
  state.data.stringifiedData;

const selectCanUpload = (state: RootState): boolean => state.data.canUpload;

const selectHasData = (state: RootState): boolean =>
  state.data.companyRelevantDataArray.length > 0;

const selectData = (state: RootState): CompanyRelevantDataObject[] =>
  state.data.companyRelevantDataArray;

const selectIsLoadingFiles = (state: RootState): boolean =>
  state.data.isLoadingFiles;

const selectIsUploadingFiles = (state: RootState): boolean =>
  state.data.isUploadingFiles;

export const {
  updateStringifiedData,
  updateCanUpload,
  updateIsUploadingFiles,
  deleteCompanyRelevantData,
} = actions;

export {
  selectStringifiedData,
  selectCanUpload,
  loadFiles,
  selectHasData,
  selectData,
  selectIsLoadingFiles,
  selectIsUploadingFiles,
};

export default reducer;
