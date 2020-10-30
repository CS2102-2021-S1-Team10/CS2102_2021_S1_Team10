const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

usersRouter.post('/signup', async (req, resp, next) => {
  const body = req.body;
  const SALT_ROUNDS = 10;

  const emailAddr = body.emailAddr;
  const passwordHash = await bcrypt.hash(body.pcspass, SALT_ROUNDS);
	const values = [emailAddr, passwordHash];
	const query = `INSERT INTO PCSUser(emailAddr, pcspassHash) Values ($1, $2)`;

	
  try {
    await pool.query(query, values);
  } catch (exception) {
    return resp.status(500).json({ error: 'An account has already been registered to this email address.'});
  }
	resp.status(204).end();
});


usersRouter.post('/user/get-user-role', async (req, resp, next) => {
  const body = req.body;
  const emailAddr = body.emailAddr;
  const values = [emailAddr];
  const queryFromOwns = `SELECT emailAddr FROM Owns WHERE emailAddr = $1`;
  const queryFromCaretaker = `SELECT emailAddr FROM Caretaker WHERE emailAddr = $1`;
  
  const queryOwnsResult = await pool.query(queryFromOwns, values).catch(next);
  const queryCaretakerResult = await pool.query(queryFromCaretaker, values).catch(next);
  const isOwner = queryOwnsResult.rows.length > 0;
  const isCaretaker = queryCaretakerResult.rows.length > 0;

  const userRole = {
    stateIsOwner: isOwner,
    stateIsSitter: isCaretaker
  }
  
  resp.json(userRole);
});


module.exports = usersRouter;