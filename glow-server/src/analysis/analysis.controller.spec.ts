import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('AnalysisController', () => {
  let controller: AnalysisController;
  let service: AnalysisService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllByUser: jest.fn(),
    findByUser: jest.fn(),
    findOne: jest.fn(),
  };

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalysisController],
      providers: [
        { provide: AnalysisService, useValue: mockService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: AuthGuard, useValue: { canActivate: jest.fn(() => true) } },
      ],
    }).compile();

    controller = module.get<AnalysisController>(AnalysisController);
    service = module.get<AnalysisService>(AnalysisService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create', async () => {
    const req = { headers: { authorization: 'token' } } as any;
    const dto = { image_url: 'image' } as any;
    const result = { message: 'Analysis done successfully' };
    mockService.create.mockResolvedValue(result);

    expect(await controller.create(req, dto)).toBe(result);
    expect(service.create).toHaveBeenCalledWith(req, dto);
  });

  it('should call findAll', async () => {
    const result = { message: 'All analysis fetched successfully', payload: [] };
    mockService.findAll.mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call findAllByUser', async () => {
    const req = { headers: { authorization: 'token' } } as any;
    const result = { message: 'All Analysis for user fetched successfully', payload: [] };
    mockService.findAllByUser.mockResolvedValue(result);

    expect(await controller.findAllByUser(req)).toBe(result);
    expect(service.findAllByUser).toHaveBeenCalledWith(req);
  });

  it('should call findByUser', async () => {
    const req = { headers: { authorization: 'token' } } as any;
    const result = { message: 'Analysis for user fetched successfully', payload: {} };
    mockService.findByUser.mockResolvedValue(result);

    expect(await controller.findByUser(req)).toBe(result);
    expect(service.findByUser).toHaveBeenCalledWith(req);
  });

  it('should call findOne', async () => {
    const result = { message: 'Analysis fetched successfully', payload: {} };
    mockService.findOne.mockResolvedValue(result);

    expect(await controller.findOne('1')).toBe(result);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });
});
