import React, { useEffect, useContext } from 'react';
import history from '../utils/history';
import Context from '../utils/context';

const AuthCheck = () => {
  const context = useContext(Context);

  useEffect(() => {
    if (context.authObj.isAuthenticated()) {
      context.dispatchLoginSuccess(context.authObj.emailAddr);
      history.replace('/');
    } else {
      context.dispatchLoginFailure();
      history.replace('/login');
    }
  }, [context]);

  return <div></div>;
};

export default AuthCheck;
