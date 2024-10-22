import http from 'http';

export const write500AnyError = (res: http.ServerResponse) => {
  res.writeHead(500);
  res.end('An internal server error occurred');
};
