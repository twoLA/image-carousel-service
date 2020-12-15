const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'twoLA-carousel',
  password: 'OrangeJuice11!',
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const dropTables = 'DROP TABLE IF EXISTS listings, users, favorites, similars';

const listings = `
  CREATE TABLE IF NOT EXISTS listings (
    id serial primary key,
    price int not null,
    bedrooms smallint not null,
    baths smallint not null,
    sq_footage int not null,
    address varchar(95),
    neighborhood varchar(35),
    image varchar(255)
  )`;
const users = `
  CREATE TABLE IF NOT EXISTS users (
    id serial primary key,
    name varchar(80)
  )`;
const favorites = `
  CREATE TABLE IF NOT EXISTS favorites (
    id int,
    favorite int
  )`;
const similars = `
  CREATE TABLE IF NOT EXISTS similars (
    id int,
    similar_id int
  )`;

// includes the foreign key mapping after script has run
// const favorites = `
//   CREATE TABLE IF NOT EXISTS favorites (
//     id int references users(id),
//     favorite int references listings(id)
//   )`;
// const similars = `
//   CREATE TABLE IF NOT EXISTS similars (
//     id int references listings(id),
//     similar_id int references listings(id)
//   )`;
pool.query(dropTables, (err, res) => {
  if (err) {
    console.log('drop tables failed', err);
  } else {
    console.log('tables dropped or no existing tables');
  }
});
pool.query(listings, (err, res) => {
  if (err) {
    console.log('err listings', err);
  } else {
    console.log('create listings table successful');
  }
});
pool.query(users, (err, res) => {
  if (err) {
    console.log('err users', err);
  } else {
    console.log('create users table successful');
  }
});
pool.query(favorites, (err, res) => {
  if (err) {
    console.log('err favorites', err);
  } else {
    console.log('create favorites table successful');
  }
});
pool.query(similars, (err, res) => {
  if (err) {
    console.log('err similars', err);
  } else {
    console.log('create similars table successful');
    pool.end();
  }
});
