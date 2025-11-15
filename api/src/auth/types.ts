import { Request as ExpressRequest } from 'express';
import { User } from 'src/users/user.entity';

export interface AuthenticatedRequest extends ExpressRequest {
  user: User;
}

export type JwtPayload = {
  sub: string;
  email: string;
};
