import axios from 'axios';
import {BASE_URL} from '@env';

console.log(`${BASE_URL}/api/v1/recycle/history/admin/`);

export const requestRecycleHistory = (adminID: string) => {
  return axios.get(`${BASE_URL}/api/v1/recycle/history/admin/${adminID}`);
  
};
