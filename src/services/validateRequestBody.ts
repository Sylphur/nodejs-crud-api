export const validateAge = (age?: number) => {
  if (!age) return false;
  else return Number.isInteger(age) && age > 0;
};
export const validateUsername = (username?: string) => {
  if (!username) return false;
  else return username.split('').length < 20;
};
export const validateHobbies = (hobbies?: Array<string>) => {
  if (!hobbies) return false;
  else return Array.isArray(hobbies);
};
