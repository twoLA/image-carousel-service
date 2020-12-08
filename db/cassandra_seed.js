/* eslint-disable */
const fs = require('fs');
const faker = require('faker');

// ------------------------------------- CSV GENERATION -------------------------------------
const prices = [6000000, 7000000, 8000000, 9000000, 10000000];
const bedrooms = [3, 4, 5, 6, 7];
const baths = [2, 3, 4, 5, 6];
const sq_footage = [3500, 4000, 4500, 5000, 5500];
const address = ['Presidio Ter', 'Sea Cliff Ave', 'Glenbrook Ave', 'Marina Blvd', 'Scott St', 'Filbert St'];
const neighborhood = ['Pacific Heights, San Francisco, CA', 'Bernal Heights, San Francisco, CA', 'Noe Valley, San Francisco, CA', 'Castro, San Francisco, CA', 'Seacliff, San Francisco, CA', 'Clarendon Heights, San Francisco, CA'];

var numOfListings = 10000000;
var numOfUsers = 10000000;

const writeListings = fs.createWriteStream('seedListingsCassandra.csv');
writeListings.write('id;listing_id;price;bedrooms;baths;sq_footage;address;neighborhood;image;similar_id\n', 'utf8');
const generateRandomListingsData = (writer, encoding, callback) => {
  var id = 0;
  var uuid = 0;
  let i = numOfListings;
  function write() {
    let ok = true;
    do {
      i--;
      id++;
      data = '';
      const listPrice = `${prices[Math.floor(Math.random() * 5)]}`;
      const listBedrooms = `${bedrooms[Math.floor(Math.random() * 5)]}`;
      const listBaths = `${baths[Math.floor(Math.random() * 5)]}`;
      const listSq_footage = `${sq_footage[Math.floor(Math.random() * 5)]}`;
      const listAddress = `${address[Math.floor(Math.random() * 5)]}`;
      const listNeighborhood = `${neighborhood[Math.floor(Math.random() * 5)]}`;
      const listImage = 'https://loremflickr.com/320/240/home';
      let randomAmountListings = Math.ceil(Math.random() * 11);
      for (let j = 0; j < randomAmountListings; j++) {
        uuid++;
        var randomListing = Math.ceil(Math.random() * numOfListings);
        data += `${uuid};${id};${listPrice};${listBedrooms};${listBaths};${listSq_footage};${listAddress};${listNeighborhood};${listImage};${randomListing}\n`;
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
generateRandomListingsData(writeListings, 'utf8', (err) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('listings data generated');
    writeListings.end();
  }
});

const writeFavorites = fs.createWriteStream('seedFavoritesCassandra.csv');
writeFavorites.write('id;user_id;name;favorite_id\n', 'utf8');
const generateRandomFavoritesData = (writer, encoding, callback) => {
  let id = 0;
  let uuid = 0;
  let i = numOfUsers;
  function write() {
    let ok = true;
    do {
      i--;
      id++;
      let data = '';
      const userName = faker.name.findName();
      let randomAmountFavorites = Math.ceil(Math.random() * 3);
      for (let j = 0; j < randomAmountFavorites; j++) {
        uuid++;
        let randomListing = Math.ceil(Math.random() * numOfListings);
        data += `${uuid};${id};${userName};${randomListing}\n`;
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
generateRandomFavoritesData(writeFavorites, 'utf8', (err) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('favorites data generated');
    writeFavorites.end();
  }
});