import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthenticatedRequest } from './auth/types';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('profile', () => {
    it('returns the user', () => {
      // Arrange
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
      };

      const mockRequest = {
        user: mockUser,
      } as unknown as AuthenticatedRequest;

      // Act
      const result = appController.getProfile(mockRequest);

      // Assert
      expect(result).toEqual(mockUser);
    });
  });
});
