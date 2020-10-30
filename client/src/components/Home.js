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
    // to prevent infinite loop of state being updated
    if (stateIsAuthenticated === authObj.isAuthenticated()) return;
    if (authObj.isAuthenticated()) {
      console.log(authObj);
      dispatchLoginSuccess(authObj.emailAddr);
    } else {
      dispatchLoginFailure();
    }
  }, [authObj, dispatchLoginFailure, dispatchLoginSuccess, stateIsAuthenticated]);

  useEffect(() => {
    if (!stateIsAuthenticated) return;
    try {
      const userRole = checkUserRoleService.getUserRole(stateEmailAddr);
      // if (userRole.stateIsOwner === stateIsOwner && userRole.stateIsSitter === stateIsSitter) return;
      // dispatchUpdateUserRole(userRole);
    } catch (exception) {
      console.error(exception.data.response.error);
    }
  }, []);

  if (!stateIsAuthenticated) {
    return <Login />;
  }

  if (!stateIsSitter && !stateIsOwner) {
    return <FirstSignUpDecideRole />;
  }

  return (
    <div>
      <p>Home</p>
      
    </div>
  );
};

export default Home;
