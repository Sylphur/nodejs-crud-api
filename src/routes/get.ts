import http from 'http';
import { db } from '../model/db';
import { getQuery } from '../services/getQuery';
import { write404 } from '../services/write404';

export const getUsers = (url: string | undefined, res: http.ServerResponse) => {
  const query = getQuery(url);
  if (!query) write404(res);
  else {
    if (query.searchAll) {
      res.writeHead(200);
      res.end(JSON.stringify(db));
    } else if (query.query) {
      const user = db.find((user) => user.id === query.query);
      if (!user) write404(res);
      else {
        res.writeHead(200);
        res.end(JSON.stringify(user));
      }
    }
  }
};
