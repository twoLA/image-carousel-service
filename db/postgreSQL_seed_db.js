/* eslint-disable */
const fs = require('fs');
const { Pool, Client } = require('pg');
const csv = require('csv-parser');


// ------------------------------------ SEEDING DATABASE -----------------------------------
const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'twoLA-carousel',
  passsword: 'OrangeJuice11!',
});
client.connect();

const queryListings = 'insert into listings (id, price, bedrooms, baths, sq_footage, address, neighborhood, image) values ($1, $2, $3, $4, $5, $6, $7, $8);';
const queryUsers = 'insert into users (id, name) values ($1, $2);';
const queryFavorites = 'insert into favorites (id, favorite) values ($1, $2);';
const querySimilars = 'insert into similars (id, similar_id) values ($1, $2);';

const readListings = fs.createReadStream('seedListings.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    let values = [+row.id, +row.price, +row.bedrooms, +row.baths, +row.sq_footage, row.address, row.neighborhood, row.image];
    client.query(queryListings, values, (err, res) => {
      if (err) {
        console.log('listings error', err);
      } else {
        console.log('listings ok');
      }
    });
  })
  .on('end', () => {
    console.log('listings has processed');
  });

const readUsers = fs.createReadStream('seedUsers.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    let values = [+row.id, row.name];
    client.query(queryUsers, values, (err, res) => {
      if (err) {
        console.log('users error', err);
      } else {
        console.log('users ok');
      }
    });
  })
  .on('end', () => {
    console.log('users has processed');
  });

const readFavorites = fs.createReadStream('seedFavorites.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    let values = [+row.id, +row.favorite];
    client.query(queryFavorites, values, (err, res) => {
      if (err) {
        console.log('favorites error', err);
      } else {
        console.log('favorites ok');
      }
    });
  })
  .on('end', () => {
    console.log('favorites has processed');
  });

const readSimilars = fs.createReadStream('seedSimilars.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    let values = [+row.id, +row.similar_id];
    client.query(querySimilars, values, (err, res) => {
      if (err) {
        console.log('similars error', err);
      } else {
        console.log('similars ok');
      }
    });
  })
  .on('end', () => {
    console.log('simlars has processed');
  });