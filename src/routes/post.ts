import http from 'http';
import { takeQueryParams } from '../services/takeQueryParams';
import {
  write400WrongBody,
  write404NonExisting,
  write404NotFound,
} from '../services/writeClientErrors';
import { postUser } from '../controllers/postUser';
import { DbModel } from '../model/db';

export const postUsers = (
  url: string | undefined,
  body: string,
  res: http.ServerResponse,
) => {
  const query = takeQueryParams(url);
  if (!query || !query.searchAll) write404NonExisting(res);
  else {
    try {
      const parsedBody = JSON.parse(body) as DbModel;
      if (!parsedBody) write404NotFound(res);
      else {
        postUser(parsedBody, res);
      }
    } catch {
      write400WrongBody(res);
    }
  }
};
