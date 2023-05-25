import {call, put, select, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {requestRecycleHistory} from '../request/axiosRecycleHistory';
import {getRecycleHistorySuccess} from '../../reducers/recycleHistoryReducer';
import {RootState} from '../../store';

interface RecycleHistory {
  RecyclingID: string;
  StudentName: string;
  StudentID: string;
  RecyclingDate: Date;
  CategoryName: string;
  ItemWeight: number;
  PointsObtained: number;
}

interface ProductResponse {
  data: RecycleHistory[];
}

function* handleGetRecycleHistory() {
  try {
    const adminID: string = yield select(
      (state: RootState) => state.auth.AdminID,
    );

    const {data: response}: AxiosResponse<ProductResponse> = yield call(
      requestRecycleHistory,
      adminID,
    );

    const recycleHistory: RecycleHistory[] = response.data.map(
      (item: RecycleHistory) => ({
        RecyclingID: item.RecyclingID,
        StudentName: item.StudentName,
        StudentID: item.StudentID,
        RecyclingDate: new Date(item.RecyclingDate),
        CategoryName: item.CategoryName,
        ItemWeight: item.ItemWeight,
        PointsObtained: item.PointsObtained,
      }),
    );

    yield put(getRecycleHistorySuccess(recycleHistory));
  } catch (err) {
    console.log(err);
  }
}

function* recycleHistorySaga() {
  yield takeLatest('recycleHistory/getRecycleHistory', handleGetRecycleHistory);
}

export default recycleHistorySaga;
