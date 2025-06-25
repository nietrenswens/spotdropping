import { UserDTO } from '@dto';

export type AuthenticatedRequest = Request & {
    user?: UserDTO;
};
