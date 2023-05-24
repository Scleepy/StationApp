import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  AdminID: string;
  AdminName: string;
  AdminEmail: string;
  AdminPassword: string;
  PasswordSalt: string;
  StationName: string;
  StationID: string;
  Token: string | null;
}

const initialState: AuthState = {
  AdminID: '',
  AdminName: '',
  AdminEmail: '',
  AdminPassword: '',
  PasswordSalt: '',
  StationName: '',
  StationID: '',
  Token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<AuthState>) => {
      state.Token = action.payload.Token;
      state.AdminID = action.payload.AdminID;
      state.AdminName = action.payload.AdminName;
      state.AdminEmail = action.payload.AdminEmail;
      state.AdminPassword = action.payload.AdminPassword;
      state.PasswordSalt = action.payload.PasswordSalt;
      state.StationName = action.payload.StationName;
      state.StationID = action.payload.StationID;
    },
    clearUserData: () => {
      return initialState;
    },
  },
});

export const {setUserData, clearUserData} = authSlice.actions;
export default authSlice.reducer;
