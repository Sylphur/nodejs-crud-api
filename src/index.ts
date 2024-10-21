// import fs from 'fs';
// import fsp from 'fs/promises';
// import path from 'path';
import http from 'http';
// import events from 'events';
import 'dotenv/config';
import { getUsers } from './routes/get';
import { postUsers } from './routes/post';
// import { db } from './model/db';

const PORT = process.env.PORT || 3500;
// const getUsers = (res: http.ServerResponse) => {
//   res.writeHead(200);
//   res.end(JSON.stringify(db));
// };

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
