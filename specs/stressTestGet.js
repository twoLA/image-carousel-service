/* eslint-disable */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '30s', target: 300 },
    { duration: '30s', target: 600 },
    { duration: '30s', target: 1000 },
    { duration: '30s', target: 100 },
  ],
};

export default function stressTest() {
  http.get('http://54.183.243.60:8030/carousel/listing/10000000');
  sleep(1);
}

