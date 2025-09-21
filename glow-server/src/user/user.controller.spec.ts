import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockService = {
    create: jest.fn(),
    login: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    updateProfilePic: jest.fn(),
    updatePassword: jest.fn(),
    remove: jest.fn(),
  };

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: AuthGuard, useValue: { canActivate: jest.fn(() => true) } },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { email: 'test@test.com', password: '1234' };
    const result = { message: 'User created successfully' };
    mockService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toBe(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should login a user', async () => {
    const dto = { email: 'test@test.com', password: '1234' };
    const result = { message: 'User logged in successfully' };
    mockService.login.mockResolvedValue(result);

    expect(await controller.signIn(dto)).toBe(result);
    expect(service.login).toHaveBeenCalledWith(dto);
  });

  it('should get all users', async () => {
    const result = { message: 'Users fetched successfully', payload: [] };
    mockService.findAll.mockResolvedValue(result);

    expect(await controller.findAll({} as any)).toBe(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get a single user by id', async () => {
    const result = { message: 'User fetched successfully', payload: {} };
    mockService.findOne.mockResolvedValue(result);

    expect(await controller.findOne('1', {} as any)).toBe(result);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a user', async () => {
    const dto = { first_name: 'John' };
    const result = { message: 'User updated successfully' };
    mockService.update.mockResolvedValue(result);

    expect(await controller.update('1', dto)).toBe(result);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should update user profile picture', async () => {
    const dto = { image_url: 'base64string' };
    const result = { message: 'Profile updated successfully' };
    mockService.updateProfilePic.mockResolvedValue(result);

    expect(await controller.updateProfile('1', dto)).toBe(result);
    expect(service.updateProfilePic).toHaveBeenCalledWith('1', dto);
  });

  it('should update user password', async () => {
    const dto = { oldPassword: 'old', newPassword: 'new', confirmPassword: 'new' };
    const result = { message: 'Password updated successfully' };
    mockService.updatePassword.mockResolvedValue(result);

    expect(await controller.updatePassword('1', dto)).toBe(result);
    expect(service.updatePassword).toHaveBeenCalledWith('1', dto);
  });

  it('should delete a user', async () => {
    const result = { message: 'User deleted successfully' };
    mockService.remove.mockResolvedValue(result);

    expect(await controller.remove('1')).toBe(result);
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
