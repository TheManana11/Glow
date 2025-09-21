import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from './doctor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { HelpersService } from 'src/helpers/helpers.service';
import { ErrorService } from 'src/helpers/errors.service';
import { TokenService } from 'src/analysis/token.service';

describe('DoctorService', () => {
  let service: DoctorService;
  let doctorRepository: Repository<Doctor>;

  const mockDoctorRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn(),
  };

  const mockHelperService = {};
  const mockErrorService = {
    NotFound: jest.fn(),
    InternalServerError: jest.fn(),
  };
  const mockTokenService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        { provide: getRepositoryToken(Doctor), useValue: mockDoctorRepository },
        { provide: HelpersService, useValue: mockHelperService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: TokenService, useValue: mockTokenService },
      ],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
    doctorRepository = module.get<Repository<Doctor>>(getRepositoryToken(Doctor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a doctor successfully', async () => {
      const dto = {
        user_id: '1',
        specialty: 'Dermatology',
        years_experience: 5,
        availability: { monday: '9-5' },
        price_per_session: 100,
        location: 'City Clinic',
        medical_license_number: '12345',
      };
      const req = { headers: { authorization: 'token' } } as any;
      const mockDoctor = { id: '1', ...dto };

      mockDoctorRepository.create.mockReturnValue(mockDoctor);
      mockDoctorRepository.save.mockResolvedValue(mockDoctor);

      const result = await service.create(dto, req);

      expect(result).toEqual({ message: 'Doctor added successfully', payload: mockDoctor });
      expect(mockDoctorRepository.create).toHaveBeenCalledWith({
        specialty: dto.specialty,
        user: { id: dto.user_id },
        years_experience: dto.years_experience,
        availability: dto.availability,
        price_per_session: dto.price_per_session,
        location: dto.location,
        medical_license_number: dto.medical_license_number,
        verified: true,
      });
      expect(mockDoctorRepository.save).toHaveBeenCalledWith(mockDoctor);
    });

    it('should handle errors when saving doctor', async () => {
      const dto = {
        user_id: '1',
        specialty: 'Dermatology',
        years_experience: 5,
        availability: { monday: '9-5' },
        price_per_session: 100,
        location: 'City Clinic',
        medical_license_number: '12345',
      };
      const req = {} as any;
      mockDoctorRepository.create.mockReturnValue(dto);
      mockDoctorRepository.save.mockRejectedValue(new Error('DB Error'));

      await service.create(dto, req);

      expect(mockErrorService.InternalServerError).toHaveBeenCalledWith(
        'Server error, please try again later',
        expect.any(Error),
      );
    });
  });

  describe('findAll', () => {
    it('should return all doctors successfully', async () => {
      const doctors = [{ id: '1', specialty: 'Dermatology' }];
      mockDoctorRepository.find.mockResolvedValue(doctors);

      const result = await service.findAll();

      expect(result).toEqual({
        message: 'All doctors fetched successfully',
        payload: doctors,
      });
      expect(mockErrorService.NotFound).toHaveBeenCalledWith(
        'No doctors in the app right now',
        false,
      );
    });
  });

  describe('findOne', () => {
    it('should return a doctor by id', async () => {
      const doctor = { id: '1', specialty: 'Dermatology' };
      mockDoctorRepository.findOneBy.mockResolvedValue(doctor);

      const result = await service.findOne('1');

      expect(result).toEqual({
        message: 'Doctor fetched successfully',
        payload: doctor,
      });
      expect(mockErrorService.NotFound).toHaveBeenCalledWith(
        'No doctor found with this id right now',
        false,
      );
    });
  });

  describe('findOneByUser', () => {
    it('should return a doctor by user id', async () => {
      const doctor = { id: '1', specialty: 'Dermatology', user: { id: '2' } };
      mockDoctorRepository.findOne.mockResolvedValue(doctor);

      const result = await service.findOneByUser({ id: '2' });

      expect(result).toEqual({
        message: 'Doctor fetched successfully',
        payload: doctor,
      });
    });

    it('should return message if doctor not found', async () => {
      mockDoctorRepository.findOne.mockResolvedValue(null);

      const result = await service.findOneByUser({ id: '2' });

      expect(result).toEqual({ message: 'Doctor not found' });
    });
  });
});
