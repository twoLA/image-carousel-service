/* eslint-disable no-console */
const { Pool, Client } = require('pg');

// const pool = new Pool({
//   user: 'root',
//   host: 'localhost',
//   database: 'twoLA-carousel',
//   password: 'OrangeJuice11',
// });

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'twoLA-carousel',
  passsword: 'OrangeJuice11!',
});
client.connect();

const listing = `
  CREATE TABLE listing (
    id int primary key,
    price int,
    bedrooms smallint,
    baths smallint,
    sq_footage int,
    address varchar(95),
    neighborhood varchar(35),
    image varchar(255),
    favorite bool
  );
`;
const similars = `
  CREATE TABLE similars (
    id int references listing(id),
    similar1 int,
    similar2 int,
    similar3 int,
    similar4 int,
    similar5 int,
    similar6 int,
    similar7 int,
    similar8 int,
    similar9 int
  );
`;

client.query(listing, (err, res) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('create listing table successful');
  }
});
client.query(similars, (err, res) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('create similars table successful');
    client.end();
  }
});
