import { Test, TestingModule } from '@nestjs/testing';
import { LicenseController } from './license.controller';
import { LicenseService } from './license.service';

describe('LicenseController', () => {
  let controller: LicenseController;
  let service: LicenseService;

  const mockService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicenseController],
      providers: [{ provide: LicenseService, useValue: mockService }],
    }).compile();

    controller = module.get<LicenseController>(LicenseController);
    service = module.get<LicenseService>(LicenseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLicense', () => {
    it('should call service.findAll and return result', async () => {
      const body = { license_number: '1234' };
      const expected = { message: 'Doctor added successfully', condition: true };

      mockService.findAll.mockResolvedValue(expected);

      const result = await controller.getLicense(body);

      expect(result).toEqual(expected);
      expect(service.findAll).toHaveBeenCalledWith(body);
    });
  });
});
