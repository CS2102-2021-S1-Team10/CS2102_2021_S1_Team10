import React, { useContext, useEffect } from 'react';
import Context from '../utils/context';
import userRoleService from '../services/userRoleService';
import Login from './Login';
import FirstSignUpDecideRole from './FirstSignUpDecideRole';
import BookingWidget from './booking/BookingWidget';
import NavBar from './NavBar';

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

  useEffect(() => {
    if (!stateIsAuthenticated) return;

    const getUserRoleFromUserRoleService = async () => {
      const userRole = await userRoleService.getUserRole(stateEmailAddr);

      // prevent infinite loop of state updates
      if (
        userRole.stateUserIsOwner === stateUserIsOwner &&
        userRole.stateUserIsSitter === stateUserIsSitter
      )
        return;
      dispatchUpdateUserRole(userRole);
    };

    try {
      getUserRoleFromUserRoleService();
    } catch (exception) {
      console.error(exception.data.response.error);
    }
  }, [stateIsAuthenticated, dispatchUpdateUserRole, stateEmailAddr, stateUserIsOwner, stateUserIsSitter]);

  if (!stateIsAuthenticated) {
    return <Login />;
  }

  if (!stateUserIsSitter && !stateUserIsOwner) {
    return <FirstSignUpDecideRole />;
  }

  return (
    <div>
      <NavBar />
      <BookingWidget />
    </div>
  );
};

export default Home;
