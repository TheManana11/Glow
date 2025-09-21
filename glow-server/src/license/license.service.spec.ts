import { Test, TestingModule } from '@nestjs/testing';
import { LicenseService } from './license.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { License } from './entities/license.entity';
import { User } from 'src/user/entities/user.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Repository } from 'typeorm';

describe('LicenseService', () => {
  let service: LicenseService;
  let licenseRepository: Repository<License>;
  let userRepository: Repository<User>;
  let doctorRepository: Repository<Doctor>;

  const mockLicenseRepository = {
    findOne: jest.fn(),
  };

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockDoctorRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LicenseService,
        { provide: getRepositoryToken(License), useValue: mockLicenseRepository },
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: getRepositoryToken(Doctor), useValue: mockDoctorRepository },
      ],
    }).compile();

    service = module.get<LicenseService>(LicenseService);
    licenseRepository = module.get<Repository<License>>(getRepositoryToken(License));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    doctorRepository = module.get<Repository<Doctor>>(getRepositoryToken(Doctor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const body = {
      license_number: '1234',
      email: 'doctor@example.com',
      specialty: 'Dermatology',
      years_of_exp: 5,
      availability: { monday: '9-5' },
      price: 150,
      location: 'City Clinic',
    };

    it('should return error if license not found', async () => {
      mockLicenseRepository.findOne.mockResolvedValue(null);

      const result = await service.findAll(body);

      expect(result).toEqual({
        message: 'No license number found',
        condition: false,
      });
      expect(mockLicenseRepository.findOne).toHaveBeenCalledWith({
        where: { license_number: body.license_number },
      });
    });

    it('should return error if user not found', async () => {
      mockLicenseRepository.findOne.mockResolvedValue({ id: 'license-id' });
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.findAll(body);

      expect(result).toEqual({
        message: 'No user found, check email address in form',
        condition: false,
      });
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: body.email },
      });
    });

    it('should create and save doctor if license and user found', async () => {
      const mockLicense = { id: 'license-id' };
      const mockUser = { id: 'user-id', email: body.email };
      const mockDoctor = { id: 'doctor-id', specialty: body.specialty };

      mockLicenseRepository.findOne.mockResolvedValue(mockLicense);
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockDoctorRepository.create.mockReturnValue(mockDoctor);
      mockDoctorRepository.save.mockResolvedValue(mockDoctor);

      const result = await service.findAll(body);

      expect(result).toEqual({
        message: 'Doctor added successfully',
        condition: true,
        payload: mockDoctor,
      });
      expect(mockDoctorRepository.create).toHaveBeenCalledWith({
        specialty: body.specialty,
        user: { id: mockUser.id },
        years_experience: body.years_of_exp,
        availability: body.availability,
        price_per_session: body.price,
        location: body.location,
        medical_license_number: body.license_number,
        verified: true,
      });
      expect(mockDoctorRepository.save).toHaveBeenCalledWith(mockDoctor);
    });

    it('should return error message when save throws exception', async () => {
      const mockLicense = { id: 'license-id' };
      const mockUser = { id: 'user-id', email: body.email };

      mockLicenseRepository.findOne.mockResolvedValue(mockLicense);
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockDoctorRepository.create.mockReturnValue({ id: 'doctor-id' });
      mockDoctorRepository.save.mockRejectedValue(new Error('DB Error'));

      const result = await service.findAll(body);

      expect(result).toEqual({
        message: 'Error in adding doctor',
        condition: false,
      });
    });
  });
});
