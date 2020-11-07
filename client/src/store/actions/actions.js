import * as ACTION_TYPES from './action_types';

export const success = () => {
  return {
    type: ACTION_TYPES.SUCCESS
  };
};

export const failure = () => {
  return {
    type: ACTION_TYPES.FAILURE
  };
};

export const login_success = (emailAddr) => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    payload: emailAddr
  };
};

export const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE
  };
};

export const update_user_role = (userRoleObj) => {
  return {
    type: ACTION_TYPES.UPDATE_USER_ROLE,
    payload: userRoleObj
  };
};

export const update_user_pets = (allPets) => {
  return {
    type: ACTION_TYPES.UPDATE_USER_PETS,
    payload: allPets
  };
};