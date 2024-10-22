import { v1 } from 'uuid';

export interface DbModel {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const db: DbModel[] = [
  {
    id: `${v1()}`,
    username: 'Jeka',
    age: 22,
    hobbies: ['programming'],
  },
];
