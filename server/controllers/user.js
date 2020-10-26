const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

//Users can sign up with valid email/password
//Users cannot sign up with a blank or missing email
//Users cannot sign up with a blank or incorrect password
function validUser(user) {
  const validEmail = typeof user.emailAddr == 'string' &&
    user.emailAddr.trim() != '';

  const validPassword = typeof user.pcspass == 'string' &&
    user.pcspass.trim() != '' &&
    user.pcspass.trim().length >= 6;

  return validEmail && validPassword;
}

usersRouter.post('/', async (req, resp, next) => {
  if (validUser(req.body)) {
    const body = req.body;
    const emailAddr = body.emailAddr;
    const selectQuery = `SELECT * FROM PCSUser WHERE emailAddr = $1`;
    const selectQueryValues = [emailAddr];
    const insertQuery = `INSERT INTO PCSUser(emailAddr, pcspassHash) Values ($1, $2) RETURNING *`;

    await pool.query(selectQuery, selectQueryValues)
      .then(async user => {
        console.log('user', user);
        // if user not found
        if (user.rowCount == 0) {
          //this is a unique email proceed to create account
          await bcrypt.hash(body.pcspass, 10)
            .then(( async passwordHash => {
              const insertQueryValues = [body.emailAddr, passwordHash]
                await pool.query(insertQuery, insertQueryValues)
                .then(insertResult => {
                  data = insertResult.rows[0].emailaddr;
                  console.log('insertResult', insertResult);
                  if (insertResult.rowCount == 0) {
                    resp.json({
                      message: "Unuccessful account creation."
                    });
                  }
                  else {
                    resp.json({
                      data,
                      message: "You have successfully created an account!"
                    });
                  }
                });
            }));
        }
        else {
          //Email already in use
          next(new Error('Email already in use'));
        }
      })
      .catch(e => console.error(e.stack))


  } else {
    next(new Error('Invalid user'));
  }

});

module.exports = usersRouter;
