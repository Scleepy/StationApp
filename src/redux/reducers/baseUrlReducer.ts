import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BaseUrlState {
  BaseUrl: string;
}

const initialState: BaseUrlState = {
  BaseUrl: 'http://192.168.100.3:3000',
};

const baseUrlSlice = createSlice({
  name: 'baseUrl',
  initialState,
  reducers: {
    setBaseUrl: (state, action: PayloadAction<BaseUrlState>) => {
      const inputBaseUrl = action.payload.BaseUrl;

      if (inputBaseUrl.startsWith('http://')) {
        state.BaseUrl = inputBaseUrl;
      } else {
        state.BaseUrl = 'http://' + inputBaseUrl;
      }
    },
    clearBaseUrl: () => {
      return initialState;
    },
  },
});

export const {setBaseUrl, clearBaseUrl} = baseUrlSlice.actions;
export default baseUrlSlice.reducer;
export type {BaseUrlState};
