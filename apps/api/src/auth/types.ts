import { UserDTO } from '@spotdropping/api/dto';
import { Request } from 'express';
import { SetMetadata } from '@nestjs/common';

export type AuthenticatedRequest = Request & {
    user?: UserDTO;
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
