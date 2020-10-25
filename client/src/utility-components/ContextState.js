import React, { useReducer } from 'react';
import Context from '../utils/context';
import * as ACTIONS from '../store/actions/actions';

import * as reducer1 from '../store/reducers/plain_reducer';
import * as authReducer from '../store/reducers/auth_reducer';
import Routes from '../components/Routes';

import Auth from '../utils/auth';

const auth = new Auth();

const ContextState = () => {
  const [stateReducer1, dispatchReducer1] = useReducer(
    reducer1.reducer1,
    reducer1.initialState
  );

  const handleDispatchTrue = () => {
    dispatchReducer1(ACTIONS.success());
  };

  const handleDispatchFalse = () => {
    dispatchReducer1(ACTIONS.failure());
  };

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

  return (
    <div>
      <Context.Provider
        value={{
          stateProp1: stateReducer1.stateprop1,
          stateProp2: stateReducer1.stateprop2,
          dispatchContextTrue: () => handleDispatchTrue(),
          dispatchContextFalse: () => handleDispatchFalse(),

          authState: stateAuthReducer.is_authenticated,
          handleUserLogin: () => handleLogin(),
          handleUserLogout: () => handleLogout(),

          authObj: auth
        }}
      > 
        <Routes />
      </Context.Provider>
    </div>
  );
};

export default ContextState;
