import * as ACTION_TYPES from '../actions/action_types';

export const initialState = {
  is_authenticated: false,
  email_addr: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        is_authenticated: true,
        email_addr: action.payload
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        is_authenticated: false,
        email_addr: null
      };
    default:
      return state;
  }
};

// cheryl ng mentioned convenient access to content.