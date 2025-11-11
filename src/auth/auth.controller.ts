import { Controller, Request, Post, UseGuards, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedRequest } from './types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from 'src/common/auth-decorator';

@Controller('auth')
export class AuthController {
  public constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }
}
