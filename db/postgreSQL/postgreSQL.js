/* eslint-disable no-console */
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '3.101.25.202',
  port: '5432',
  database: 'twola',
  password: 'OrangeJuice11!', 
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
