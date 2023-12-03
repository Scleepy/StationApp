import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  AdminID: string;
  AdminName: string;
  AdminEmail: string;
  AdminPassword: string;
  PasswordSalt: string;
  BuildingName: string;
  StationID: string;
  Token: string | null;
  IsSuperUser: boolean;
}

const initialState: AuthState = {
  AdminID: '',
  AdminName: '',
  AdminEmail: '',
  AdminPassword: '',
  PasswordSalt: '',
  BuildingName: '',
  StationID: '',
  Token: null,
  IsSuperUser: false,
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
      state.BuildingName = action.payload.BuildingName;
      state.StationID = action.payload.StationID;
      state.IsSuperUser = action.payload.IsSuperUser;
    },
    clearUserData: () => {
      return initialState;
    },
  },
});

export const {setUserData, clearUserData} = authSlice.actions;
export default authSlice.reducer;
