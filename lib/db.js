const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  max: 10,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
    application_name: 'formly',
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
}