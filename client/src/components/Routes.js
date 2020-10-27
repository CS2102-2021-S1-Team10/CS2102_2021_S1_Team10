import React, { useContext } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import history from '../utils/history';
import Context from '../utils/context';
import AuthCheck from '../utility-components/AuthCheck';

import Home from './Home';
import NavBar from './NavBar';
import HooksDemo from './HooksDemo';
import HooksForm from './HooksForm';
import PrivateComponent from './PrivateComponent';
import Login from './Login';
import SignUp from './SignUp';
import FirstSignUpDecideRole from './FirstSignUpDecideRole';


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
  const userIsLoggedIn = context.authState;
  
  return (
    <div>
      <Router history={history}>
        {userIsLoggedIn
          ? <NavBar />
          : null
        }
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/hooksform" component={HooksForm} />
            <Route path="/hooksdemo" component={HooksDemo} />
            <Route path="/authcheck" component={AuthCheck} />
            <Route path="/signup" component={SignUp} />
            <Route path="/first-time-sign-up" component={FirstSignUpDecideRole} />

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
