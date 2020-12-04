const fs = require('fs');

const prices = ['6000000', '7000000', '8000000', '9000000', '10000000'];
const size_bd = [3, 4, 5, 6, 7];
const size_ba = [2, 3, 4, 5, 6];
const size_sqft = [3500, 4000, 4500, 5000, 5500];
const address = ['Presidio Ter', 'Sea Cliff Ave', 'Glenbrook Ave', 'Marina Blvd', 'Scott St', 'Filbert St'];
const neighborhood = ['Pacific Heights, San Francisco, CA', 'Bernal Heights, San Francisco, CA', 'Noe Valley, San Francisco, CA', 'Castro, San Francisco, CA', 'Seacliff, San Francisco, CA', 'Clarendon Heights, San Francisco, CA'];

const seedDatabase = (listings) => {
  // initialize empty array to add to csv
  const test = [1, 2];
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

seedDatabase(1);
