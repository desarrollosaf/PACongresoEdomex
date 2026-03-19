import { PartialType } from '@nestjs/mapped-types';
import { CreateTrabajoLegislativoDto } from './create-trabajo_legislativo.dto';

export class UpdateTrabajoLegislativoDto extends PartialType(CreateTrabajoLegislativoDto) {}
