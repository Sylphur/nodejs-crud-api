# nodejs-crud-api
CRUD API for #RSSchool

Asignment - https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md
  
Installing: 
 - `git clone https://github.com/Sylphur/nodejs-crud-api`
 - `git checkout develop`
 - `npm -i`
 - add `.env` with `PORT=XXXX` at the root directory (not required)
  
Running: 
 - `npm run start:dev` - development mode
 - `npm run start:prod` - production mode (bundle & run)
 - `npm run start:multi` - multi workers mod & load balancer (windows only)
 - `npm run start:balancer` - load balancer, should be used with workers in separate terminals in MacOS/Linux
 - `npm run start:workers` - workers, should be used with balancer in separate terminals in MacOS/Linux
 - `npm run test` - run test files

 Using: 
  - Use something like Postman to make requests to server
    - Probably I will make UI for it, depends on next week's workload
  - `GET api/users` - return all stored users (1 by default)
  - `GET api/users/uuid` - return user by UUID, `400` if incorrect id, `404` if no user
 - `POST api/users` - add new user, required `username(string)`, `age(number, 0-100)`, `hobbies(array<string>)`. `400` if no required fields or trying to pass `id`
  - `PUT api/users/uuid` - update user, pass 1-3 of required fields. `400` if no required fields or trying to pass `id`
  - `DELETE api/users/{userId}` - delete user. `400` if incorrect id, `404` if no user