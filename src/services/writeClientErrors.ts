import http from 'http';

export const write400NoUuid = (res: http.ServerResponse) => {
  res.writeHead(400);
  res.end('Please enter a valid uuid');
};
export const write404NonExisting = (res: http.ServerResponse) => {
  res.writeHead(404);
  res.end('Resource you looking for is not exist');
};
export const write404NotFound = (res: http.ServerResponse) => {
  res.writeHead(404);
  res.end('User is not found');
};
