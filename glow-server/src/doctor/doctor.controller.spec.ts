import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { JwtService } from '@nestjs/jwt';

describe('DoctorController', () => {
  let controller: DoctorController;
  let service: DoctorService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findOneByUser: jest.fn(),
  };

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        { provide: DoctorService, useValue: mockService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: AuthGuard, useValue: { canActivate: jest.fn(() => true) } },
        { provide: AuthorizationGuard, useValue: { canActivate: jest.fn(() => true) } },
      ],
    }).compile();

    controller = module.get<DoctorController>(DoctorController);
    service = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create and return doctor', async () => {
    const req = { headers: { authorization: 'token' } } as any;
    const dto = { user_id: '1', specialty: 'Dermatology' } as any;
    const result = { message: 'Doctor added successfully', payload: {} };
    mockService.create.mockResolvedValue(result);

    expect(await controller.create(req, dto)).toBe(result);
    expect(service.create).toHaveBeenCalledWith(dto, req);
  });

  it('should call findAll and return all doctors', async () => {
    const result = { message: 'All doctors fetched successfully', payload: [] };
    mockService.findAll.mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call findOne and return a doctor', async () => {
    const result = { message: 'Doctor fetched successfully', payload: {} };
    mockService.findOne.mockResolvedValue(result);

    expect(await controller.findOne('1')).toBe(result);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should call findOneByUser and return a doctor by user id', async () => {
    const body = { id: '1' };
    const result = { message: 'Doctor fetched successfully', payload: {} };
    mockService.findOneByUser.mockResolvedValue(result);

    expect(await controller.findOneByUser(body)).toBe(result);
    expect(service.findOneByUser).toHaveBeenCalledWith(body);
  });
});
