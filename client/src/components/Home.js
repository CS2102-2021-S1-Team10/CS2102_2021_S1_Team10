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
    if (stateIsAuthenticated === authObj.isAuthenticated()) return;
    if (authObj.isAuthenticated()) {
      dispatchLoginSuccess(authObj.emailAddr)
    } else {
      dispatchLoginFailure();
    }
  }, [authObj, dispatchLoginFailure, dispatchLoginSuccess, stateIsAuthenticated]);

  // useEffect(() => {
  //   if (!stateIsAuthenticated) return;
  //   try {
  //     const userRole = checkUserRoleService.getUserRole(stateEmailAddr);
  //     console.log(123);
  //     // if (userRole.stateIsOwner === stateIsOwner && userRole.stateIsSitter === stateIsSitter) return;
  //     // dispatchUpdateUserRole(userRole);
  //   } catch (exception) {
  //     console.error(exception.data.response.error);
  //   }
  // }, []);

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
