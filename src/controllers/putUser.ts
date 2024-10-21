import http from 'http';
import { db, DbModel } from '../model/db';
import {
  write400NoUuid,
  write400WrongBody,
  write404NotFound,
} from '../services/writeClientErrors';
import {
  validateAge,
  validateHobbies,
  validateUsername,
} from '../services/validateRequestBody';
import { isValidUuid } from '../services/validateUuid';

export const putUser = (
  queryId: string | undefined,
  body: DbModel,
  res: http.ServerResponse,
) => {
  if (
    (!validateUsername(body.username) &&
      !validateAge(body.age) &&
      !validateHobbies(body.hobbies)) ||
    body.id
  ) {
    write400WrongBody(res);
  } else if (!queryId || !isValidUuid(queryId)) {
    write400NoUuid(res);
  } else {
    const takenUser = db.find((user) => user.id === queryId);
    if (takenUser) {
      const updatedUser: DbModel = {
        id: takenUser.id,
        username: validateUsername(body.username)
          ? body.username
          : takenUser.username,
        age: validateAge(body.age) ? body.age : takenUser.age,
        hobbies: validateHobbies(body.hobbies)
          ? body.hobbies
          : takenUser.hobbies,
      };
      db[db.indexOf(takenUser)] = updatedUser;
      res.writeHead(200, {
        'Content-type': 'application/json',
        charset: 'utf-8',
      });
      res.end(JSON.stringify(updatedUser));
    } else {
      write404NotFound(res);
    }
  }
};
