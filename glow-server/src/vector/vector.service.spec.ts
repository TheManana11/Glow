import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VectorService } from './vector.service';
import { AnalysisChunk } from './entities/vector.entity';

// Mock OpenAI
jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      embeddings: {
        create: jest.fn().mockResolvedValue({
          data: [{ embedding: [0.1, 0.2, 0.3] }]
        })
      }
    }))
  };
});

describe('VectorService', () => {
  let service: VectorService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VectorService,
        {
          provide: getRepositoryToken(AnalysisChunk),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<VectorService>(VectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMostRelevantChunks', () => {
    it('should return empty chunks when no data found', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findMostRelevantChunks('test prompt', 'user123');
      
      expect(result).toEqual({
        prompt: 'test prompt',
        relevantChunks: []
      });
    });

    it('should return most relevant chunks', async () => {
      const mockChunks = [
        {
          id: '1',
          type: 'goal',
          content: 'Test content 1',
          embedding: [0.1, 0.2, 0.3],
          createdAt: new Date('2023-01-01'),
        },
        {
          id: '2',
          type: 'problem',
          content: 'Test content 2',
          embedding: [0.4, 0.5, 0.6],
          createdAt: new Date('2023-01-02'),
        },
      ];

      mockRepository.find.mockResolvedValue(mockChunks);

      const result = await service.findMostRelevantChunks('test prompt', 'user123');
      
      expect(result.prompt).toBe('test prompt');
      expect(result.relevantChunks).toHaveLength(2);
      expect(result.relevantChunks[0]).toHaveProperty('type');
      expect(result.relevantChunks[0]).toHaveProperty('content');
      expect(result.relevantChunks[0]).toHaveProperty('date');
    });
  });
});
