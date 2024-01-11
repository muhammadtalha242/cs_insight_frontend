import axios from 'axios';

import { API_BASE_URL } from '../constants/consts';
import { getUrlSearchParams } from '../util/urlSearchParams';

const getPapersCount = async ({ queryKey }: any) => {
  const [, filters] = queryKey;
  const queryParams = getUrlSearchParams(filters);

  const res = await axios.get(`${API_BASE_URL}/papers/years?${queryParams}`);

  return res.data;
};

export default {
  getPapersCount
};
