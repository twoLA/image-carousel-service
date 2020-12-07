/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const db = require('../../db/index.js');

// Get request for all the similar homes associated with a listing
module.exports = {
  getOne: (req, res) => {
    const request = req.params.id;
    console.log('request', request);
    db.Listing.find({ id: request }, (err, data) => {
      if (err) {
        console.log('Error getting data');
        res.sendStatus(404);
      } else if (data.length === 0) {
        res.sendStatus(404);
      } else {
        // console.log(data[0]._doc.similar) - gets only arr of similar listings
        res.json(data[0]._doc.similar);
      }
    });
  },
  postOne: (req, res) => {
    const postId = req.params.id;
    const postSimilars = req.body.similar;
    console.log('id', postId, 'similar', postSimilars);
    db.Listing.create({ id: postId, similar: postSimilars }, (err) => {
      if (err) {
        console.log('Error posting data');
        res.sendStatus(400);
      } else {
        res.sendStatus(201);
      }
    });
  },
  deleteOne: (req, res) => {
    const deleteId = req.params.id;
    console.log('id', deleteId);
    db.Listing.deleteOne({ id: deleteId }, (err) => {
      if (err) {
        console.log('Error deleting data');
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    });
  },
  update: async (req, res) => {
    const updateId = req.params.id;
    const updateSimilars = req.body.similar;
    console.log('id', updateId, 'similar', updateSimilars);
    await db.Listing.update({ id: updateId }, { similar: updateSimilars }, (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.sendStatus(201);
      }
    });
  },
};

// const express = require('express');
// const router = express.Router();

// router.route('/api/listings')
//   .get((req, res) => {
//     db.findAll((err, data) => {
//       if (err) {
//         res.sendStatus(404);
//       } else {
//         res.json(data);
//         res.end();
//       }
//     });
//   });

// module.exports = router;