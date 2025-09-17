import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LicenseService } from './license.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get(':license_num')
  async getLicense(@Param('license_num') license_num: string) {
    return this.licenseService.findAll(license_num);
  }
}
