import { UPDATE_USER_ROLE } from '../actions/action_types';

export const initialState = {
  stateUserIsSitter: false,
  stateUserIsOwner: false
};

export const userRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_ROLE:
      return action.payload;
    default:
      return state;
  }
};
