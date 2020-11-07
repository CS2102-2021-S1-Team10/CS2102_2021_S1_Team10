import axios from 'axios';
const BASE_URL = '/api'; 


const login = async credentials => {
  const url = BASE_URL + '/login';
  // any resp that is in the 400/500 range will be treated as an error
  const resp = await axios.post(url, credentials); 
  return resp.data; // token
  // refer to https://stackoverflow.com/a/51768316 for axios error handling
};

const adminLogin = async credentials => {
  const url = BASE_URL + '/admin-login';
  // any resp that is in the 400/500 range will be treated as an error
  const resp = await axios.post(url, credentials);
  console.log(resp.data)
  return resp.data; // token
  // refer to https://stackoverflow.com/a/51768316 for axios error handling
};


export default { login, adminLogin };
