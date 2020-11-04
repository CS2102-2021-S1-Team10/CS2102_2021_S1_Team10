import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import headerImg from './header-img.jpg';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundImage: `url(${headerImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    height: '100vh',
    paddingTop: '1px'
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3)
    }
  },
  buttonAlignment: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 12
  }
}));

const BookingWidget = (_props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.wrapper}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h3" align="center" gutterBottom>
              Book a sitter
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <InputLabel shrink id="pet">
                  My pet
                </InputLabel>
                <Select
                  labelId="pet"
                  id="pet"
                  displayEmpty
                  fullWidth
                  value="My Pet"
                >
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Cat">Cat</MenuItem>
                  <MenuItem value="Rabbit">Rabbit</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="start-date"
                  label="Start date"
                  type="date"
                  fullWidth
                  defaultValue="2020-11-01"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="end-date"
                  label="End date"
                  type="date"
                  fullWidth
                  defaultValue="2020-12-01"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>

              <div className={classes.buttonAlignment}>
                <Button variant="contained" color="primary">
                  Check Availability
                </Button>
              </div>
            </Grid>
          </Paper>
        </main>
      </div>
    </React.Fragment>
  );
};

export default BookingWidget;
