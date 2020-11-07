const usersRouter = require('express').Router();
const pool = require('../db');

usersRouter.post('/signup', async (req, resp, next) => {
  const body = req.body;
  const { emailAddr, pcspass } = body;

  const values = [emailAddr, pcspass];
  const query = `INSERT INTO PCSUser(emailAddr, pcspass) Values ($1, $2)`;

  try {
    await pool.query(query, values);
  } catch (exception) {
    return resp.status(500).json({
      error: 'An account has already been registered to this email address.'
    });
  }
  resp.status(204).end();
});

usersRouter.post('/get-user-role', async (req, resp, next) => {
  const body = req.body;
  const emailAddr = body.emailAddr;
  const values = [emailAddr];
  const queryFromOwns = `SELECT emailAddr FROM Owns WHERE emailAddr = $1`;
  const queryFromCaretaker = `SELECT emailAddr FROM Caretaker WHERE emailAddr = $1`;

  const queryOwnsResult = await pool.query(queryFromOwns, values).catch(next);
  const queryCaretakerResult = await pool
    .query(queryFromCaretaker, values)
    .catch(next);
  const isOwner = queryOwnsResult.rows.length > 0;
  const isCaretaker = queryCaretakerResult.rows.length > 0;

  const userRole = {
    stateUserIsOwner: isOwner,
    stateUserIsSitter: isCaretaker
  };

  resp.json(userRole);
});

usersRouter.post('/add-owner-role', async (req, resp, next) => {
  const { owner, pet, emailAddr } = req.body;

  const valuesForQuery = [emailAddr];
  const queryFromCaretaker = `SELECT emailAddr FROM Caretaker WHERE emailAddr = $1`;
  const queryCaretakerResult = await pool
    .query(queryFromCaretaker, valuesForQuery)
    .catch(next);
  const isOwner = true;
  const isCaretaker = queryCaretakerResult.rows.length > 0;

  const userRole = {
    stateUserIsOwner: isOwner,
    stateUserIsSitter: isCaretaker
  };


  // todo update db records 
  resp.json(userRole);
});


usersRouter.post('/get-user-pets', async (req, resp, next) => {
  const valuesForQuery = [req.body.emailAddr];
  const queryFromOwns = `SELECT petName, petType, specialRequirements FROM Owns WHERE emailAddr = $1`;
  const queryOwnsResult = await pool
    .query(queryFromOwns, valuesForQuery)
    .catch(next);

  const allPets = [];
  for (const row of queryOwnsResult.rows) {
    const { petname: petName, pettype: petType, specialrequirements: specialRequirements } = row;
    const pet = {
      petName, petType, specialRequirements
    }
    allPets.push(pet);
  }
  resp.json(allPets);
});



module.exports = usersRouter;
