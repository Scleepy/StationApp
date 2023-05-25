import axios from 'axios';

export const requestRecycleHistory = (adminID: string) => {
  return axios.get(
    `${process.env.BASE_URL}/api/v1/recycle/history/admin/${adminID}`,
  );
};
