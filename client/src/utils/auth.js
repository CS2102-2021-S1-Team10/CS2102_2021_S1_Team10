import history from './history';
import loginService from '../services/loginService';

export default class Auth {
  headerConfig = null;
  emailAddr = null;

  login = async (credentials) => {
    const userToken = await loginService.login(credentials);
    // if login fails, the below lines are not executed
    window.localStorage.setItem('userToken', JSON.stringify(userToken));
    this._setHeaderConfig(userToken.token);
    this._setEmailAddr(userToken.emailAddr);
    setTimeout(() => {
      history.replace('/authcheck');
    }, 200);
  };

  logout = () => {
    localStorage.removeItem('userToken');
    this._setHeaderConfig(null);
    this._setEmailAddr(null);
    setTimeout(() => {
      history.replace('/authcheck');
    }, 200);
  };

  // single source of truth
  isAuthenticated = () => {
    if (Boolean(localStorage.getItem('userToken'))) {
      const userToken = JSON.parse(localStorage.getItem('userToken'));
      this._setHeaderConfig(userToken.token);
      this._setEmailAddr(userToken.emailAddr);
      return true;
    } else {
      this._setHeaderConfig(null);
      this._setEmailAddr(null);
      return false;
    }
   
  };
  
  _setEmailAddr = (emailAddr) => {
    this.emailAddr = emailAddr;
  }

  _setHeaderConfig = (token) => {
    let authorizationStr = null;
    if (token) {
      authorizationStr = `Bearer ${token}`;
    }
    this.headerConfig = {
      headers: { Authorization: authorizationStr }
    };
  };
}
