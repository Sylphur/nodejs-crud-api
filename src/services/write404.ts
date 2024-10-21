import http from 'http';

export const write404 = (res: http.ServerResponse) => {
  res.writeHead(404, 'Resource is not found');
  res.end();
};
