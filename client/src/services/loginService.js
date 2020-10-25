import axios from 'axios';
const BASE_URL = '/api/login';

const login = async credentials => {
  // any resp that is in the 400/500 range will be treated as an error
  const resp = await axios.post(BASE_URL, credentials);
  console.log(resp);
  return resp.data; // token
  // refer to https://stackoverflow.com/a/51768316 for axios error handling
};

export default { login };
