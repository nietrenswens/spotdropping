import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from '@spotdropping/api/dto';
import { AuthGuard } from './auth.guard';
import { AuthenticatedRequest } from './types';

@Controller('auth')
export class AuthController {
    public constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    public signIn(@Body() signInDTO: SignInDTO) {
        return this.authService.signIn(signInDTO.email, signInDTO.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    public getProfile(@Request() req: AuthenticatedRequest) {
        return req.user;
    }
}
