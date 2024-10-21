import http from 'http';
import { takeQueryParams } from '../services/takeQueryParams';
import { write404NonExisting } from '../services/writeClientErrors';
import { deleteUser } from '../controllers/deleteUser';
import { write500AnyError } from '../services/writeServerErrors';

export const deleteUsers = (
  url: string | undefined,
  res: http.ServerResponse,
) => {
  const query = takeQueryParams(url);
  if (!query || query.searchAll) {
    write404NonExisting(res);
  } else if (query.query) {
    deleteUser(query.query, res);
  } else write500AnyError(res);
};
