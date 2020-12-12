/* eslint-disable */
const pool = require('../../db/postgreSQL/postgreSQL.js');

module.exports = {
  getOne: (req, res) => {
    pool.connect((error, client, done) => {
      if (error) { throw error }
      client.query('SELECT * FROM listings WHERE id IN (SELECT similar_id FROM similars WHERE id = $1)', [req.params.id], (err, data) => {
        done()
        if (err) {
          console.log('error at GET query', err)
          res.sendStatus(404)
        } else {
          res.send(data.rows)
        }
      })
    });
  },
  postOne: (req, res) => {
    const param = req.body;
    pool.connect((error, client, done) => {
      if (error) { throw error }
      client.query('INSERT INTO listings (price, bedrooms, baths, sq_footage, address, neighborhood, image) VALUES ($1, $2, $3, $4, $5, $6, $7)', [param.price, param.bedrooms, param.baths, param.sq_footage, param.address, param.neighborhood, param.image], (err, data) => {
        done()
        if (err) {
          console.log('error for create listing', err);
          res.sendStatus(400);
        } else {
          // let randomNumberOfSimilars = Math.floor(Math.random() * 11);
          // for (let i = 0; i < randomNumberOfSimilars; i++) {
          //   const random = Math.floor(Math.random() * 10000000);
          //   pool.query("INSERT INTO similars (id, similar_id) VALUES ((select setval ('listings_id_seq', (select max(id) from listings))), $1)", [random], (error) => {
          //     if (error) {
          //       console.log('error for create similars')
          //       res.sendStatus(400)
          //     }
          //   });
          // }
          res.sendStatus(201);
        }
      });
    })
  },
};
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
