/* eslint-disable */
const fs = require('fs');
// const path = require('path');
// const { Pool, Client } = require('pg');

// ------------------------------------ SEEDING DATABASE -----------------------------------
// const client = new Client({
//   user: 'root',
//   host: 'localhost',
//   database: 'twoLA-carousel',
//   passsword: 'OrangeJuice11!',
// });
// client.connect();

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

var numOfListings = 10;
var numOfUsers = 10;

const writeListings = fs.createWriteStream('seedListings.csv');
writeListings.write('id;price;bedrooms;baths;sq_footage;address;neighborhood\n', 'utf8');
const generateRandomListingData = (writer, encoding, callback) => {
  let id = 0;
  let i = numOfListings;
  function write() {
    let ok = true;
    do {
      i--;
      id++;
      const listPrice = `${prices[Math.floor(Math.random() * 5)]}`;
      const listBedrooms = `${bedrooms[Math.floor(Math.random() * 5)]}`;
      const listBaths = `${baths[Math.floor(Math.random() * 5)]}`;
      const listSq_footage = `${sq_footage[Math.floor(Math.random() * 5)]}`;
      const listAddress = `${address[Math.floor(Math.random() * 5)]}`;
      const listNeighborhood = `${neighborhood[Math.floor(Math.random() * 5)]}`;
      const data = `${id};${listPrice};${listBedrooms};${listBaths};${listSq_footage};${listAddress};${listNeighborhood}\n`
      if (i === 0) {
        writer.write(data, encoding, callback)
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};
generateRandomListingData(writeListings, 'utf8', (err) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('listing data generated');
    writeListings.end();
  }
});

const writeUsers = fs.createWriteStream('seedUsers.csv');
writeUsers.write('id;name\n', 'utf8');
const generateRandomUserData = (writer, encoding, callback) => {
  let id = 0;
  let i = numOfUsers;
  function write() {
    let ok = true;
    do {
      i--;
      id++;
      const userName = `${names[Math.floor(Math.random() * 10)]}`
      const data = `${id};${userName}\n`
      if (i === 0) {
        writer.write(data, encoding, callback)
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};
generateRandomUserData(writeUsers, 'utf8', (err) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('user data generated');
    writeUsers.end();
  }
});

const writeFavorites = fs.createWriteStream('seedFavorites.csv');
writeFavorites.write('id;favorite\n', 'utf8');
const generateRandomFavoriteData = (writer, encoding, callback) => {
  let id = 0;
  let i = numOfUsers;
  function write() {
    let ok = true;
    do {
      i--;
      id++;
      let data = '';
      let randomAmountFavorites = Math.ceil(Math.random() * 3);
      for (let j = 0; j < randomAmountFavorites; j++) {
        let randomListing = Math.ceil(Math.random() * numOfListings);
        data += `${id};${randomListing}\n`;
      }
      if (i === 0) {
        writer.write(data, encoding, callback)
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};
generateRandomFavoriteData(writeFavorites, 'utf8', (err) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('favorite data generated');
    writeFavorites.end();
  }
});

// const generateRandomFavoritesData = (numOfListings, numOfUsers) => {
//   let randomFavoritesString = '';
//   for (let i = 1; i <= numOfUsers; i++) {
//     let randomAmountFavorites = Math.ceil(Math.random() * 3);
//     for (let j = 0; j < randomAmountFavorites; j++) {
//       let randomListing = Math.ceil(Math.random() * numOfListings);
//       (i === numOfUsers && j === randomAmountFavorites - 1) ? randomFavoritesString += `${i};${randomListing}` : randomFavoritesString += `${i};${randomListing};`;
//     }
//   }
//   return randomFavoritesString;
// };

// const generateRandomSimilarsData = (numOfListings) => {
//   let randomSimilarsString = '';
//   for (let i = 1; i <= numOfListings; i++) {
//     let randomAmountListings = Math.ceil(Math.random() * 5);
//     for (let j = 0; j < randomAmountListings; j++) {
//       let randomListing = Math.ceil(Math.random() * numOfListings);
//       (i === numOfListings && j === randomAmountListings - 1) ? randomSimilarsString += `${i};${randomListing}` : randomSimilarsString += `${i};${randomListing};`;
//     }
//   }
//   return randomSimilarsString;
// }

//   const favoritesCsvData = generateRandomFavoritesData(numOfListings, numOfUsers);
//   const similarsCsvData = generateRandomSimilarsData(numOfListings);
//   // createCsv('seedFavorites.csv', favoritesCsvData);
//   // createCsv('seedSimilars.csv', similarsCsvData);
// };
