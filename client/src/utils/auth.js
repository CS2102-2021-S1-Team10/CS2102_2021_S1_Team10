import history from './history';
import loginService from '../services/loginService';

export default class Auth {
  headerConfig = null;

  login = async (credentials) => {
    const token = await loginService.login(credentials);
    // if login fails, the below lines are not executed
    window.localStorage.setItem('userToken', JSON.stringify(token));
    this._setHeaderConfig(token);
    setTimeout(() => {
      history.replace('/authcheck');
    }, 200);
  };

  logout = () => {
    localStorage.removeItem('userToken');
    this._setHeaderConfig(null);
    setTimeout(() => {
      history.replace('/authcheck');
    }, 200);
  };

  isAuthenticated = () => {
    return Boolean(localStorage.getItem('userToken'));
  };

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
