const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'carousel',
});

// KEYPSPACE and CREATE TABLE must be completed in Cassandra
// eslint-disable-next-line max-len
// CREATE KEYSPACE listing WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 1 };

// CREATE TABLE listing (
//   id int primary key,
//   price int,
//   bedrooms int,
//   baths int,
//   sq_footage int,
//   address text,
//   neighborhood text,
//   image text,
//   favorite boolean,
//   similars set<int>
// );

// const query1 = 'INSERT INTO listing (id, price, similars) VALUES (?, ?, ?)';
// const values1 = [2, 1000000, [1, 2]];

// client.execute(query1, values1, { prepare: true }, (err, res) => {
//   if (err) {
//     console.log('err', err);
//   } else {
//     console.log('queried', res);
//   }
// });

const query2 = 'SELECT * FROM listing WHERE id = ?';
const values2 = [2];

client.execute(query2, values2, { prepare: true }, (err, res) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('queried', res.rows[0].similars);
  }
});
