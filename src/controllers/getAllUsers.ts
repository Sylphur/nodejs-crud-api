import http from 'http';
import { db } from '../model/db';

export const getAllUsers = (res: http.ServerResponse) => {
  const takenUsers = JSON.stringify(db);
  res.writeHead(200, { 'Content-type': 'application/json', charset: 'utf-8' });
  res.end(takenUsers);
  return takenUsers;
};
