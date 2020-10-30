import React, { useState, useContext } from 'react';
import Context from '../utils/context';
import Notification from './Notification';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PetsIcon from '@material-ui/icons/Pets';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import createAccountService from '../services/createAccountService';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage:
      'url(https://image.freepik.com/free-vector/flat-design-people-with-different-pets-set_23-2148397528.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'fit',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUp = (_props) => {
  const classes = useStyles();
  const context = useContext(Context);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const signUpNewAccount = async (event) => {
    event.preventDefault();
    const credentials = {
      emailAddr: username,
      pcspass: password
    };
    try {
      await createAccountService.createNewAccount(credentials);
      setUsername('');
      setPassword('');
      setSuccessMessage(
        'Account was successfully created, you will be logged in shortly'
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3500);
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3500);
		}
		await context.authObj.login(credentials);

  };

  return (
    <div>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PetsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up for new account
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={signUpNewAccount}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                id="usernaame"
                autoFocus
                autoComplete="off"
                value={username}
                onChange={handleUsernameChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Account
              </Button>
            </form>
						<div>
              Existing user? <Link to="/login">Log in</Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
