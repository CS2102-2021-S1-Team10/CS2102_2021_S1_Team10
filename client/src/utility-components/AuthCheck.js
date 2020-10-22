import React, { useEffect, useContext } from 'react';
import history from '../utils/history';
import Context from '../utils/context';

const AuthCheck = () => {
  const context = useContext(Context);

  useEffect(() => {
    if (context.authObj.isAuthenticated()) {
      context.handleUserLogin();
      history.replace('/');
    } else {
      context.handleUserLogout();
      history.replace('/');
    }
  }, [context]);

  return <div></div>;
};

export default AuthCheck;
