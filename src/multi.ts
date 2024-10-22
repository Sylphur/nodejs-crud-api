import http from 'http';
import 'dotenv/config';
import { getWorkers } from './config/workersConfig';
import { router } from './routes/router';

const PORT = process.env.PORT || 3500;
const workers = getWorkers('localhost', +PORT);

const createServer = (host: string, port: number) => {
  http.createServer(router).listen(port, host, () => {
    console.log(`Server running at http//${host}:${port}`);
  });
};

workers.forEach((worker) => createServer(worker.host, worker.port));
