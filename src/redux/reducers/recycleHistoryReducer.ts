import {createSlice} from '@reduxjs/toolkit';

interface RecycleHistoryState {
  RecyclingID: string;
  StudentName: string;
  StudentID: string;
  RecyclingDate: Date;
  CategoryName: string;
  ItemWeight: number;
  PointsObtained: number;
}

interface initialRecycleHistoryArrayState {
  recycleHistory: RecycleHistoryState[];
  isLoading: boolean;
}

const initialState: initialRecycleHistoryArrayState = {
  recycleHistory: [],
  isLoading: false,
};

const recycleHistorySlice = createSlice({
  name: 'recycleHistory',
  initialState,
  reducers: {
    getRecycleHistory: state => {
      state.isLoading = true;
    },
    getRecycleHistorySuccess: (state, action) => {
      state.isLoading = false;
      state.recycleHistory = action.payload;
    },
    getRecycleHistoryError: state => {
      state.isLoading = false;
    },
  },
});

export const {
  getRecycleHistory,
  getRecycleHistorySuccess,
  getRecycleHistoryError,
} = recycleHistorySlice.actions;
export default recycleHistorySlice.reducer;
