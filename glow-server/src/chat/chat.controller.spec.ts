import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

describe('ChatController', () => {
  let controller: ChatController;
  let service: ChatService;

  const mockService = {
    chat: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [{ provide: ChatService, useValue: mockService }],
    }).compile();

    controller = module.get<ChatController>(ChatController);
    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('verify', () => {
    it('should return challenge if token matches', () => {
      process.env.VERIFY_TOKEN = 'token123';
      const result = controller.verify('subscribe', 'token123', 'challenge123');
      expect(result).toBe('challenge123');
    });

    it('should return error if token does not match', () => {
      process.env.VERIFY_TOKEN = 'token123';
      const result = controller.verify('subscribe', 'wrongToken', 'challenge123');
      expect(result).toBe('Error: tokens do not match');
    });
  });

  describe('receive', () => {
    it('should call chat service and return response', async () => {
      const body = { data: 'test' };
      mockService.chat.mockResolvedValue('EVENT_RECEIVED');

      const result = await controller.receive(body);

      expect(result).toEqual({ response: 'EVENT_RECEIVED' });
      expect(service.chat).toHaveBeenCalledWith(body);
    });

    it('should return error if chat service throws', async () => {
      const body = { data: 'test' };
      mockService.chat.mockImplementation(() => {
        throw new Error('Chat service failed');
      });

      const result = await controller.receive(body);

      expect(result).toEqual({ message: 'Error', Error: 'Chat service failed' });
    });
  });
});
