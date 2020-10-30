import React, { useContext, useEffect } from 'react';
import Context from '../utils/context';
import checkUserRoleService from '../services/checkUserRoleService';
import Login from './Login';
import FirstSignUpDecideRole from './FirstSignUpDecideRole';

const Home = (_props) => {
  const context = useContext(Context);
  const {
    authObj,
    stateIsAuthenticated,
    stateEmailAddr,
    stateIsOwner,
    stateIsSitter,
    dispatchUpdateUserRole,
    dispatchLoginSuccess,
    dispatchLoginFailure,
  } = context;

  useEffect(() => {
    if (authObj.isAuthenticated()) {
      dispatchLoginSuccess(authObj.emailAddr)
    } else {
      dispatchLoginFailure();
    }
  }, [authObj, dispatchLoginSuccess, dispatchLoginFailure]);

  useEffect(() => {
    if (!stateIsAuthenticated) return;
    try {
      const userRole = checkUserRoleService.getUserRole(stateEmailAddr);
      if (userRole.stateIsOwner === stateIsOwner && userRole.stateIsSitter === stateIsSitter) return;
      dispatchUpdateUserRole(userRole);
    } catch (exception) {
      console.error(exception.data.response.error);
    }
  }, [context, dispatchUpdateUserRole, stateEmailAddr, stateIsAuthenticated, stateIsOwner, stateIsSitter]);

  console.log(stateIsAuthenticated, stateEmailAddr);
  if (!stateIsAuthenticated) {
    return <Login />;
  }

  if (!stateIsSitter && !stateIsOwner) {
    return <FirstSignUpDecideRole />;
  }

  return (
    <div>
      <p>Home</p>
      {stateEmailAddr}
    </div>
  );
};

export default Home;
