import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisService } from './analysis.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analysis } from './entities/analysis.entity';
import { User } from '../user/entities/user.entity';
import { TokenService } from './token.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { ErrorService } from 'src/helpers/errors.service';
import { SchedulerService } from 'src/scheduler/scheduler.service';
import { VectorService } from 'src/vector/vector.service';
import { UserService } from 'src/user/user.service';

describe('AnalysisService', () => {
  let service: AnalysisService;
  let analysisRepo: Repository<Analysis>;
  let userRepo: Repository<User>;

  const mockAnalysisRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn(),
  };

  const mockUserRepo = {
    findOneBy: jest.fn(),
  };

  const mockTokenService = { getUserIdFromToken: jest.fn() };
  const mockHelperService = {
    base64ToImage: jest.fn(),
    call_openAI: jest.fn(),
  };
  const mockErrorService = {
    BadRequest: jest.fn(),
    NotFound: jest.fn(),
    InternalServerError: jest.fn(),
  };
  const mockCacheManager = {
    clear: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
  };
  const mockSchedulerService = { resumeDailyReminders: jest.fn() };
  const mockVectorService = { saveAnalysisChunks: jest.fn() };
  const mockUserService = { findOne: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalysisService,
        { provide: getRepositoryToken(Analysis), useValue: mockAnalysisRepo },
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
        { provide: 'CACHE_MANAGER', useValue: mockCacheManager },
        { provide: TokenService, useValue: mockTokenService },
        { provide: HelpersService, useValue: mockHelperService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: SchedulerService, useValue: mockSchedulerService },
        { provide: VectorService, useValue: mockVectorService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<AnalysisService>(AnalysisService);
    analysisRepo = module.get<Repository<Analysis>>(getRepositoryToken(Analysis));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an analysis', async () => {
    const req = { headers: { authorization: 'token' } } as any;
    const dto = { image_url: 'base64-image' } as any;
    mockHelperService.base64ToImage.mockResolvedValue('file.png');
    mockTokenService.getUserIdFromToken.mockReturnValue('user-id');
    mockHelperService.call_openAI.mockResolvedValue(
      JSON.stringify({
        problems: [],
        goals: [],
        skin_care_routine: [],
        scores: [],
        estimated_days_progress: 7,
      }),
    );
    mockAnalysisRepo.create.mockReturnValue({ id: 'analysis-id' });
    mockAnalysisRepo.save.mockResolvedValue({ id: 'analysis-id' });
    mockUserService.findOne.mockResolvedValue({ payload: { phone_number: '123456' } });

    const result = await service.create(req, dto);

    expect(result).toHaveProperty('message', 'Analysis done successfully');
    expect(mockAnalysisRepo.create).toHaveBeenCalled();
    expect(mockAnalysisRepo.save).toHaveBeenCalled();
    expect(mockCacheManager.clear).toHaveBeenCalled();
    expect(mockVectorService.saveAnalysisChunks).toHaveBeenCalled();
    expect(mockSchedulerService.resumeDailyReminders).toHaveBeenCalled();
  });

  it('should return all analysis (empty)', async () => {
    mockAnalysisRepo.find.mockResolvedValue([]);
    const result = await service.findAll();
    expect(result).toEqual({ message: 'No analysis found', payload: [] });
  });

  it('should return all analysis (with data)', async () => {
    const mockData = [{ id: '1' }];
    mockAnalysisRepo.find.mockResolvedValue(mockData);
    const result = await service.findAll();
    expect(result).toEqual({ message: 'All analysis fetched successfully', payload: mockData });
  });

  it('should return all analysis by user from cache', async () => {
    const req = { headers: { authorization: 'token' } } as any;
    mockTokenService.getUserIdFromToken.mockReturnValue('user-id');
    mockUserRepo.findOneBy.mockResolvedValue({ id: 'user-id', first_name: 'John' });
    mockCacheManager.get.mockResolvedValue([{ id: 'cached-analysis' }]);

    const result = await service.findAllByUser(req);
    expect(result.payload).toEqual([{ id: 'cached-analysis' }]);
  });

  it('should return all analysis by user from DB if cache miss', async () => {
    const req = { headers: { authorization: 'token' } } as any;
    mockTokenService.getUserIdFromToken.mockReturnValue('user-id');
    mockUserRepo.findOneBy.mockResolvedValue({ id: 'user-id', first_name: 'John' });
    mockCacheManager.get.mockResolvedValue(null);
    mockAnalysisRepo.find.mockResolvedValue([{ id: 'analysis-id' }]);

    const result = await service.findAllByUser(req);
    expect(result.payload).toEqual([{ id: 'analysis-id' }]);
    expect(mockCacheManager.set).toHaveBeenCalled();
  });

  it('should return one analysis by id', async () => {
    mockAnalysisRepo.findOneBy.mockResolvedValue({ id: 'analysis-id' });
    const result = await service.findOne('analysis-id');
    expect(result.payload).toEqual({ id: 'analysis-id' });
  });

  it('should return latest analysis by user', async () => {
    const req = { headers: { authorization: 'token' } } as any;
    mockTokenService.getUserIdFromToken.mockReturnValue('user-id');
    mockUserRepo.findOneBy.mockResolvedValue({ id: 'user-id', first_name: 'John' });
    mockAnalysisRepo.findOne.mockResolvedValue({ id: 'latest-analysis' });

    const result = await service.findByUser(req);
    expect(result.payload).toEqual({ id: 'latest-analysis' });
  });
});
