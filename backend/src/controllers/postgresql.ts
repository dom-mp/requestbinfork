const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'requestbin',
  port: 5432
});

module.exports = pool;