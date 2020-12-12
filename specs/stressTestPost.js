/* eslint-disable */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '60s', target: 100 },
    { duration: '60s', target: 300 },
    { duration: '60s', target: 600 },
    { duration: '60s', target: 1000 },
    { duration: '60s', target: 100 },
  ],
};
export default function stressTest() {
  var url = 'http://localhost:8030/carousel/listing';
  var payload = JSON.stringify({
    "price": 10000000,
    "bedrooms": 3,
    "baths": 5,
    "sq_footage": 4000,
    "address": "Glenbrook Ave",
    "neighborhood": "Noe Valley, San Francisco, CA",
    "image": "https://loremflickr.com/320/240/home"
  });
  var params = {
    headers : {
      'Content-Type': 'application/json',
    }
  }
  http.post(url, payload, params);
  sleep(1);
}

// export default function stressTest() {
//   http.get('http://localhost:8030/carousel/listing/9000000/similars');
//   sleep(1);
// }

