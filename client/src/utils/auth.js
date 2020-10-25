import history from './history';
import loginService from '../services/loginService';

export default class Auth {
  headerConfig = null;

  login = async (credentials) => {
    try {
      const token = await loginService.login(credentials);
      window.localStorage.setItem(
        'userToken',
        JSON.stringify(token)
      );
      this._setHeaderConfig(token);
      setTimeout(() => {
        history.replace('/authcheck');
      }, 200);
    } catch (exception) {
      console.error(exception.response.data.error);
    }
  };

  logout = () => {
    localStorage.removeItem('userToken');
    this._setHeaderConfig(null)
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
