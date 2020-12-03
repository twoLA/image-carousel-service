const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const app = express();
const port = 8030;
const mongoose = require('mongoose');
const listingRouter = require('./routers/listing.js');

mongoose.connect('mongodb://localhost:/similarhomes');

const publicDir = path.join(__dirname, '../client/dist');

app.use(bodyParser.json());

app.use('/carousel/listing/:id', express.static(publicDir));

// get all similar listings when given a specific id
app.get('*/:id/similars', listingRouter.getOne);
app.post('*/:id/similars', listingRouter.postOne);
app.delete('*/:id/similars', listingRouter.deleteOne);
app.put('*/:id/similars', listingRouter.update);

app.listen(8030, () => {
  console.log(`listening on http://localhost:${port}`);
});
