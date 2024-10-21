interface DbModel {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const db: DbModel[] = [];
