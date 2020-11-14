import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

const OwnerForm = (props) => {
  const {
    setFirstName,
    setLastName,
    setAddress,
    setPostalCode,
    setBirthday,
    firstName,
    lastName,
    address,
    postalCode,
    birthday
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Me
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="firstName">First name</InputLabel>
          <TextField
            required
            id="firstName"
            name="firstName"
            fullWidth
            autoComplete="given-name"
            onChange={(e) => setFirstName(e.target.value)}
            value = {firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="lastName">Last name</InputLabel>
          <TextField
            required
            id="lastName"
            name="lastName"
            fullWidth
            autoComplete="family-name"
            onChange={(e) => setLastName(e.target.value)}
            value = {lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel htmlFor="address">Address</InputLabel>
          <TextField
            required
            id="address"
            name="address"
            fullWidth
            autoComplete="address"
            onChange={(e) => setAddress(e.target.value)}
            value = {address}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="postalCode">Postal code</InputLabel>
          <TextField
            required
            id="postalCode"
            name="postalCode"
            fullWidth
            autoComplete="postal-code"
            onChange={(e) => setPostalCode(e.target.value)}
            value = {postalCode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            fullWidth
            defaultValue="1990-01-01"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(e) => setBirthday(e.target.value)}
            value = {birthday}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OwnerForm;
