import React, { useEffect, useContext } from 'react';
import history from '../utils/history';
import Context from '../utils/context';

const AdminAuthCheck = () => {
  const context = useContext(Context);
//IS ADMIN OR USER
  useEffect(() => {
    if (context.adminAuthObj.isAuthenticated()) {
      context.dispatchLoginSuccess(context.adminAuthObj.emailAddr);
      history.replace('/');
    } else {
      context.dispatchLoginFailure();
      history.replace('/admin-login');
    }
  }, [context]);

  return <div></div>;
};

export default AdminAuthCheck;
