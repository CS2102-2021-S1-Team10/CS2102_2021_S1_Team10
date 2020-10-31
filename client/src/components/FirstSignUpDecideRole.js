import React from 'react';
import history from '../utils/history';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  headerText: {
    margin: theme.spacing(5, 0, 3, 0), // theme automatically sets spacing to be 8px hence 8px X 5 for top margin
    fontFamily: 'Segoe UI'
  },
  btn: {
      display: 'inline-block',
      textDecoration: 'none',
      fontFamily: 'Segoe UI',
      fontSize: 30,
      color: '#FFF',
      width: 300,
      height: 300,
      borderRadius: '50%',
      textAlign: 'center',
      fontWeight: 'bold',
      verticalAlign: 'middle',
      overflow: 'hidden',
      margin: theme.spacing(0, 4, 0, 4),
      transition: 0.4,
      outline: 0,
      outlineStyle: 'none',
      outlineWidth: 0,
      border: 'none',
      "&:active": {
        transform: 'translateY(2px)',
        borderBottom: 'none'
      }
  }
}));

const FirstSignUpDecideRole = () => {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <Typography component="h1" variant="h2" align="center" className={classes.headerText}>
        I AM A...
      </Typography>
      <Box display="flex" justifyContent="center">
        <button onClick={() => history.push('/create-profile-owner')} 
          className={classes.btn}
          style={{background: '#87befd'}}
        >
          Pet Owner
        </button>

        <button onClick={() => history.push('/create-profile-sitter')} 
          className={classes.btn}
          style={{background: '#ff8181'}}>
          Pet Sitter
        </button>
      </Box>
    </div>
  );
};

export default FirstSignUpDecideRole;
