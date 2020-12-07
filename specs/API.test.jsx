const request = require('request');
const { Pool, Client } = require('pg');

xdescribe('get request to get details of similar listings', () => {
  it('sends an array of similar listings which contain at least one image', (callback) => {
    request('http://localhost:8030/listings/11/listing', (err, res, body) => {
      if (err) {
        callback(err);
      } else {
        expect(body).toContain('image');
        callback();
      }
    });
  });
});

describe('benchmark queries in postgresql', () => {
  beforeEach(()=> {
    const client = new Client({
      user: 'root',
      host: 'localhost',
      database: 'twoLA-carousel',
      passsword: 'OrangeJuice11!',
    });
    client.connect();
  });
  it('should query the selected listing for GET listing\'s similars under 50ms', (callback) => {
    const query = 'SELECT similar_id FROM similars WHERE id = 9000000';
    const values = [];
    client.query(query, values, (err, res) => {
      if (err) {
        console.log('GET query unsuccessful', err);
      } else {
        console.log('query hit, still need timer here');
      }
    });
  });
});