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
    petSlotsLeft
  } = body.info;
  const queryValues = [poEmail, ctEmail, startDate, endDate, petName];
});

module.exports = petOwnerRouter;
