import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './reducers/authReducer';
import recycleHistoryReducer from './reducers/recycleHistoryReducer';
import createSagaMiddleware from 'redux-saga';
import recycleHistorySaga from './saga/handler/recycleHistorySaga';

const rootReducer = combineReducers({
  auth: authReducer,
  recycleHistory: recycleHistoryReducer,
});

const persistedReducer = persistReducer(
  {key: 'root', storage: AsyncStorage},
  rootReducer,
);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(recycleHistorySaga);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
