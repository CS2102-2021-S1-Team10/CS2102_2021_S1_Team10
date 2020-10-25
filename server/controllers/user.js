const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

usersRouter.post('/', async (req, resp, next) => {
  const body = req.body;
  const SALT_ROUNDS = 10;

  const emailAddr = body.username;
  const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS);
	const values = [emailAddr, passwordHash];
	const query = `INSERT INTO PCSUser(emailAddr, pcspass) Values ($1, $2)`;

	const queryRes = await pool.query(query, values);
	queryRes.statusCode(204).end();
});

module.exports = usersRouter;
