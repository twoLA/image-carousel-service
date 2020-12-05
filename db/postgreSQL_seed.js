/* eslint-disable */
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

// ------------------------------------ SEEDING DATABASE -----------------------------------
// const seedDb = async (csvFile) => {
//   const query = 'insert into listings (id, price, bedrooms, baths, sq_footage, address, neighborhood, image) values ($1, $2, $3, $4, $5, $6, $7, $8);';
//   await fs.readFile('seeding.csv', 'utf8', (err, data) => {
//     if (err) {
//       console.log('read error', err);
//     } else {
//       const values = data.split(';');
//       for (let i = 0; i < values.length; i += 1) {
//         if (values[i] % 0 === 0) { values[i] = +(values[i]); }
//         if (values[i] % 1 === 0) { values[i] = +(values[i]); }
//         if (values[i] % 2 === 0) { values[i] = +(values[i]); }
//         if (values[i] % 3 === 0) { values[i] = +(values[i]); }
//         if (values[i] % 4 === 0) { values[i] = +(values[i]); }
//       }
//       console.log(values);
//       client.query(query, values, (error, res) => {
//         if (err) {
//           console.log('query error', error);
//         } else {
//           console.log('query ok', res);
//         }
//       });
//     }
//   });
// };

// ------------------------------------- CSV GENERATION -------------------------------------
const prices = [6000000, 7000000, 8000000, 9000000, 10000000];
const bedrooms = [3, 4, 5, 6, 7];
const baths = [2, 3, 4, 5, 6];
const sq_footage = [3500, 4000, 4500, 5000, 5500];
const address = ['Presidio Ter', 'Sea Cliff Ave', 'Glenbrook Ave', 'Marina Blvd', 'Scott St', 'Filbert St'];
const neighborhood = ['Pacific Heights, San Francisco, CA', 'Bernal Heights, San Francisco, CA', 'Noe Valley, San Francisco, CA', 'Castro, San Francisco, CA', 'Seacliff, San Francisco, CA', 'Clarendon Heights, San Francisco, CA'];
const names = ['Keira Gothard', 'Charita Kinlaw', 'Talia Beutler', 'Eulah Winbush', 'Clyde Najera', 'Maura Goodwin', 'Kathe Westray', 'Louie Bubb', 'Ghislaine Teston', 'Maribel Carwell'];

const generateRandomListingData = (numOfListings) => {
  let randomListingDataString = '';
  let id = 0;
  while (id < numOfListings) {
    randomListingDataString += `${id += 1};`;
    randomListingDataString += `${prices[Math.floor(Math.random() * 5)]};`;
    randomListingDataString += `${bedrooms[Math.floor(Math.random() * 5)]};`;
    randomListingDataString += `${baths[Math.floor(Math.random() * 5)]};`;
    randomListingDataString += `${sq_footage[Math.floor(Math.random() * 5)]};`;
    randomListingDataString += `${address[Math.floor(Math.random() * 5)]};`;
    randomListingDataString += `${neighborhood[Math.floor(Math.random() * 5)]};`;
    (id === numOfListings) ? randomListingDataString += 'https://loremflickr.com/320/240/home' : randomListingDataString += 'https://loremflickr.com/320/240/home;';
  }
  return randomListingDataString;
};
const generateRandomUserData = (numOfUsers) => {
  let randomUserDataString = '';
  let id = 0;
  while (id < numOfUsers) {
    randomUserDataString += `${id += 1};`;
    (id === numOfUsers) ? randomUserDataString += `${names[Math.floor(Math.random() * 10)]}` : randomUserDataString += `${names[Math.floor(Math.random() * 10)]};`;
  }
  return randomUserDataString;
};
const generateRandomFavoritesData = (numOfListings, numOfUsers) => {
  let randomFavoritesString = '';
  for (let i = 1; i <= numOfUsers; i++) {
    let randomAmountFavorites = Math.ceil(Math.random() * 3);
    for (let j = 0; j < randomAmountFavorites; j++) {
      let randomListing = Math.ceil(Math.random() * numOfListings);
      (i === numOfUsers && j === randomAmountFavorites - 1) ? randomFavoritesString += `${i};${randomListing}` : randomFavoritesString += `${i};${randomListing};`;
    }
  }
  return randomFavoritesString;
};
const generateRandomSimilarsData = (numOfListings) => {
  let randomSimilarsString = '';
  for (let i = 1; i <= numOfListings; i++) {
    let randomAmountListings = Math.ceil(Math.random() * 5);
    for (let j = 0; j < randomAmountListings; j++) {
      let randomListing = Math.ceil(Math.random() * numOfListings);
      (i === numOfListings && j === randomAmountListings - 1) ? randomSimilarsString += `${i};${randomListing}` : randomSimilarsString += `${i};${randomListing};`;
    }
  }
  return randomSimilarsString;
}

const createCsv = (csvName, csvData) => {
  fs.writeFile(csvName, csvData, 'utf8', (err) => {
    if (err) {
      console.log('write failed');
    }
    // seedDb();
    console.log('write success');
  });
};

const populateCsvs = (numOfListings, numOfUsers) => {
  const listingsCsvData = generateRandomListingData(numOfListings);
  const usersCsvData = generateRandomUserData(numOfUsers);
  const favoritesCsvData = generateRandomFavoritesData(numOfListings, numOfUsers);
  const similarsCsvData = generateRandomSimilarsData(numOfListings);
  createCsv('seedListings.csv', listingsCsvData);
  createCsv('seedUsers.csv', usersCsvData);
  createCsv('seedFavorites.csv', favoritesCsvData);
  createCsv('seedSimilars.csv', similarsCsvData);
};

populateCsvs(10, 10);