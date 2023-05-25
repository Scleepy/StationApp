import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getRecycleHistory} from '../reducers/recycleHistoryReducer';
import {RootState} from '../store';

export const useRecycleHistoryData = () => {
  const dispatch = useDispatch();
  const recycleHistory = useSelector(
    (state: RootState) => state.recycleHistory.recycleHistory,
  );

  useEffect(() => {
    dispatch(getRecycleHistory());
  }, [dispatch]);

  return {recycleHistory};
};
