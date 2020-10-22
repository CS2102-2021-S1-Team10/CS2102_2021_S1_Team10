import * as ACTION_TYPES from '../actions/action_types';

export const initialState = {
  is_authenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        is_authenticated: true
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        is_authenticated: false
      };
    default:
      return state;
  }
};
