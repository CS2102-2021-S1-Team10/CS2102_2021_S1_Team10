import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const PetForm = (props) => {
  const {
    setPetName,
    setBreed,
    setPetType,
    setPetGender,
    setWeight,
    setPetBirthday,
    setSpecialRequirements
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        My Pet
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="petName">Pet name</InputLabel>
          <TextField
            required
            id="petName"
            name="petName"
            fullWidth
            autoComplete="pet-name"
            onChange={(e) => setPetName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="breed">Pet Breed</InputLabel>
          <TextField
            required
            id="breed"
            name="breed"
            fullWidth
            autoComplete="breed"
            onChange={(e) => setBreed(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputLabel shrink id="pet-type">
            Pet type
          </InputLabel>
          <Select
            labelId="pet-type"
            id="pet-type"
            onChange={(e) => setPetType(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Rabbit">Rabbit</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={3}>
          <InputLabel shrink id="gender">
            Gender
          </InputLabel>
          <Select
            labelId="gender"
            id="gender"
            onChange={(e) => setPetGender(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="weight"
            label="Weight"
            type="number"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="date"
            label="Pet's Birthday"
            type="date"
            fullWidth
            defaultValue="2000-01-01"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(e) => setPetBirthday(e.target.value)}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="specialRequirements"
            label="Special requirements"
            multiline
            rows={3}
            defaultValue="Spot the golden retriever is very fussy and requires lots of love!"
            variant="outlined"
            fullWidth
            onChange={(e) => setSpecialRequirements(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PetForm;
