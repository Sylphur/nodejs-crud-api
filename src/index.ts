import http from 'http';
import 'dotenv/config';
import { getUsers } from './routes/get';
import { postUsers } from './routes/post';
import { putUsers } from './routes/put';
import { deleteUsers } from './routes/delete';
import { write404NonExisting } from './services/writeClientErrors';
import { write500AnyError } from './services/writeServerErrors';

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    switch (req.method) {
      case 'GET': {
        getUsers(req.url, res);
        break;
      }
      case 'POST': {
        req.on('end', () => {
          postUsers(req.url, body, res);
        });
        break;
      }
      case 'PUT': {
        req.on('end', () => {
          putUsers(req.url, body, res);
        });
        break;
      }
      case 'DELETE': {
        deleteUsers(req.url, res);
        break;
      }
      default: {
        write404NonExisting(res);
      }
    }
  } catch (error) {
    console.error(error);
    write500AnyError(res);
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
