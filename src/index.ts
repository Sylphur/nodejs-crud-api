// import fs from 'fs';
// import fsp from 'fs/promises';
// import path from 'path';
import http from 'http';
// import events from 'events';
import 'dotenv/config';

const PORT = process.env.PORT || 3500;

const server = http.createServer((req) => {
  console.log(req.url, req.method);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
