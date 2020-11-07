import axios from 'axios';
const BASE_URL = '/api/user';

const getUserRole = async emailAddr => {
  const resp = await axios.post(`${BASE_URL}/get-user-role`, {emailAddr});
  return resp.data;
};

const addOwnerRole = async (owner, pet, emailAddr) => {
  const reqBody = {owner, pet, emailAddr}
  // errors will be caught in CreateProfileFormOwner.js
  await axios.post(`${BASE_URL}/add-owner-role`, reqBody);
}

const addCaretakerRole = async (caretaker, emailAddr) => {
  const reqBody = {caretaker, emailAddr}
  // errors will be caught in CreateProfileFormOwner.js
  await axios.post(`${BASE_URL}/add-caretaker-role`, reqBody);
}
const addCreditCardRole = async (CreditCard, emailAddr) => {
  const reqBody = {CreditCard, emailAddr}
  // errors will be caught in CreateProfileFormOwner.js
  await axios.post(`${BASE_URL}/add-creditcard-role`, reqBody);
}
export default { getUserRole, addOwnerRole, addCaretakerRole, addCreditCardRole };