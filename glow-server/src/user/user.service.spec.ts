import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { HelpersService } from 'src/helpers/helpers.service';
import { ErrorService } from 'src/helpers/errors.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

jest.mock('bcrypt');
jest.mock('axios');

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('jwt-token'),
  };

  const mockHelpersService = {
    base64ToImage: jest.fn(),
  };

  const mockErrorService = {
    BadRequest: jest.fn(),
    Unauthorized: jest.fn(),
    NotFound: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
        { provide: HelpersService, useValue: mockHelpersService },
        { provide: ErrorService, useValue: mockErrorService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const dto = { email: 'test@test.com', password: '1234', role: 'user', first_name: 'John' };
      mockUserRepository.findOneBy.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockUserRepository.create.mockReturnValue(dto);
      mockUserRepository.save.mockResolvedValue({ id: '1', ...dto });

      const result = await service.create(dto);

      expect(result.message).toBe('User created successfully');
      expect(mockUserRepository.create).toHaveBeenCalled();
      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(mockJwtService.signAsync).toHaveBeenCalled();
    });

    it('should call webhook if role is doctor', async () => {
      const dto = { email: 'doc@test.com', password: '1234', role: 'doctor', first_name: 'Doc' };
      mockUserRepository.findOneBy.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockUserRepository.create.mockReturnValue(dto);
      mockUserRepository.save.mockResolvedValue({ id: '1', ...dto });
      (axios.post as jest.Mock).mockResolvedValue({ data: 'ok' });

      const result = await service.create(dto);

      expect(result.message).toBe('User created successfully');
      expect(axios.post).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const dto = { email: 'test@test.com', password: '1234' };
      const mockUser = { id: '1', email: dto.email, password: 'hashedPassword', first_name: 'John', role: 'user' };

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login(dto);

      expect(result.message).toBe('User logged in successfully');
      expect(mockJwtService.signAsync).toHaveBeenCalled();
    });

    it('should throw error if user not found', async () => {
      const dto = { email: 'notfound@test.com', password: '1234' };
      mockUserRepository.findOne.mockResolvedValue(null);

      await service.login(dto);
      expect(mockErrorService.Unauthorized).toHaveBeenCalledWith('User not found', true);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ id: '1', email: 'test@test.com' }];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.findAll({} as any);

      expect(result.payload).toEqual(users);
      expect(mockErrorService.NotFound).toHaveBeenCalledWith('No Users found in the database', false);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: '1', email: 'test@test.com' };
      mockUserRepository.findOneBy.mockResolvedValue(user);

      const result = await service.findOne('1');

      expect(result.payload).toEqual(user);
      expect(mockErrorService.NotFound).toHaveBeenCalledWith('Failed to get user with is 1', false);
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      const dto = { first_name: 'John' };
      const updatedUser = { id: '1', first_name: 'John' };
      mockUserRepository.findOneBy.mockResolvedValue(updatedUser);

      const result = await service.update('1', dto);

      expect(result.payload).toEqual(updatedUser);
      expect(mockUserRepository.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('updateProfilePic', () => {
    it('should update user profile picture', async () => {
      mockHelpersService.base64ToImage.mockResolvedValue('image.png');
      const updatedUser = { id: '1', image_url: 'uploads/profiles/image.png' };
      mockUserRepository.findOneBy.mockResolvedValue(updatedUser);

      const result = await service.updateProfilePic('1', { image_url: 'base64string' });

      expect(result.payload).toEqual(updatedUser);
      expect(mockUserRepository.update).toHaveBeenCalledWith('1', { image_url: 'uploads/profiles/image.png' });
    });
  });

  describe('updatePassword', () => {
    it('should update password successfully', async () => {
      const user = { id: '1', password: 'oldHashed' };
      mockUserRepository.findOneBy.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('newHashed');

      const result = await service.updatePassword('1', {
        oldPassword: 'old',
        newPassword: 'new',
        confirmPassword: 'new',
      });

      expect(result.message).toBe('Password updated successfully');
      expect(mockUserRepository.update).toHaveBeenCalledWith('1', { password: 'newHashed' });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const deletedUser = { affected: 1 };
      mockUserRepository.delete.mockResolvedValue(deletedUser);

      const result = await service.remove('1');

      expect(result.payload).toEqual(deletedUser);
      expect(mockUserRepository.delete).toHaveBeenCalledWith({ id: '1' });
    });
  });

  describe('findOneByNumber', () => {
    it('should return user by phone number', async () => {
      const user = { id: '1', phone_number: '+123456' };
      mockUserRepository.findOneBy.mockResolvedValue(user);

      const result = await service.findOneByNumber('+123456');

      expect(result.payload).toEqual(user);
      expect(mockErrorService.NotFound).toHaveBeenCalledWith(
        'Failed to get user with is phone number +123456',
        false,
      );
    });
  });
});
