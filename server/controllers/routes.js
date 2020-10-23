const express = require('express');
const { route } = require('../app');
const router = express.Router();

router.get('/api/hello', (req, res) => {
  res.json('hello world');
});


module.exports = router;
