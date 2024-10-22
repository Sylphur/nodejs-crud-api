interface queryParamInterface {
  searchAll: boolean;
  query?: string;
}

export function takeQueryParams(
  query: string | undefined,
): queryParamInterface | undefined {
  if (!query) return undefined;
  if (query == '/api/users' || query == '/api/users/')
    return { searchAll: true, query: '' };
  else if (query.startsWith('/api/users/'))
    return { searchAll: false, query: query.split('/api/users/')[1] };
  else return undefined;
}
