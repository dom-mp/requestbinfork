import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  database: 'requestbin',
  port: 5432
});

export default pool;