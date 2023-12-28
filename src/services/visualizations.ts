import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080' as const;

const getPapersCount = async () => {
  const res = await axios.get(
    `${API_BASE_URL}/papers/years?yearStart=1966&metric=inCitationsCounts`
  );

  return res.data;
};

export default {
  getPapersCount
};
