import { db, DbModel } from '../model/db';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { router } from '../routes/router';
import { sendRequest } from './helpers/mockRequest';

const mockedUser: DbModel = {
  id: `296e8ac0-8fce-11ef-bd7a-2d4401f1a1fb`,
  username: 'Username',
  age: 1,
  hobbies: ['testing'],
};

describe('get users from api', () => {
  let mockServer: Server<typeof IncomingMessage, typeof ServerResponse>;
  beforeAll(() => {
    mockServer = createServer(router);
    mockServer.listen(3010, () => console.log('run'));
    db.push(mockedUser);
  });
  afterAll(() => {
    mockServer.close();
    db.pop();
  });

  test('should return users from database', async () => {
    const mockedRequest = {
      host: 'localhost',
      port: 3010,
      path: '/api/users',
      method: 'GET',
    };

    const response = await sendRequest(mockedRequest);
    const data = JSON.parse(response.data);
    expect(response.res.statusCode).toBe(200);
    expect(data[1].username).toEqual(mockedUser.username);
    expect(data[1].age).toEqual(mockedUser.age);
    expect(data[1].hobbies).toEqual(mockedUser.hobbies);
  });

  test('should return specific user from database', async () => {
    const mockedRequest = {
      host: 'localhost',
      port: 3010,
      path: '/api/users/296e8ac0-8fce-11ef-bd7a-2d4401f1a1fb',
      method: 'GET',
    };
    const response = await sendRequest(mockedRequest);
    const data = JSON.parse(response.data);
    expect(response.res.statusCode).toBe(200);
    expect(data.username).toEqual(mockedUser.username);
    expect(data.age).toEqual(mockedUser.age);
    expect(data.hobbies).toEqual(mockedUser.hobbies);
  });
});
