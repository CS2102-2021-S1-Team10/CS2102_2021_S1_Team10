import axios from 'axios';
const BASE_URL = '/api/user/get-user-role';

const getUserRole = async emailAddr => {
  const resp = await axios.post(BASE_URL, emailAddr);
  return resp.data;
};

export default { getUserRole };
