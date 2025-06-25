import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserDTO } from '@dto';
import { User } from 'generated/prisma';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    public async signIn(
        email: string,
        password: string,
    ): Promise<{ token: string }> {
        const user: User | null = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        // TODO: Use hashing
        if (user.password !== password) {
            throw new UnauthorizedException();
        }

        const payload: UserDTO = user as UserDTO;

        return {
            token: await this.jwtService.signAsync(payload),
        };
    }
}
