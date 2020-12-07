/* eslint-disable */
const fs = require('fs');
const { Pool, Client } = require('pg');
const csv = require('csv-parser');
const path = require('path');


// ------------------------------------ SEEDING DATABASE -----------------------------------
const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'twoLA-carousel',
  passsword: 'OrangeJuice11!',
});
client.connect();

// const queryListings = 'insert into listings (id, price, bedrooms, baths, sq_footage, address, neighborhood, image) values ($1, $2, $3, $4, $5, $6, $7, $8);';
// const queryUsers = 'insert into users (id, name) values ($1, $2);';
// const queryFavorites = 'insert into favorites (id, favorite) values ($1, $2);';
// const querySimilars = 'insert into similars (id, similar_id) values ($1, $2);';

const queryListingsCopy = `\COPY listings FROM '${__dirname}/../seedListings.csv' DELIMITER ';' CSV HEADER;`;
const queryUsersCopy = `\COPY users FROM '${__dirname}/../seedUsers.csv' DELIMITER ';' CSV HEADER;`;
const queryFavoritesCopy = `\COPY favorites FROM '${__dirname}/../seedFavorites.csv' DELIMITER ';' CSV HEADER;`;
const querySimilarsCopy = `\COPY similars FROM '${__dirname}/../seedSimilars.csv' DELIMITER ';' CSV HEADER;`;
const queryFavoritesAddForeignKeyUserId = 'ALTER TABLE favorites ADD FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE;';
const queryFavoritesAddForeignKeyListingId = 'ALTER TABLE favorites ADD FOREIGN KEY (favorite) REFERENCES listings(id);';
const querySimilarAddForeignKeyListingId = 'ALTER TABLE similars ADD FOREIGN KEY (id) REFERENCES listings(id) ON DELETE CASCADE;';
const querySimilarAddForeignKeySimilarLisitingId = 'ALTER TABLE similars ADD FOREIGN KEY (similar_id) REFERENCES listings(id);';
const querySimilarAddIdIndex = 'CREATE INDEX ON similars (id);';
const queryFavoritesAddIdIndex = 'CREATE INDEX ON favorites (id);';
const queryListingsSyncValue = "SELECT SETVAL ('listings_id_seq', (SELECT MAX(id) FROM listings));";
const queryUsersSyncValue = "SELECT SETVAL ('users_id_seq', (SELECT MAX(id) FROM users));";

console.log('seed database start', new Date());
client.query(queryListingsCopy, (err, res) => {
  if (err) {
    console.log('listings error', err);
  } else {
    console.log('listings ok', new Date());
    client.query(queryUsersCopy, (err, res) => {
      if (err) {
        console.log('users error', err);
      } else
      console.log('users ok', new Date());
      client.query(queryFavoritesCopy, (err, res) => {
        if (err) {
          console.log('favorites error', err);
        } else {
          console.log('favorites ok', new Date());
          client.query(queryFavoritesAddForeignKeyUserId, (err, res) => {
            if (err) {
              console.log('favorites add foreign key for id error', err);
            } else {
              console.log('favorites add foreign key for id updated', new Date());
              client.query(queryFavoritesAddForeignKeyListingId, (err, res) => {
                if (err) {
                  console.log('favorites add foreign key for favorite error', err);
                } else {
                  console.log('favorites add foreign key for favorite updated', new Date());
                  client.query(querySimilarsCopy, (err, res) => {
                    if (err) {
                      console.log('similars error', err);
                    } else {
                      console.log('similars ok', new Date());
                      client.query(querySimilarAddForeignKeyListingId, (err, res) => {
                        if (err) {
                          console.log('similar add foreign key for id error', err);
                        } else {
                          console.log('similar add foreign key for id updated', new Date());
                          client.query(querySimilarAddForeignKeySimilarLisitingId, (err, res) => {
                            if (err) {
                              console.log('similar add foreign key for similar_id error', err);
                            } else {
                              console.log('similar add foreign key for similar_id updated', new Date());
                              client.query(querySimilarAddIdIndex, (err, res) => {
                                if (err) {
                                  console.log('similar add index to id error', err);
                                } else {
                                  console.log('similar add index to id updated', new Date());
                                  client.query(queryFavoritesAddIdIndex, (err, res) => {
                                    if (err) {
                                      console.log('favorites add index to id error', err);
                                    } else {
                                      console.log('favorites add index to id updated', new Date());
                                      client.query(queryListingsSyncValue, (err, res) => {
                                        if (err) {
                                          console.log('listings sync max id error', err);
                                        } else {
                                          console.log('listings sync max id updated', new Date());
                                          client.query(queryUsersSyncValue, (err, res) => {
                                            if (err) {
                                              console.log('users sync max id error', err);
                                            } else {
                                              console.log('users sync max id updated', new Date());
                                              console.log('seeded database successful', new Date());
                                              client.end();
                                            }
                                          })
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    })
  }
});

// const readListings = fs.createReadStream('seedListings.csv')
//   .pipe(csv({ separator: ';' }))
//   .on('data', (row) => {
//     let values = [+row.id, +row.price, +row.bedrooms, +row.baths, +row.sq_footage, row.address, row.neighborhood, row.image];
//     client.query(queryListings, values, (err, res) => {
//       if (err) {
//         console.log('listings error', err);
//       } else {
//         console.log('listings ok');
//       }
//     });
//   })
//   .on('end', () => {
//     console.log('listings has processed');

//   });

// const readUsers = fs.createReadStream('seedUsers.csv')
//   .pipe(csv({ separator: ';' }))
//   .on('data', (row) => {
//     let values = [+row.id, row.name];
//     client.query(queryUsers, values, (err, res) => {
//       if (err) {
//         console.log('users error', err);
//       } else {
//         console.log('users ok');
//       }
//     });
//   })
//   .on('end', () => {
//     console.log('users has processed');
//     const readFavorites = fs.createReadStream('seedFavorites.csv')
//       .pipe(csv({ separator: ';' }))
//       .on('data', (row) => {
//         let values = [+row.id, +row.favorite];
//         client.query(queryFavorites, values, (err, res) => {
//           if (err) {
//             console.log('favorites error', err);
//           } else {
//             console.log('favorites ok');
//           }
//         });
//       })
//       .on('end', () => {
//         console.log('favorites has processed');
//         const readSimilars = fs.createReadStream('seedSimilars.csv')
//           .pipe(csv({ separator: ';' }))
//           .on('data', (row) => {
//             let values = [+row.id, +row.similar_id];
//             client.query(querySimilars, values, (err, res) => {
//               if (err) {
//                 console.log('similars error', err);
//               } else {
//                 console.log('similars ok');
//               }
//             });
//           })
//           .on('end', () => {
//             console.log('simlars has processed');
//           });
//       });
//   });

