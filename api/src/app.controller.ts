import { Controller, Get, Request } from '@nestjs/common';
import { AuthenticatedRequest } from './auth/types';

@Controller()
export class AppController {
  @Get('profile')
  public getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
