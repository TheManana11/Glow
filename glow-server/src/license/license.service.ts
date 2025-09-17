import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { License } from './entities/license.entity';
import { User } from 'src/user/entities/user.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Injectable()
export class LicenseService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async findAll(body: any) {
    const license = await this.licenseRepository.findOne({
      where: { license_number: body.license_number },
    });

    if (!license) {
      return {
        message: 'No license number found',
        condition: false
      }
    }

    const existing_user = await this.userRepository.findOne({
      where: { email: body.email }
    })

    if(!existing_user){
       return {
        message: 'No user found, check email address in form',
        condition: false
      }
    }

    const doctor_obj = this.doctorRepository.create({
      specialty: body.specialty,
      user: { id: existing_user.id },
      years_experience: body.years_of_exp,
      availability: body.availability,
      price_per_session: body.price,
      location: body.location,
      medical_license_number: body.license_number,
      verified: true
    });

    try {
      const doctor = await this.doctorRepository.save(doctor_obj);
      return {
        message: "Doctor added successfully",
        condition: true,
        payload: doctor,
      };
  }catch(error){
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return{
      message: 'Error in adding doctor',
      condition: false
    }
  }
  }
}
