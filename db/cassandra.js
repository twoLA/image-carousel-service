/* eslint-disable */
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'listings',
});

// -------------------------------------------- SCHEMA ----------------------------------------------
// KEYPSPACE and CREATE TABLE must be completed in Cassandra
// CREATE KEYSPACE listings WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 1 };
CREATE TABLE listings (
  id int,
  listing_id int,
  price int,
  bedrooms smallint,
  baths smallint,
  sq_footage int,
  address text,
  neighborhood text,
  image text,
  similar_id int,
  PRIMARY KEY (listing_id)
);
CREATE TABLE favorites (
  id int,
  favorite_id int,
  name text,
  user_id int,
  PRIMARY KEY (favorite_id)
);
CREATE TABLE users (
  id int,
  favorite_id int,
  name text,
  user_id int,
  PRIMARY KEY (user_id)
);

// select similar_id from listings where listing_id = 100;
// INSERT INTO listings (id, listing_id, price, bedrooms, baths, sq_footage, address, neighborhood, image, similar_id) VALUES (597, 101, 1, 2, 3, 10000, '123 main', 'sf', 'image', 50);
// update listings set similar_id = 51 where listing_id = 101;
// delete from listings where listing_id = 101;

// ---------------------------------------- Querying Cassandra ----------------------------------------
// const query1 = 'INSERT INTO listing (id, price, bedrooms, baths, sq_footage, neighborhood) VALUES (?, ?, ?, ?, ?, ?)';
// const values1 = [1, 1000000, 5, 4, 4500, 'Pacific Heights, San Francisco, CA'];

// client.execute(query1, values1, { prepare: true }, (err, res) => {
//   if (err) {
//     console.log('err', err);
//   } else {
//     console.log('queried', res);
//   }
// });

// const query2 = 'SELECT * FROM listing WHERE id = ?';
// const values2 = [1];

// client.execute(query2, values2, { prepare: true }, (err, res) => {
//   if (err) {
//     console.log('err', err);
//   } else {
//     console.log('queried', res.rows[0]);
//   }
// });

// -------------------------------- Seed data into Cassandra -------------------------------------
/* CASSANDRA DOES NOT ACCEPT COPY AS A QUERY EXECUTE THROUGH CASSANDRA DRIVER */
// const queryListingsCopy = `COPY listings (id, listing_id, price, bedrooms, baths, sq_footage, address, neighborhood, image, similar_id) from '/Users/annlinh/Documents/HRSF131/twoLA-image-carousel-service/seedListingsCassandra.csv' with delimiter = ';' and header = true;`;
// const queryFavoritesCopy = `COPY favorites (id, user_id, name, favorite_id) from '/Users/annlinh/Documents/HRSF131/twoLA-image-carousel-service/seedFavoritesCassandra.csv' with delimiter = ';' and header = true;`;

// console.log('start cassandra database seeding', new Date());

// client.execute(queryListingsCopy, [])
//   .then(result => console.log('listings data seeded', result, new Date()))
//   .then(client.execute(queryFavoritesCopy, []))
//   .then(result => console.log('favorites data seeded', result, new Date()))
//   .catch(err => console.log('error', err));