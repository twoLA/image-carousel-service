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
  http.get('http://localhost:8030/carousel/listing/9000000/similars');
  sleep(1);
}

