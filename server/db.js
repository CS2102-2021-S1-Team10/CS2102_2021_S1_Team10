const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PCS',
  password: 'YOUR_OWN_PASSWORD', // change to your own pg admin password
  post: 5432
});

module.exports = pool;
