import http from 'http';
import { db } from '../model/db';
import {
  write400NoUuid,
  write404NotFound,
} from '../services/writeClientErrors';
import { isValidUuid } from '../services/validateUuid';

export const getUser = (id: string, res: http.ServerResponse) => {
  const isValid = isValidUuid(id);
  if (!isValid) write400NoUuid(res);
  else {
    const takenUser = db.find((user) => user.id === id);
    if (takenUser) {
      res.writeHead(200, {
        'Content-type': 'application/json',
        charset: 'utf-8',
      });
      res.end(JSON.stringify(takenUser));
    } else {
      write404NotFound(res);
    }
  }
};
