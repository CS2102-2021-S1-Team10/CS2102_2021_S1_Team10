import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

const CreditCardForm = (props) => {
  const { setCreditCard, setCVC, setExpiryDate } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Credit Card
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="creditCardNumber">Card No.</InputLabel>
          <TextField
            required
            id="creditCardNumber"
            name="creditCardNumber"
            fullWidth
            autoComplete="credit-card-number"
            onChange={(e) => setCreditCard(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            id="month"
            label="Expires"
            type="month"
            fullWidth
            defaultValue="2021-01"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <InputLabel htmlFor="cvc">CVC</InputLabel>
          <TextField
            required
            id="cvc"
            name="cvc"
            fullWidth
            autoComplete="cvc"
            onChange={(e) => setCVC(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CreditCardForm;
