import { randomUUID } from 'crypto';
import { User } from 'src/users/users.service';

export const buildMockUser = (user?: Partial<User>): User => {
  const id = 'user-' + randomUUID();
  return {
    id,
    email: id + '@email.com',
    dateOfBirth: new Date(Date.now()),
    password: 'password',
    ...user,
  };
};
