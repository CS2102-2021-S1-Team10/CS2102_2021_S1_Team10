const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const TOKEN_PRIVATE_KEY = 'Q94LygU{;<!PMCw';

loginRouter.post('/', async (req, resp) => {
  const body = req.body;
  const queryValues = [body.emailAddr];
  const query = `SELECT * FROM PCSUser WHERE emailAddr = $1`;

  const queryRes = await pool.query(query, queryValues);
  const resultRows = queryRes.rows;

  if (resultRows.length === 0) { // emailAddr does not exist
    return resp.status(401).json({ error: 'Invalid username or password' });
  } else {
    const pcsUser = resultRows[0];
    const passwordIsCorrect = await bcrypt.compare(body.pcspass, pcsUser.pcspasshash);
    if (!passwordIsCorrect) return resp.status(401).json({ error: 'Invalid username or password' });
  }
  

  const pcsUser = resultRows[0];
  const userForTokenSigning = {
    emailAddr: pcsUser.emailAddr
  }

  const token = await jwt.sign(userForTokenSigning, TOKEN_PRIVATE_KEY);

  resp
    .status(200)
    .json(token);
});

module.exports = loginRouter;
