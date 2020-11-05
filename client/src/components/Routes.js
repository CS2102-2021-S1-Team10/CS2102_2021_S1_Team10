import React, { useContext } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import history from '../utils/history';
import Context from '../utils/context';
import AuthCheck from '../utility-components/AuthCheck';

import Home from './Home';
import NavBar from './NavBar';
import PrivateComponent from './PrivateComponent';
import Login from './Login';
import SignUp from './SignUp';
import FirstSignUpDecideRole from './FirstSignUpDecideRole';
import CreateProfileFormOwner from './create_profile/CreateProfileFormOwner';
import BookingWidget from './booking/BookingWidget';
import CreateProfileFormCaretaker from './create_profile/CreateProfileFormCaretaker';


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
  const userIsLoggedIn = context.stateIsAuthenticated;
  const userHasRole = context.stateIsOwner || context.stateIsSitter;
  
  return (
    <div>
      <Router history={history}>
        {userIsLoggedIn && userHasRole
          ? <NavBar />
          :  null
        }
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/authcheck" component={AuthCheck} />
            <Route path="/user/signup" component={SignUp} />
            <Route path="/first-time-sign-up" component={FirstSignUpDecideRole} />
            <Route path="/create-profile-owner" component={CreateProfileFormOwner} />
            <Route path="/create-profile-caretaker" component={CreateProfileFormCaretaker}/>
            <Route path="/widget" component={BookingWidget} />

            <PrivateRoute
              path="/privateroute"
              auth={context.stateIsAuthenticated}
              component={PrivateComponent}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Routes;
