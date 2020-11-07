import axios from 'axios';
const BASE_URL = '/api/user';

const getUserRole = async emailAddr => {
  const resp = await axios.post(`${BASE_URL}/get-user-role`, {emailAddr});
  return resp.data;
};

const addOwnerRole = async (owner, creditCard, pet, emailAddr) => {
  const reqBody = {owner, creditCard, pet, emailAddr}
  // errors will be caught in CreateProfileFormOwner.js
  await axios.post(`${BASE_URL}/add-owner-role`, reqBody);
}

const addCaretakerRole = async (caretaker, emailAddr) => {
  const reqBody = {caretaker, emailAddr}
  // errors will be caught in CreateProfileFormOwner.js
  await axios.post(`${BASE_URL}/add-caretaker-role`, reqBody);
}

export default { getUserRole, addOwnerRole, addCaretakerRole};