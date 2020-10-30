const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

usersRouter.post('/', async (req, resp, next) => {
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

module.exports = usersRouter;