const adminLoginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../db');

const TOKEN_PRIVATE_KEY = 'Q94LygU{;<!PMCw';

adminLoginRouter.post('/', async (req, resp) => {
  const body = req.body;
  const queryValues = [body.adminEmailAddr];
  const query = `SELECT * FROM PCSAdmin WHERE adminEmailAddr = $1`;

  const queryRes = await pool.query(query, queryValues);
  const resultRows = queryRes.rows;

  if (resultRows.length === 0) { // emailAddr does not exist
    return resp.status(401).json({ error: 'Invalid username or password' });
  } else {
   
    const pcsAdmin = resultRows[0];
    console.log(pcsAdmin,body);
    const passwordIsCorrect = (body.pcsAdminPass === pcsAdmin.pcsadminpass);
    if (!passwordIsCorrect) return resp.status(401).json({ error: 'Invalid username or password' });
  }
  

  const pcsAdmin = resultRows[0];
  const userForTokenSigning = {
    adminEmailAddr: pcsAdmin.adminEmailAddr
  }

  const token = await jwt.sign(userForTokenSigning, TOKEN_PRIVATE_KEY);
  const userAndToken = {
    token,
    adminEmailAddr: body.adminEmailAddr
  }
  resp
    .status(200)
    .json(userAndToken);
});

module.exports = adminLoginRouter;
