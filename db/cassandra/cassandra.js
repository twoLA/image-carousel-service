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
CREATE TABLE similars (
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
  PRIMARY KEY ((listing_id), similar_id)
);
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
  PRIMARY KEY ((favorite_id), id)
);
CREATE TABLE users (
  id int,
  favorite_id int,
  name text,
  user_id int,
  PRIMARY KEY ((user_id), id)
);

// SELECT similar_id from similars where listing_id = 9999999;
  // output = ?????
// SELECT listing_id from listings where listing_id = output;
// INSERT INTO listings (listing_id, price, bedrooms, baths, sq_footage, address, neighborhood, image) VALUES (10000001, 1, 2, 3, 10000, '123 main', 'sf', 'image');
// UPDATE listings set price = 9999999, bedrooms = 9, baths = 9, sq_footage = 9999, address = '99 main', neighborhood = 'sf hood', image = 'image?' where listing_id = 10000001;
// DELETE from listings where listing_id = 10000001;

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

// const query2 = 'SELECT similar_id FROM listings WHERE listing_id = ?';
// const values2 = [900000];

// client.execute(query2, values2, { prepare: true }, (err, res) => {
//   if (err) {
//     console.log('err', err);
//   } else {
//     console.log('queried', res.rows[0]);
//   }
// });

// -------------------------------- Seed data into Cassandra -------------------------------------
/* CASSANDRA DOES NOT ACCEPT COPY AS A QUERY EXECUTE THROUGH CASSANDRA DRIVER */
// const querySimilarsCopy = `COPY similars (id, listing_id, price, bedrooms, baths, sq_footage, address, neighborhood, image, similar_id) from '/Users/annlinh/Documents/HRSF131/twoLA-image-carousel-service/seedListingsCassandra.csv' with delimiter = ';' and header = true AND maxattempts=10 AND MINBATCHSIZE=1 AND MAXBATCHSIZE=8 AND PAGESIZE=10 and skipcols = 'price, bedrooms, baths, sq_footage, address, neighborhood, image';`;
// const queryListingsCopy = `COPY listings (id, listing_id, price, bedrooms, baths, sq_footage, address, neighborhood, image, similar_id) from '/Users/annlinh/Documents/HRSF131/twoLA-image-carousel-service/seedListingsCassandra.csv' with delimiter = ';' and header = true AND maxattempts=10 AND MINBATCHSIZE=1 AND MAXBATCHSIZE=8 AND PAGESIZE=10 and skipcols = 'similar_id';`;
// const queryFavoritesCopy = `COPY favorites (id, user_id, name, favorite_id) from '/Users/annlinh/Documents/HRSF131/twoLA-image-carousel-service/seedFavoritesCassandra.csv' with delimiter = ';' and header = true AND maxattempts=10 AND MINBATCHSIZE=1 AND MAXBATCHSIZE=8 AND PAGESIZE=10 and skipcols = 'name';`;
// const queryUsersCopy = `COPY users (id, user_id, name, favorite_id) from '/Users/annlinh/Documents/HRSF131/twoLA-image-carousel-service/seedFavoritesCassandra.csv' with delimiter = ';' and header = true AND maxattempts=10 AND MINBATCHSIZE=1 AND MAXBATCHSIZE=8 AND PAGESIZE=10;`;

// BULK LOAD USING dsbulk
// similars - $ bin/dsbulk load -url /Users/annlinh/Documents/HRSF131/twoLA-image-carousel-service/seedListingsCassandra.csv -delim ';' -k listings -t listings -m '* = -price, -bedrooms, -baths, -sq_footage, -address, -neighborhood, -image';
// listings - $ bin/dsbulk load -url /Users/annlinh/Documents/HRSF131/twoLA-image-carousel-service/seedListingsCassandra.csv -delim ';' -k listings -t listings -m '* = -similar_id';
// favorites - $ bin/dsbulk load -url /Users/annlinh/Documents/HRSF131/twoLA-image-carousel-service/seedFavoritesCassandra.csv -delim ';' -k listings -t favorites -m '* = -name';
// users - $ bin/dsbulk load -url /Users/annlinh/Documents/HRSF131/twoLA-image-carousel-service/seedFavoritesCassandra.csv -delim ';' -k listings -t users;

// console.log('start cassandra database seeding', new Date());

// client.execute(queryListingsCopy, [])
//   .then(result => console.log('listings data seeded', result, new Date()))
//   .then(client.execute(queryFavoritesCopy, []))
//   .then(result => console.log('favorites data seeded', result, new Date()))
//   .catch(err => console.log('error', err));