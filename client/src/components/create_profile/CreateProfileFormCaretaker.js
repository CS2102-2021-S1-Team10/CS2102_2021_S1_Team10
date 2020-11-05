import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Context from '../../utils/context';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CaretakerForm from './CaretakerForm';
import userRoleService from '../../services/userRoleService';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(7),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = ['Caretaker Details'];

// forms are uncontrolled for now, not best practice but KIV
const CreateProfileFormCaretaker = (_props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  const [birthday, setBirthday] = React.useState('');

  const context = useContext(Context);

  // TODO: make into controlled component
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <CaretakerForm
            setFirstName={setFirstName}
            setLastName={setLastName}
            setAddress={setAddress}
            setPostalCode={setPostalCode}
            setBirthday={setBirthday}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = async () => {
    // submit form and update db, then update context state
    if (activeStep + 1 === 1) {
      const caretaker = {firstName, lastName, address, postalCode, birthday};
      const updatedUserRoleObj = await userRoleService.addCaretakerRole(caretaker, context.stateEmailAddr);
      context.dispatchUpdateUserRole(updatedUserRoleObj);
    } else {
      setActiveStep(activeStep);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            SignUp Form
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Caretaker Profile
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <React.Fragment>
            {getStepContent(activeStep)}
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default CreateProfileFormCaretaker;