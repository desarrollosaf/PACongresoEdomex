import { PartialType } from '@nestjs/mapped-types';
import { CreateDiputadoDto } from './create-diputado.dto';

export class UpdateDiputadoDto extends PartialType(CreateDiputadoDto) {}
