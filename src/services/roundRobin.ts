import http from 'http';
import { workersType } from './calculateWorkers';

let curr = 0;
export const roundRobin = (
  servers: Array<workersType>,
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const target = servers[curr];
  console.log(
    `PORT ${target?.port} Target: ${req.method} http://${target?.host}:${target?.port}${req.url}`,
  );

  curr = (curr + 1) % servers.length;
  res.writeHead(302, {
    location: `http://${target?.host}:${target?.port}${req.url}`,
  });
  res.end();
};
