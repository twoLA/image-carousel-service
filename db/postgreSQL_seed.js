const path = require('path');
const fs = require('fs');
const { Pool, Client } = require('pg');

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'twoLA-carousel',
  passsword: 'OrangeJuice11!',
});
client.connect();

const prices = ['6000000', '7000000', '8000000', '9000000', '10000000'];
const size_bd = [3, 4, 5, 6, 7];
const size_ba = [2, 3, 4, 5, 6];
const size_sqft = [3500, 4000, 4500, 5000, 5500];
const address = ['Presidio Ter', 'Sea Cliff Ave', 'Glenbrook Ave', 'Marina Blvd', 'Scott St', 'Filbert St'];
const neighborhood = ['Pacific Heights, San Francisco, CA', 'Bernal Heights, San Francisco, CA', 'Noe Valley, San Francisco, CA', 'Castro, San Francisco, CA', 'Seacliff, San Francisco, CA', 'Clarendon Heights, San Francisco, CA'];

const populateCsv = (listings) => {
  // initialize empty array to add to csv
  const test = '2;1000000;5;4;4500;Presidio Ter;Pacific Heights, San Francisco, CA;https://loremflickr.com/320/240/home';
  // create the random data
  // write to csv
  fs.writeFile('seeding.csv', test, 'utf8', (err) => {
    if (err) {
      console.log('write failed');
    } else {
      console.log('write success');
    }
  });
  // push csv to database
};

const seedDb = async () => {
  const query = 'insert into listings (id, price, bedrooms, baths, sq_footage, address, neighborhood, image) values ($1, $2, $3, $4, $5, $6, $7, $8);';
  await fs.readFile('seeding.csv', 'utf8', (err, data) => {
    if (err) {
      console.log('read error', err);
    } else {
      const values = data.split(';');
      values[0] = Number(values[0]);
      values[1] = Number(values[1]);
      values[2] = Number(values[2]);
      values[3] = Number(values[3]);
      values[4] = Number(values[4]);
      console.log(values);
      client.query(query, values, (error, res) => {
        if (err) {
          console.log('query error', error);
        } else {
          console.log('query ok', res);
        }
      });
    }
  });
};

populateCsv();
seedDb();
