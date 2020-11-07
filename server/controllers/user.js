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
  const { owner, creditCard, pet, emailAddr } = req.body;

  const valuesForQuery1 = [emailAddr];
  const queryFromCaretaker = `SELECT emailAddr FROM Caretaker WHERE emailAddr = $1`;
  const queryCaretakerResult = await pool
    .query(queryFromCaretaker, valuesForQuery1)
    .catch(next);
  const isOwner = true;
  const isCaretaker = queryCaretakerResult.rows.length > 0;

  const userRole = {
    stateUserIsOwner: isOwner,
    stateUserIsSitter: isCaretaker
  };

  const {
    firstName,
    lastName,
    birthday: DOB,
    address: homeAddr,
    postalCode
  } = owner;
  const valuesForUpdatingPCSUser = [
    firstName,
    lastName,
    DOB,
    homeAddr,
    postalCode,
    emailAddr
  ];
  const queryUpdatePCSUser = `UPDATE PCSUser SET firstName = $1, lastName = $2, DOB = $3, homeAddr = $4, postalCode = $5 WHERE emailAddr = $6`;

  await pool.query(queryUpdatePCSUser, valuesForUpdatingPCSUser).catch(next);

  const {
    creditCardNum,
    CVC: creditCardCVC,
    expiryDate: creditCardExpiryDate
  } = creditCard;
  const valuesForInsertPetOwner = [
    emailAddr,
    creditCardNum,
    creditCardCVC,
    creditCardExpiryDate
  ];
  const queryInsertPetOwner = `INSERT INTO PetOwner VALUES ($1, $2, $3, $4)`;

  await pool.query(queryInsertPetOwner, valuesForInsertPetOwner).catch(next);

  const {
    petName,
    breed,
    petType,
    petGender: sex,
    weight,
    petBirthday,
    specialRequirements
  } = pet;
  const valuesForInsertOwns = [
    emailAddr,
    petName,
    petType,
    breed,
    weight,
    sex,
    specialRequirements,
    petBirthday,
  ];
  const queryInsertOwns = `INSERT INTO Owns Values ($1, $2, $3, $4, $5, $6, $7, $8)`;
  await pool.query(queryInsertOwns, valuesForInsertOwns).catch(next);
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
    const {
      petname: petName,
      pettype: petType,
      specialrequirements: specialRequirements
    } = row;
    const pet = {
      petName,
      petType,
      specialRequirements
    };
    allPets.push(pet);
  }
  resp.json(allPets);
});

module.exports = usersRouter;
