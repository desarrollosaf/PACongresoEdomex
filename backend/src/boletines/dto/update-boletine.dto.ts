import { PartialType } from '@nestjs/mapped-types';
import { CreateBoletineDto } from './create-boletine.dto';

export class UpdateBoletineDto extends PartialType(CreateBoletineDto) {}
