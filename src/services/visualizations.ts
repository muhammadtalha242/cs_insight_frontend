import axios from 'axios';

import { API_BASE_URL } from '../constants/consts';
import { Filter } from '../constants/types';
import { getUrlSearchParams } from '../util/urlSearchParams';

const getPapersCount = async ({ queryKey }: any) => {
  const [, filters] = queryKey;

  console.log('queryKey', queryKey);
  const queryParams = getUrlSearchParams(filters);

  const res = await axios.get(`${API_BASE_URL}/papers/years?${queryParams}`);

  return res.data;
};
const getPapersCountPost = async (queryParams: Filter) => {
  console.log('queryParams', queryParams);
  const res = await axios.post(`${API_BASE_URL}/papers/years`, queryParams);

  return res.data;
};

export default {
  getPapersCount,
  getPapersCountPost
};
