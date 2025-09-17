import { Injectable } from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { Repository } from "typeorm";
import { Doctor } from "./entities/doctor.entity";
import { HelpersService } from "src/helpers/helpers.service";
import { ErrorService } from "src/helpers/errors.service";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenService } from "src/analysis/token.service";

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    private readonly helperService: HelpersService,
    private readonly errorService: ErrorService,
    private readonly tokenService: TokenService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto, req: Request) {
    // const token = (req.headers as any).authorization;
    // const user_id = this.tokenService.getUserIdFromToken(token);

    const doctor_obj = this.doctorRepository.create({
      specialty: createDoctorDto.specialty,
      user: { id: createDoctorDto.user_id },
      years_experience: createDoctorDto.years_experience,
      availability: createDoctorDto.availability,
      price_per_session: createDoctorDto.price_per_session,
      location: createDoctorDto.location,
      medical_license_number: createDoctorDto.medical_license_number,
      verified: true
    });

    try {
      const doctor = await this.doctorRepository.save(doctor_obj);
      return {
        message: "Doctor added successfully",
        payload: doctor,
      };
    } catch (error) {
      this.errorService.InternalServerError(
        "Server error, please try again later",
        error,
      );
    }
  }

  async findAll() {
      const doctors = await this.doctorRepository.findBy({ verified: true });
      this.errorService.NotFound("No doctors in the app right now", !doctors || doctors.length === 0);

      return {
        message: "All doctors fetched successfully",
        payload: doctors,
      };
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
