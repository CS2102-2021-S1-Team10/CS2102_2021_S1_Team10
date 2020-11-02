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
    stateUserIsOwner,
    stateUserIsSitter,
    dispatchUpdateUserRole,
    dispatchLoginSuccess,
    dispatchLoginFailure
  } = context;

  useEffect(() => {
    // to prevent infinite loop of state being updated
    if (stateIsAuthenticated === authObj.isAuthenticated()) return;
    if (authObj.isAuthenticated()) {
      dispatchLoginSuccess(authObj.emailAddr);
    } else {
      dispatchLoginFailure();
    }
  }, [
    authObj,
    dispatchLoginFailure,
    dispatchLoginSuccess,
    stateIsAuthenticated
  ]);

  const getUserRoleFromCheckUserRoleService = async () => {
    const userRole = await checkUserRoleService.getUserRole(stateEmailAddr);

    // prevent infinite loop of state updates
    if (
      userRole.stateUserIsOwner === stateUserIsOwner &&
      userRole.stateUserIsSitter === stateUserIsSitter
      )
      return;
    dispatchUpdateUserRole(userRole);
  };

  useEffect(() => {
    if (!stateIsAuthenticated) return;

    try {
      getUserRoleFromCheckUserRoleService();
    } catch (exception) {
      console.error(exception.data.response.error);
    }
  }, [stateIsAuthenticated, getUserRoleFromCheckUserRoleService]);

  if (!stateIsAuthenticated) {
    return <Login />;
  }

  if (!stateUserIsSitter && !stateUserIsOwner) {
    return <FirstSignUpDecideRole />;
  }

  return (
    <div>
      <p>Home</p>
    </div>
  );
};

export default Home;
