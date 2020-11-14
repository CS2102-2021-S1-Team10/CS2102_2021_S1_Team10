import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Context from '../utils/context';
import userService from '../services/userService';

import NavBar from '../components/NavBar';
import EditProfile from './EditProfile';

const useStyles = makeStyles({
  table: {
    minWidth: 800
  }
});

export default function UserProfile() {
  const classes = useStyles();
  const context = useContext(Context);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Wick',
    address: 'The Continental',
    postalCode: '911911',
    birthday: '11-11-1980'
  });
  const { firstName, lastName, postalCode, birthday } = profile;

  const useEffectCallback = () => {
    const getUserProfileFromUserService = async () => {
      const profile = await userService.getUserProfile(context.stateEmailAddr);
      setProfile(profile);
    };

    try {
      // calling the async function
      getUserProfileFromUserService(context.stateEmailAddr);
    } catch (exception) {
      console.error(exception.data.response.error);
    }
  };

  useEffect(useEffectCallback, []);

  return (
    <>
      <NavBar />

      <div className="col-md-6 mt-5 offset-md-3">
        <h2 style={{ textAlign: 'center' }}>My Profile</h2>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell component="th" align="center">
                  Name
                </TableCell>
                <TableCell component="th" align="center">
                  Postal Code
                </TableCell>
                <TableCell component="th" align="center">
                  Birthday
                </TableCell>
                <TableCell component="th" align="center">
                  Update Profile
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={firstName}>
                <TableCell component="th" scope="row">
                  {firstName + ' ' + lastName}
                </TableCell>
                <TableCell align="center"> {postalCode} </TableCell>
                <TableCell align="center"> {birthday} </TableCell>
                <TableCell align="center">
                  {' '}
                  <EditProfile user={profile} />{' '}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
