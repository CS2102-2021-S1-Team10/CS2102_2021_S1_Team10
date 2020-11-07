import { UPDATE_USER_PETS } from '../actions/action_types';

export const initialState = {
    stateUserPets: []
};

export const userPetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PETS:
      return {
        stateUserPets: action.payload
      };
    default:
      return state;
  }
};