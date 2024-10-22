import http from 'http';
import 'dotenv/config';
import { getUsers } from './get';
import { postUsers } from './post';
import { putUsers } from './put';
import { deleteUsers } from './delete';
import { write404NonExisting } from '../services/writeClientErrors';
import { write500AnyError } from '../services/writeServerErrors';

export const router = (req: http.IncomingMessage, res: http.ServerResponse) => {
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
};
