import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { router } from '../routes/router';
import { sendRequest } from './helpers/mockRequest';

describe('client side error handling', () => {
  let mockServer: Server<typeof IncomingMessage, typeof ServerResponse>;
  beforeAll(() => {
    mockServer = createServer(router);
    mockServer.listen(3011, () => console.log('run'));
  });
  afterAll(() => {
    mockServer.close();
  });

  test('should return 404 (not found) when requests to non-existing endpoints', async () => {
    const mockedRequest = {
      host: 'localhost',
      port: 3011,
      path: '/foo/bar',
      method: 'PATCH',
    };

    const response = await sendRequest(mockedRequest);
    expect(response.res.statusCode).toBe(404);
    expect(response.data).toBe('Resource you looking for is not exist');
  });

  test('should return 400 (bad request) when take UUID in invalid format', async () => {
    const mockedRequest = {
      host: 'localhost',
      port: 3011,
      path: '/api/users/s8me-br8ken-uuid',
      method: 'GET',
    };

    const response = await sendRequest(mockedRequest);
    expect(response.res.statusCode).toBe(400);
    expect(response.data).toBe('Please enter a valid uuid');
  });

  test('should return 404 (not found) when UUID is valid but user does not exist', async () => {
    const mockedRequest = {
      host: 'localhost',
      port: 3011,
      path: '/api/users/296e8ac0-8fce-11ef-bd7a-2d4401f1a1fb',
      method: 'DELETE',
    };
    const response = await sendRequest(mockedRequest);
    expect(response.res.statusCode).toBe(404);
    expect(response.data).toBe('User is not found');
  });
});
