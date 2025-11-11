import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    dateOfBirth: new Date('10-10-2020'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  describe('validateUser', () => {
    it('should return user without password if credentials are valid', async () => {
      usersService.findOne.mockResolvedValue(mockUser);

      const result = await authService.validateUser(
        'test@example.com',
        'password123',
      );

      expect(usersService.findOne).toHaveBeenCalledWith('test@example.com');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...mockExpected } = mockUser;
      expect(result).toEqual(mockExpected);
    });

    it('should return undefined if user not found', async () => {
      usersService.findOne.mockResolvedValue(undefined);

      const result = await authService.validateUser(
        'unknown@example.com',
        'password123',
      );

      expect(result).toBeUndefined();
    });

    it('should return undefined if password is incorrect', async () => {
      usersService.findOne.mockResolvedValue(mockUser);

      const result = await authService.validateUser(
        'test@example.com',
        'wrongpassword',
      );

      expect(result).toBeUndefined();
    });
  });

  describe('login', () => {
    it('should return an access token', () => {
      const token = 'mock.jwt.token';
      jwtService.sign.mockReturnValue(token);

      const result = authService.login(mockUser);

      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email,
        sub: mockUser.id,
      });
      expect(result).toEqual({ accessToken: token });
    });
  });
});
