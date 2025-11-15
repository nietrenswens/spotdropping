import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './types';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  public constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'passwordHash'> | undefined> {
    const user = await this.usersService.findOne(email);

    if (user && user.passwordHash === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }

    return undefined;
  }

  public login(user: User) {
    const payload: JwtPayload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
