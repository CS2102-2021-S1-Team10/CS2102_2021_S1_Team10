import axios from 'axios';
const BASE_URL = '/api/user';

const getUserPets = async emailAddr => {
  const resp = await axios.post(`${BASE_URL}/get-user-pets`, {emailAddr});
  return resp.data;
};

export default { getUserPets };