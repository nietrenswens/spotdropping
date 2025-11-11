import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticatedRequest } from './types';
import { buildMockUser } from 'src/testing/builders';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  describe('login', () => {
    it('returns token when login is successful', () => {
      const accessToken = 'iamatoken';
      const user = buildMockUser();

      authService.login.mockReturnValue({ accessToken });

      const req = { user } as unknown as AuthenticatedRequest;

      expect(controller.login(req)).toStrictEqual({ accessToken });
    });
  });
});
