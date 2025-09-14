import { PartialType } from '@nestjs/swagger';
import { CreateVectorDto } from './create-vector.dto';

export class UpdateVectorDto extends PartialType(CreateVectorDto) {}
