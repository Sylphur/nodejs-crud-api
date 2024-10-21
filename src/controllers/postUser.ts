import http from 'http';
import { v1 } from 'uuid';
import { db, DbModel } from '../model/db';
import { write400WrongBody } from '../services/writeClientErrors';
import {
  validateAge,
  validateHobbies,
  validateUsername,
} from '../services/validateRequestBody';

export const postUser = (body: DbModel, res: http.ServerResponse) => {
  if (
    !validateUsername(body.username) ||
    !validateAge(body.age) ||
    !validateHobbies(body.hobbies) ||
    body.id
  ) {
    write400WrongBody(res);
  } else {
    const filteredBody: DbModel = {
      id: v1(),
      username: body.username,
      age: body.age,
      hobbies: body.hobbies,
    };
    db.push(filteredBody);
    res.writeHead(201, {
      'Content-type': 'application/json',
      charset: 'utf-8',
    });
    res.end(JSON.stringify(filteredBody));
  }
};
