import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { VectorService } from 'src/vector/vector.service';
import { UserService } from 'src/user/user.service';

describe('ChatService', () => {
  let service: ChatService;

  const mockHelpersService = {
    call_model: jest.fn(),
    webhookMessage: jest.fn(),
  };

  const mockVectorService = {
    findMostRelevantChunks: jest.fn(),
  };

  const mockUserService = {
    findOneByNumber: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: HelpersService, useValue: mockHelpersService },
        { provide: VectorService, useValue: mockVectorService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null if messageObj is missing', async () => {
    const body = { entry: [{ changes: [{ value: {} }] }] };
    const result = await service.chat(body);
    expect(result).toBeNull();
  });

  it('should return null if messageText is missing', async () => {
    const body = {
      entry: [{ changes: [{ value: { messages: [{ from: '123' }] } }] }],
    };
    const result = await service.chat(body);
    expect(result).toBeNull();
  });

  it('should process message and return EVENT_RECEIVED', async () => {
    const body = {
      entry: [
        {
          changes: [
            {
              value: {
                messages: [{ from: '123', text: { body: 'Hello' } }],
              },
            },
          ],
        },
      ],
    };

    mockUserService.findOneByNumber.mockResolvedValue({ payload: { id: 'user-id' } });
    mockVectorService.findMostRelevantChunks.mockResolvedValue('final_prompt');
    mockHelpersService.call_model.mockResolvedValue('AI Response');

    const result = await service.chat(body);

    expect(result).toBe('EVENT_RECEIVED');
    expect(mockUserService.findOneByNumber).toHaveBeenCalledWith('+123');
    expect(mockVectorService.findMostRelevantChunks).toHaveBeenCalledWith('Hello', 'user-id');
    expect(mockHelpersService.call_model).toHaveBeenCalledWith('final_prompt');
    expect(mockHelpersService.webhookMessage).toHaveBeenCalledWith('123', 'AI Response');
  });
});
