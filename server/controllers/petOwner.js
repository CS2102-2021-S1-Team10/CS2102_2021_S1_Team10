const petOwnerRouter = require('express').Router();
const pool = require('../db');

petOwnerRouter.post('/get-all-past-bids', async (req, resp, next) => {
  const emailAddr = req.body.petOwnerEmailAddr;
  const queryValues = [emailAddr];
  const query = `SELECT b.petName, CONCAT (u.FirstName, ' ', u.lastName) AS "caretaker Name", b.review, b.rating,
  CASE
    WHEN b.transportmethod = 1 THEN 'Pet Deliver'
    WHEN b.transportmethod = 2 THEN 'Care Taker Pick Up'
    ELSE 'Transfer through the physical building of PCS'
  END AS transportmethod,
  CASE
   WHEN b.success = 1 THEN 'Successful'
   ELSE 'Unsuccessful'
  END AS success, b.totalCost, b.startDate, b.endDate 
  FROM Bids b INNER JOIN PCSUser u ON b.ctemail = u.emailAddr where poemail = $1`;
  try {
    const queryRes = await pool.query(query, queryValues);
    return resp.json(queryRes.rows);
  } catch (error) {
    return resp.status(500).json('An error occurred. Unable get past bids.');
  }
});

petOwnerRouter.post('/make-bid', async (req, resp, next) => {
  const body = req.body;
  const {
    poEmail,
    ctEmail,
    startDate,
    endDate,
    petName,
    serviceType,
    totalCost,
    petSlotsLeft,
    transportMethod,
    paymentType
  } = body.info;
  const queryValues = [transportMethod, paymentType, poEmail, petName, ctEmail, serviceType, totalCost, startDate, endDate, petSlotsLeft];

  const query = `INSERT INTO BIDS VALUES(NULL, NULL, $1, 0, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

  try {
    const queryRes = await pool.query(query, queryValues);
    return resp.json(queryRes.rows);
  } catch (error) {
    return resp.status(500).json('An error occurred. Unable to make bid.');
  }
});


petOwnerRouter.post('/update-petOwner-profile', async (req, resp, next) => {
  const body = req.body;
  const {
   firstName,
   lastName,
   DOB,
   homeAddr, 
   postalCode,
   emailAddr
  } = body.info;
  const queryValues = [firstName,lastName,DOB,homeAddr,postalCode,emailAddr];

  const query = `UPDATE PCSUser SET firstName = $1, lastName = $2, DOB = $3, homeAddr = $4, postalCode = $5 WHERE emailAddr = $6; `;

  try {
    const queryRes = await pool.query(query, queryValues);
    return resp.json(queryRes.rows);
  } catch (error) {
    return resp.status(500).json('An error occurred. Unable to update profile.');
  }
});

petOwnerRouter.post('/get-user-profile', async (req, resp, next) => {
  const body = req.body;
  const {
   emailAddr
  } = body.info;
  const queryValues = [emailAddr];

  const query = `SELECT firstName,lastName, to_char(DOB, 'DD-Mon-YYYY'),homeAddr,postalCode
  FROM PCSUser WHERE emailAddr = $1`;
  try {
    const queryRes = await pool.query(query, queryValues);
    return resp.json(queryRes.rows);
  } catch (error) {
    return resp.status(500).json('An error occurred. Unable to update profile.');
  }
});


module.exports = petOwnerRouter;
