import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  email: string;
  password: string;
  dateOfBirth: Date;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 'user1',
      email: 'user1@email.com',
      password: 'password',
      dateOfBirth: new Date('10-25-2025'),
    },
    {
      id: 'user2',
      email: 'user2@email.com',
      password: 'password',
      dateOfBirth: new Date('11-14-2025'),
    },
  ];

  public findOne(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    return Promise.resolve(user);
  }
}
