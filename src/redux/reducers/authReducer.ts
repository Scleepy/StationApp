import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  name: string;
  email: string;
  station: string;
  Token: string | null;
}

const initialState: AuthState = {
  name: '',
  email: '',
  station: '',
  Token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      state.Token = action.payload;
    },
    clearUserToken: state => {
      state.Token = null;
    },
    setUserData: (
      state,
      action: PayloadAction<{name: string; email: string; station: string}>,
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.station = action.payload.station;
    },
    clearUserData: state => {
      state.name = '';
      state.email = '';
      state.station = '';
    },
  },
});

export const {setUserToken, clearUserToken, setUserData} = authSlice.actions;
export default authSlice.reducer;
