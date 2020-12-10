/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const db = require('../../db/postgreSQL/postgreSQL.js');

// Get request for all the similar homes associated with a listing
module.exports = {
  getOne: (req, res) => {
    const query = {
      text: 'SELECT * FROM listings WHERE id IN (SELECT similar_id FROM similars WHERE id = $1)',
      values: [req.params.id],
    };
    db.query(query, (err, data) => {
      if (err) {
        console.log('error for GET request', err);
        res.sendStatus(404);
      } else {
        console.log('success for GET request');
        res.json(data.rows);
      }
    });
  },
  postOne: (req, res) => {
    const param = req.body;
    const queryInsertListing = {
      text: 'INSERT INTO listings (price, bedrooms, baths, sq_footage, address, neighborhood, image) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [param.price, param.bedrooms, param.baths,
        param.sq_footage, param.address, param.neighborhood, param.image],
    };
    db.query(queryInsertListing, (err, data) => {
      if (err) {
        console.log('error for create listing', err);
        res.sendStatus(400);
      } else {
        console.log('success for create listing');
        for (let i = 0; i < 11; i++) {
          const random = Math.floor(Math.random() * 10000000);
          const randomInsertSimilars = {
            text: "INSERT INTO similars (id, similar_id) VALUES ((select setval ('listings_id_seq', (select max(id) from listings))), $1)",
            values: [random],
          };
          db.query(randomInsertSimilars, (error) => {
            if (error) {
              console.log('error for create similars');
              res.sendStatus(400);
            } else {
              console.log('success for create similars');
            }
          });
        }
        res.sendStatus(201);
      }
    });
  },
};
//   postOne: (req, res) => {
//     const postId = req.params.id;
//     const postSimilars = req.body.similar;
//     console.log('id', postId, 'similar', postSimilars);
//     db.Listing.create({ id: postId, similar: postSimilars }, (err) => {
//       if (err) {
//         console.log('Error posting data');
//         res.sendStatus(400);
//       } else {
//         res.sendStatus(201);
//       }
//     });
//   },
//   deleteOne: (req, res) => {
//     const deleteId = req.params.id;
//     console.log('id', deleteId);
//     db.Listing.deleteOne({ id: deleteId }, (err) => {
//       if (err) {
//         console.log('Error deleting data');
//         res.sendStatus(404);
//       } else {
//         res.sendStatus(204);
//       }
//     });
//   },
//   update: async (req, res) => {
//     const updateId = req.params.id;
//     const updateSimilars = req.body.similar;
//     console.log('id', updateId, 'similar', updateSimilars);
//     await db.Listing.update({ id: updateId }, { similar: updateSimilars }, (err) => {
//       if (err) {
//         console.log(err);
//         res.sendStatus(400);
//       } else {
//         res.sendStatus(201);
//       }
//     });
//   },
// };
