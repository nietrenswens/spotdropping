import { randomUUID } from 'crypto';
import { User } from 'src/users/user.entity';

export const buildMockUser = (user?: Partial<User>): User => {
  const id = 'user-' + randomUUID();
  return {
    id,
    email: id + '@email.com',
    passwordHash: randomUUID(),
    ...user,
  };
};
