import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { License } from './entities/license.entity';

@Injectable()
export class LicenseService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
  ) {}

  async findAll(license_num: string) {
    const license = await this.licenseRepository.findOne({
      where: { license_number: license_num },
    });

    if (!license) {
      return {
        message: 'No license number found',
        condition: false
      }
    }
    return {
      license,
      condition: true
    };
  }
}
