import React, { useReducer } from 'react';
import Context from '../utils/context';
import * as ACTIONS from '../store/actions/actions';

import * as reducer1 from '../store/reducers/plain_reducer';
import * as authReducer from '../store/reducers/auth_reducer';
import * as userRoleReducer from '../store/reducers/user_role_reducer';
import Routes from '../components/Routes';

import Auth from '../utils/auth';
import AdminAuth from '../utils/adminAuth';

const auth = new Auth();
const adminAuth = new AdminAuth();

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

  const handleLogin = (emailAddr) => {
    dispatchAuthReducer(ACTIONS.login_success(emailAddr));
  };

  const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.login_failure());
  };

  const [stateUserRoleReducer, dispatchUserRoleReducer] = useReducer(
    userRoleReducer.userRoleReducer,
    userRoleReducer.initialState
  );

  const updateUserRole = (userRoleObj) => {
    dispatchUserRoleReducer(ACTIONS.update_user_role(userRoleObj));
  };


  return (
    <div>
      <Context.Provider
        value={{
          stateProp1: stateReducer1.stateprop1,
          stateProp2: stateReducer1.stateprop2,
          dispatchContextTrue: () => handleDispatchTrue(),
          dispatchContextFalse: () => handleDispatchFalse(),

          stateIsAuthenticated: stateAuthReducer.is_authenticated,
          stateEmailAddr: stateAuthReducer.email_addr,
          dispatchLoginSuccess: (emailAddr) => handleLogin(emailAddr),
          dispatchLoginFailure: () => handleLogout(),

          stateUserIsSitter: stateUserRoleReducer.stateUserIsSitter,
          stateUserIsOwner: stateUserRoleReducer.stateUserIsOwner,
          dispatchUpdateUserRole: (userRoleObj) => updateUserRole(userRoleObj),

          authObj: auth, 
          adminAuthObj: adminAuth
        }}
      > 
        <Routes />
      </Context.Provider>
    </div>
  );
};

export default ContextState;
