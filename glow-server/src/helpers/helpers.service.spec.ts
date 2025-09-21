import { Test, TestingModule } from '@nestjs/testing';
import { HelpersService } from './helpers.service';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import OpenAI from 'openai';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  promises: {
    writeFile: jest.fn(),
  },
}));
jest.mock('axios');
jest.mock('openai');

describe('HelpersService', () => {
  let service: HelpersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpersService],
    }).compile();

    service = module.get<HelpersService>(HelpersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('base64ToImage', () => {
    const mockDir = '/uploads/profiles';
    const validBase64 =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';

    it('should return null for invalid base64 string', async () => {
      const result = await service.base64ToImage('invalid_base64', 'profiles');
      expect(result).toBeNull();
    });

    it('should return null for unsupported mime type', async () => {
      const badBase64 =
        'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';
      const result = await service.base64ToImage(badBase64, 'profiles');
      expect(result).toBeNull();
    });

    it('should save file and return filename for valid base64', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      (fs.mkdirSync as jest.Mock).mockReturnValue(undefined);
      (fs.promises.writeFile as jest.Mock).mockResolvedValue(undefined);

      const result = await service.base64ToImage(validBase64, 'profiles');
      expect(result).toMatch(/profile_\d+\.png/);
      expect(fs.promises.writeFile).toHaveBeenCalled();
    });
  });

  describe('call_model', () => {
    const mockOpenAI = {
      responses: {
        create: jest.fn().mockResolvedValue({ output_text: 'AI Result' }),
      },
    };

    beforeEach(() => {
      (OpenAI as jest.Mock).mockImplementation(() => mockOpenAI);
    });

    it('should return AI result', async () => {
      const prompt = {
        relevantChunks: [{ type: 'info', content: 'Skin care tips' }],
        prompt: 'What should I do for dry skin?',
      };

      const result = await service.call_model(prompt);
      expect(result).toBe('AI Result');
      expect(mockOpenAI.responses.create).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException on failure', async () => {
      mockOpenAI.responses.create.mockRejectedValueOnce(new Error('AI error'));
      const prompt = {
        relevantChunks: [],
        prompt: 'Test',
      };

      await expect(service.call_model(prompt)).rejects.toThrow(
        'Server Error! Please try again later',
      );
    });
  });

  describe('call_openAI', () => {
    const mockOpenAI = {
      responses: {
        create: jest.fn().mockResolvedValue({ output_text: '{"json":"result"}' }),
      },
    };

    beforeEach(() => {
      (OpenAI as jest.Mock).mockImplementation(() => mockOpenAI);
    });

    it('should return AI JSON response', async () => {
      const result = await service.call_openAI('https://image-url.com/image.png');
      expect(result).toBe('{"json":"result"}');
      expect(mockOpenAI.responses.create).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException on failure', async () => {
      mockOpenAI.responses.create.mockRejectedValueOnce(new Error('AI error'));
      await expect(service.call_openAI('bad-url')).rejects.toThrow(
        'Server Error! Please try again later',
      );
    });
  });

  describe('webhookMessage', () => {
    it('should send message to whatsapp', async () => {
      (axios.post as jest.Mock).mockResolvedValue({ data: 'ok' });

      process.env.PHONE_NUMBER_ID = '123';
      process.env.TOKEN = 'test-token';

      await service.webhookMessage('user123', 'Hello');
      expect(axios.post).toHaveBeenCalledWith(
        'https://graph.facebook.com/v17.0/123/messages',
        {
          messaging_product: 'whatsapp',
          to: 'user123',
          text: { body: 'Hello' },
        },
        {
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json',
          },
        },
      );
    });

    it('should replace empty text with fallback', async () => {
      (axios.post as jest.Mock).mockResolvedValue({ data: 'ok' });

      process.env.PHONE_NUMBER_ID = '123';
      process.env.TOKEN = 'test-token';

      await service.webhookMessage('user123', '');
      expect(axios.post).toHaveBeenCalledWith(
        'https://graph.facebook.com/v17.0/123/messages',
        {
          messaging_product: 'whatsapp',
          to: 'user123',
          text: { body: 'No response from AI' },
        },
        expect.any(Object),
      );
    });
  });
});
