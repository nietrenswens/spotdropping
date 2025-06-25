import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constants';
import { PrismaService } from '../prisma.service';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtSecret,
            signOptions: { expiresIn: '6h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
    exports: [AuthService],
})
export class AuthModule {}
