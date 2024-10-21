import http from 'http';
import 'dotenv/config';
import { getWorkers } from './config/workersConfig';
import { roundRobin } from './services/roundRobin';

const PORT = process.env.PORT || 3500;
const workers = getWorkers('localhost', +PORT);

const servers = workers.map((server) => ({
  ...server,
}));
const main = http.createServer((req, res) => {
  roundRobin(servers, req, res);
});
main.listen(PORT, () => console.log('Load balancer is running on port ', PORT));
