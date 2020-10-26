import axios from 'axios';
const BASE_URL = '/api/signup';

const createNewAccount = async credentials => {
  // errors will be caught by SignUp.js
  await axios.post(BASE_URL, credentials);
};

export default { createNewAccount };
