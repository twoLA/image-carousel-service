/* eslint-disable */
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'carousel',
});

// -------------------------------------------- SCHEMA ----------------------------------------------
// KEYPSPACE and CREATE TABLE must be completed in Cassandra
// CREATE KEYSPACE listing WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 1 };
// CREATE TABLE listing (
//   id int,
//   price int,
//   bedrooms smallint,
//   baths smallint,
//   sq_footage int,
//   address text,
//   neighborhood text,
//   image text,
//   similars set<int>,
//   PRIMARY KEY (id, price, bedrooms, baths, sq_footage, neighborhood)
// );
// CREATE TABLE users (
//   id int,
//   favorites set<int>
//   PRIMARY KEY (id)
// );

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
