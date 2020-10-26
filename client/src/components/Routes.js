import React, { useContext } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import history from '../utils/history';
import Context from '../utils/context';
import AuthCheck from '../utility-components/AuthCheck';

import Home from './Home';
import Header from './Header';
import HooksDemo from './HooksDemo';
import HooksForm from './HooksForm';
import PrivateComponent from './PrivateComponent';
import Login from './Login';
import SignUp from './SignUp';

const PrivateRoute = ({ component: PrivateComponent, auth }) => (
  <Route
    render={(props) =>
      auth === true ? (
        <PrivateComponent auth={auth} {...props} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      )
    }
  />
);

const Routes = () => {
  const context = useContext(Context);

  return (
    <div>
      <Router history={history}>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/hooksform" component={HooksForm} />
            <Route path="/hooksdemo" component={HooksDemo} />
            <Route path="/authcheck" component={AuthCheck} />
            <Route path="/signup" component={SignUp} />

            <PrivateRoute
              path="/privateroute"
              auth={context.authState}
              component={PrivateComponent}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Routes;
