import history from './history';

export default class Auth {
  headerConfig = null;

  login = async (credentials) => {
    try {
      const userAndToken = {user: 'test', token: 'token123'};
      console.log(userAndToken)
      // const userAndToken = await loginService.login(credentials);
      window.localStorage.setItem(
        'user_and_token',
        JSON.stringify(userAndToken)
      );
      this._setHeaderConfig(userAndToken.token);
      setTimeout(() => {
        history.replace('/authcheck');
      }, 200);
    } catch (exception) {
      console.error(exception.response.data.error);
    }
  };

  logout = () => {
    localStorage.removeItem('user_and_token');
    this._setHeaderConfig(null)
    setTimeout(() => {
      history.replace('/authcheck');
    }, 200);
  };

  isAuthenticated = () => {
    return Boolean(localStorage.getItem('user_and_token'));
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
