import http from 'http';
import { takeQueryParams } from '../services/takeQueryParams';
import { write404NonExisting } from '../services/writeClientErrors';
import { getAllUsers } from '../controllers/getAllUsers';
import { getUser } from '../controllers/getUser';
import { write500AnyError } from '../services/writeServerErrors';

export const getUsers = (url: string | undefined, res: http.ServerResponse) => {
  const query = takeQueryParams(url);
  if (!query) write404NonExisting(res);
  else {
    if (query.searchAll) {
      getAllUsers(res);
    } else if (query.query) {
      getUser(query.query, res);
    } else write500AnyError(res);
  }
};
