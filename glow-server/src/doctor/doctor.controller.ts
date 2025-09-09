import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('doctor')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  @HttpCode(201)
  create(@Req() req: Request, @Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto, req);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
