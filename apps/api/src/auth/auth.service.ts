import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from '../prisma.service';
import { UserDTO } from 'src/dto/user/userDTO';

@Injectable()
export class AuthService {
    public constructor(private readonly prisma: PrismaService) { }
    
    public async signIn(email: string, password: string): Promise<UserDTO> {
        const user: User = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        // Here you would typically compare the password with a hashed version
        // For simplicity, we are assuming the password is correct
        if (user.password !== password) {
            throw new UnauthorizedException();
        }

        return user; // Return user data or a token
    }
}
