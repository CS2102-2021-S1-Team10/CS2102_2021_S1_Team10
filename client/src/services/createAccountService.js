import axios from 'axios';
const BASE_URL = '/api/signup';

const createNewAccount = async credentials => {
  // any resp that is in the 400/500 range will be treated as an error
  const resp = await axios.post(BASE_URL, credentials);
  console.log(resp);
};

export default { createNewAccount };
