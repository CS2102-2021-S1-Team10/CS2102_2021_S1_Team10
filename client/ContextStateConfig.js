import React, { useReducer } from 'react';
import Context from './utils/context';
import * as ACTIONS from './store/actions/actions';

import * as reducer1 from './store/reducers/plain_reducer';
import * as authReducer from './store/reducers/auth_reducer';
import * as formReducer from './store/reducers/form_reducer';
import Routes from './routes';

import Auth from './utils/auth';

const auth = new Auth();

const ContextState = () => {
  /* 
    Basic reducer
  */
  const [stateReducer1, dispatchReducer1] = useReducer(
    reducer1.reducer1,
    reducer1.initialState
  );

  const handleDispatchTrue = () => {
    dispatchReducer1(ACTIONS.success()); // argument is an action type
  };

  const handleDispatchFalse = () => {
    dispatchReducer1(ACTIONS.failure());
  };

  /* 
    Auth reducer
  */
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    authReducer.authReducer,
    authReducer.initialState
  );

  const handleLogin = () => {
    dispatchAuthReducer(ACTIONS.login_success());
  };

  const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.login_failure());
  };

  const handleAddProfile = (profile) => {
    dispatchAuthReducer(ACTIONS.add_profile(profile));
  };

  const handleRemoveProfile = () => {
    dispatchAuthReducer(ACTIONS.remove_profile());
  };

  /* 
    Form reducer
  */
  const [stateFormReducer, dispatchFormReducer] = useReducer(
    formReducer.formReducer,
    formReducer.initialState
  );

  const handleFormChange = (event) => {
    dispatchFormReducer(ACTIONS.user_input_change(event.target.value));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.persist();
    dispatchFormReducer(
      ACTIONS.user_input_submit(event.target.useContext.value)
    );
  };

  // Handle authentication from callback
  const handleAuthentication = (props) => {
    if (props.location.hash) {
      auth.handleAuth();
    }
  };

  return (
    <div>
      <Context.Provider
        value={{
          // Reducer1
          stateProp1: stateReducer1.stateprop1,
          stateProp2: stateReducer1.stateprop2,
          dispatchContextTrue: () => handleDispatchTrue(),
          dispatchContextFalse: () => handleDispatchFalse(),

          // Form Reducer
          useContextChangeState: stateFormReducer.user_textChange,
          useContextSubmitState: stateFormReducer.user_textSubmit,
          useContextSubmit: (event) => handleFormSubmit(event),
          useContextChange: (event) => handleFormChange(event),

          // Auth Reducer
          authState: stateAuthReducer.is_authenticated,
          profileState: stateAuthReducer.profile,
          handleUserLogin: () => handleLogin(),
          handleUserLogout: () => handleLogout(),
          handleUserAddProfile: (profile) => handleAddProfile(profile),
          handleUserRemoveProfile: () => handleRemoveProfile(),

          //Handle auth
          handleAuth: (props) => handleAuthentication(props),
          authObj: auth
        }}
      >
        <Routes />
      </Context.Provider>
    </div>
  );
};

export default ContextState;
