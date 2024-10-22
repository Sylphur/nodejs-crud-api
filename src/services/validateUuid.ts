import { validate } from 'uuid';

export const isValidUuid = (id: string): boolean => {
  return validate(id);
};
