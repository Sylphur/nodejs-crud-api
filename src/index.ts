import http from 'http';
import 'dotenv/config';
import { getUsers } from './routes/get';
import { postUsers } from './routes/post';

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  switch (req.method) {
    case 'GET': {
      getUsers(req.url, res);
      break;
    }
    case 'POST': {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        postUsers(req.url, body, res);
      });
    }
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
