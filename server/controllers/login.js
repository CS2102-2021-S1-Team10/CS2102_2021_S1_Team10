const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const TOKEN_PRIVATE_KEY = 'Q94LygU{;<!PMCw';

loginRouter.post('/', async (req, resp) => {
  if (validUser(req.body)) {
    //check to see if email exists in DB
    const body = req.body;
    const selectQuery = `SELECT * FROM PCSUser WHERE emailAddr = $1`;
    const queryValues = [body.emailAddr];



    await pool.query(selectQuery, queryValues)
      .then(async user => {
        console.log('user', user);
        if (user.rowCount != 0) {
          //compare password with hashed pasword 
          const loggedInUser = user.rows[0];
          bcrypt
            .compare(body.pcspass, loggedInUser.pcspasshash)
            .then((async comparedPassword => {
              if (comparedPassword) {
                //setting the 'set-cookie' header
                const isSecure = req.app.get('env') != 'development';
                resp.cookie('user_id', loggedInUser.emailaddr, {
                  httpOnly: true,
                  secure: isSecure, //make it false when in dev
                  signed: true
                });
                const userForTokenSigning = {
                  emailAddr: loggedInUser.emailAddr,
                }
                const token = await jwt.sign(userForTokenSigning, TOKEN_PRIVATE_KEY);
                resp.json({
                  token,
                  data: loggedInUser.emailaddr,
                  message: 'Logged in!'
                });

              } else {
                next(Error('Invalid username or password'));
              }
            }));

        } else {
          next(Error('Invalid username or password'));
        }
      });
  } else {
    next(new Error('Invalid login'));
  }
});

module.exports = loginRouter;
