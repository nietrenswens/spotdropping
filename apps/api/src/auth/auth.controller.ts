import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from '@dto';

@Controller('auth')
export class AuthController {
    public constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    public signIn(@Body() signInDTO: SignInDTO) {
        return this.authService.signIn(signInDTO.email, signInDTO.password);
    }
}
