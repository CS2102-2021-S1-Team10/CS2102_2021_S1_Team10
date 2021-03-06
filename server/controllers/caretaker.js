const caretakerRouter = require('express').Router();
const pool = require('../db');

caretakerRouter.get(
  '/get-all-caretakers-availability',
  async (req, resp, next) => {
    const query = `SELECT u.firstName, u.lastName, c.avgrating, a.serviceType, a.serviceDescription, a.dailyPrice, a.startDate, a.endDate, a.emailAddr
  FROM Availability a INNER JOIN PCSUser u ON 
    a.emailAddr = u.emailAddr JOIN CareTaker c ON 
    c.emailAddr = a.emailAddr`;

    try {
      const queryRes = await pool.query(query);
      const rows = queryRes.rows;
      return resp.json(rows);
    } catch (exception) {
      return resp.status(500).json({
        error: "Unable to fetch caretakers' schedules"
      });
    }
  }
);

caretakerRouter.post('/accept-bid', async (req, resp, next) => {
  const body = req.body;
  const { poEmail, ctEmail, startDate, endDate, petName } = body.info;
  const queryValues = [poEmail, ctEmail, startDate, endDate, petName];
  const query = `
  UPDATE Bids
  SET success = 1
  WHERE poemail = $1 AND ctemail = $2 AND startDate = $3 AND endDate = $4 AND petName = $5;`;
  try {
    await pool.query(query, queryValues);
    return resp.status(200).end();
  } catch (error) {
    return resp.status(500).json("An error occurred. Unable to accept bid.");
  }
});


caretakerRouter.post('/update-careTaker-profile', async (req, resp, next) => {
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

caretakerRouter.post('/get-user-profile', async (req, resp, next) => {
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




module.exports = caretakerRouter;
